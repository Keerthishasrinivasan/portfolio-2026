"""Donor dashboard and profile management routes."""

from datetime import datetime, date
from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify
from models import db, User, Donor, BloodRequest, DonationHistory, Notification
from utils.compatibility import VALID_BLOOD_GROUPS, get_compatible_recipients_for_donor
from utils.decorators import role_required

donor_bp = Blueprint('donor', __name__)


@donor_bp.route('/dashboard')
@role_required('donor')
def dashboard():
    """Donor dashboard overview with stats, compatible requests, and history."""
    user = db.get_or_404(User, session['user_id'])
    donor = user.donor

    if not donor:
        flash('Donor profile not found. Please complete your registration.', 'warning')
        return redirect(url_for('donor.profile'))

    # Compatible recipient blood groups this donor can donate to
    compatible_recipient_groups = get_compatible_recipients_for_donor(donor.blood_group)

    # Find active requests matching compatible groups (prioritizing same city & emergency)
    requests_query = BloodRequest.query.filter(
        BloodRequest.blood_group.in_(compatible_recipient_groups),
        BloodRequest.status.in_(['Pending', 'In Progress'])
    )
    
    # Priority sorting: Critical first, then Urgent, then Normal, newest first
    active_requests = requests_query.order_by(
        BloodRequest.emergency_level.desc(),
        BloodRequest.created_at.desc()
    ).limit(10).all()

    # Total stats
    total_donations = donor.donations.filter_by(status='Completed').count()
    pending_matching_count = requests_query.count()
    emergency_matching_count = requests_query.filter(BloodRequest.emergency_level.in_(['Urgent', 'Critical'])).count()

    recent_donations = donor.donations.order_by(DonationHistory.donation_date.desc()).limit(5).all()
    unread_notifications = user.notifications.filter_by(is_read=False).count()

    return render_template(
        'donor/dashboard.html',
        user=user,
        donor=donor,
        total_donations=total_donations,
        pending_matching_count=pending_matching_count,
        emergency_matching_count=emergency_matching_count,
        active_requests=active_requests,
        recent_donations=recent_donations,
        unread_notifications=unread_notifications
    )


@donor_bp.route('/profile', methods=['GET', 'POST'])
@role_required('donor')
def profile():
    """View and update donor profile."""
    user = db.get_or_404(User, session['user_id'])
    donor = user.donor

    if request.method == 'POST':
        user.name = request.form.get('name', user.name).strip()
        user.phone = request.form.get('phone', user.phone).strip()
        user.location = request.form.get('city', user.location).strip()

        if donor:
            blood_group = request.form.get('blood_group', donor.blood_group).strip().upper()
            if blood_group in VALID_BLOOD_GROUPS:
                donor.blood_group = blood_group
            donor.city = request.form.get('city', donor.city).strip()
            donor.address = request.form.get('address', donor.address).strip()
            donor.age = request.form.get('age', type=int) or donor.age
            donor.gender = request.form.get('gender', donor.gender)

            last_date_str = request.form.get('last_donation_date', '').strip()
            if last_date_str:
                try:
                    donor.last_donation_date = datetime.strptime(last_date_str, '%Y-%m-%d').date()
                except ValueError:
                    pass

        session['user_name'] = user.name
        db.session.commit()
        flash('Profile updated successfully!', 'success')
        return redirect(url_for('donor.profile'))

    return render_template('donor/profile.html', user=user, donor=donor, blood_groups=VALID_BLOOD_GROUPS)


@donor_bp.route('/availability', methods=['POST'])
@role_required('donor')
def toggle_availability():
    """Toggle donor availability status."""
    user = db.get_or_404(User, session['user_id'])
    donor = user.donor
    if donor:
        donor.availability = not donor.availability
        db.session.commit()
        status_text = "Available" if donor.availability else "Not Available"
        flash(f'Availability status updated to: {status_text}', 'success')

    # Return JSON for AJAX or redirect
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({'success': True, 'availability': donor.availability})

    return redirect(request.referrer or url_for('donor.dashboard'))


@donor_bp.route('/requests')
@role_required('donor')
def requests():
    """View all blood requests compatible with the donor."""
    user = db.get_or_404(User, session['user_id'])
    donor = user.donor
    
    compatible_groups = get_compatible_recipients_for_donor(donor.blood_group)
    blood_requests = BloodRequest.query.filter(
        BloodRequest.blood_group.in_(compatible_groups),
        BloodRequest.status.in_(['Pending', 'In Progress', 'Accepted'])
    ).order_by(
        BloodRequest.emergency_level.desc(),
        BloodRequest.created_at.desc()
    ).all()

    return render_template('donor/requests.html', donor=donor, requests=blood_requests)


@donor_bp.route('/requests/<int:request_id>/respond', methods=['POST'])
@role_required('donor')
def respond_request(request_id):
    """Accept or decline a blood request."""
    user = db.get_or_404(User, session['user_id'])
    donor = user.donor
    action = request.form.get('action', '').lower()

    blood_req = db.get_or_404(BloodRequest, request_id)

    if action == 'accept':
        blood_req.status = 'Accepted'
        
        # Create scheduled donation entry
        donation = DonationHistory(
            donor_id=donor.id,
            request_id=blood_req.id,
            status='Scheduled',
            notes=f'Accepted by donor {user.name} ({user.phone})'
        )
        db.session.add(donation)

        # Notify hospital
        if blood_req.hospital and blood_req.hospital.user:
            notif = Notification(
                user_id=blood_req.hospital.user.id,
                request_id=blood_req.id,
                message=f"Good news! Donor {user.name} ({donor.blood_group}) has ACCEPTED your blood request for {blood_req.units_required} unit(s). Contact: {user.phone}",
                notification_type='request'
            )
            db.session.add(notif)

        db.session.commit()
        flash('Thank you for accepting! The hospital has been notified and will contact you.', 'success')

    elif action == 'decline':
        flash('You have declined the request.', 'info')

    return redirect(url_for('donor.requests'))


@donor_bp.route('/history')
@role_required('donor')
def history():
    """View full donation history."""
    user = db.get_or_404(User, session['user_id'])
    donor = user.donor
    donations = donor.donations.order_by(DonationHistory.donation_date.desc()).all()
    return render_template('donor/history.html', donor=donor, donations=donations)
