"""Hospital dashboard, request creation, and donor coordination routes."""

from datetime import datetime
from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify
from models import db, User, Hospital, Donor, BloodRequest, DonationHistory, Notification
from utils.compatibility import VALID_BLOOD_GROUPS, get_compatible_donors_for_recipient
from utils.decorators import role_required

hospital_bp = Blueprint('hospital', __name__)


@hospital_bp.route('/dashboard')
@role_required('hospital')
def dashboard():
    """Hospital dashboard overview with statistics and active requests."""
    user = db.get_or_404(User, session['user_id'])
    hospital = user.hospital

    if not hospital:
        flash('Hospital profile not found. Please contact administrator.', 'danger')
        return redirect(url_for('main.index'))

    # Metrics
    total_requests = hospital.requests.count()
    active_requests = hospital.requests.filter(BloodRequest.status.in_(['Pending', 'In Progress', 'Accepted'])).count()
    emergency_requests = hospital.requests.filter(
        BloodRequest.emergency_level.in_(['Urgent', 'Critical']),
        BloodRequest.status.in_(['Pending', 'In Progress'])
    ).count()
    completed_requests = hospital.requests.filter_by(status='Completed').count()

    recent_requests = hospital.requests.order_by(BloodRequest.created_at.desc()).limit(5).all()

    # Donors currently available in hospital's city
    nearby_donors = Donor.query.filter_by(city=hospital.city, availability=True).limit(6).all()
    unread_notifications = user.notifications.filter_by(is_read=False).count()

    return render_template(
        'hospital/dashboard.html',
        hospital=hospital,
        user=user,
        total_requests=total_requests,
        active_requests=active_requests,
        emergency_requests=emergency_requests,
        completed_requests=completed_requests,
        recent_requests=recent_requests,
        nearby_donors=nearby_donors,
        unread_notifications=unread_notifications
    )


@hospital_bp.route('/request/create', methods=['GET', 'POST'])
@role_required('hospital')
def create_request():
    """Create a new blood requirement with emergency prioritization."""
    user = db.get_or_404(User, session['user_id'])
    hospital = user.hospital

    if request.method == 'POST':
        blood_group = request.form.get('blood_group', '').strip().upper()
        units_required = request.form.get('units_required', type=int) or 1
        emergency_level = request.form.get('emergency_level', 'Normal')
        city = request.form.get('city', hospital.city).strip()
        location = request.form.get('location', '').strip() or hospital.address
        description = request.form.get('description', '').strip()
        required_date_str = request.form.get('required_date', '').strip()

        if blood_group not in VALID_BLOOD_GROUPS:
            flash('Please select a valid blood group.', 'danger')
            return render_template('hospital/create_request.html', hospital=hospital, blood_groups=VALID_BLOOD_GROUPS)

        required_date = None
        if required_date_str:
            try:
                required_date = datetime.strptime(required_date_str, '%Y-%m-%d').date()
            except ValueError:
                pass

        new_request = BloodRequest(
            hospital_id=hospital.id,
            blood_group=blood_group,
            units_required=units_required,
            emergency_level=emergency_level,
            city=city,
            location=location,
            description=description,
            required_date=required_date,
            status='Pending'
        )
        db.session.add(new_request)
        db.session.flush()

        # Find compatible donors and dispatch notifications
        compatible_donor_groups = get_compatible_donors_for_recipient(blood_group)
        matching_donors = Donor.query.join(User).filter(
            Donor.blood_group.in_(compatible_donor_groups),
            Donor.availability == True,
            User.is_active == True
        ).all()

        for d in matching_donors:
            alert_prefix = "🚨 CRITICAL EMERGENCY" if emergency_level == 'Critical' else ("⚠️ URGENT" if emergency_level == 'Urgent' else "📢 Blood Requirement")
            notification = Notification(
                user_id=d.user_id,
                request_id=new_request.id,
                message=f"{alert_prefix}: {hospital.hospital_name} in {city} needs {units_required} unit(s) of {blood_group} blood. Your blood group ({d.blood_group}) is compatible.",
                notification_type='emergency' if emergency_level in ('Urgent', 'Critical') else 'request'
            )
            db.session.add(notification)

        db.session.commit()

        flash(
            f'Blood request #{new_request.id} for {units_required} unit(s) of {blood_group} created successfully! '
            f'Alerted {len(matching_donors)} compatible donor(s).',
            'success'
        )
        return redirect(url_for('hospital.requests'))

    return render_template('hospital/create_request.html', hospital=hospital, blood_groups=VALID_BLOOD_GROUPS)


@hospital_bp.route('/requests')
@role_required('hospital')
def requests():
    """View and filter hospital's blood requests."""
    user = db.get_or_404(User, session['user_id'])
    hospital = user.hospital

    status_filter = request.args.get('status', 'all')
    query = hospital.requests

    if status_filter != 'all':
        query = query.filter(BloodRequest.status == status_filter)

    all_requests = query.order_by(BloodRequest.created_at.desc()).all()

    return render_template(
        'hospital/requests.html',
        hospital=hospital,
        requests=all_requests,
        current_filter=status_filter
    )


@hospital_bp.route('/requests/<int:request_id>/status', methods=['POST'])
@role_required('hospital')
def update_request_status(request_id):
    """Update status of a blood request (e.g. Completed, Cancelled)."""
    user = db.get_or_404(User, session['user_id'])
    hospital = user.hospital

    req = BloodRequest.query.filter_by(id=request_id, hospital_id=hospital.id).first_or_404()
    new_status = request.form.get('status')

    if new_status in ['Pending', 'In Progress', 'Accepted', 'Completed', 'Cancelled']:
        req.status = new_status
        db.session.commit()
        flash(f'Request #{req.id} status updated to {new_status}.', 'success')

    return redirect(url_for('hospital.requests'))


@hospital_bp.route('/donors/find')
@role_required('hospital')
def find_donors():
    """Direct search for compatible donors with send notification capability."""
    user = db.get_or_404(User, session['user_id'])
    hospital = user.hospital

    blood_group = request.args.get('blood_group', '').strip().upper()
    city = request.args.get('city', hospital.city).strip()

    query = Donor.query.join(User).filter(User.is_active == True, Donor.availability == True)

    if blood_group and blood_group in VALID_BLOOD_GROUPS:
        compatible_groups = get_compatible_donors_for_recipient(blood_group)
        query = query.filter(Donor.blood_group.in_(compatible_groups))

    if city:
        query = query.filter(Donor.city.ilike(f"%{city}%"))

    donors = query.limit(30).all()

    return render_template(
        'hospital/find_donors.html',
        hospital=hospital,
        donors=donors,
        blood_groups=VALID_BLOOD_GROUPS,
        selected_blood_group=blood_group,
        selected_city=city
    )
