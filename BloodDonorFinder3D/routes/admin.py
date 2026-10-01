"""Admin dashboard and management routes."""

from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify
from models import db, User, Donor, Hospital, BloodRequest, DonationHistory
from utils.decorators import role_required

admin_bp = Blueprint('admin', __name__)


@admin_bp.route('/dashboard')
@role_required('admin')
def dashboard():
    """Admin operational metrics and overview."""
    total_users = User.query.count()
    total_donors = Donor.query.count()
    total_hospitals = Hospital.query.count()
    pending_verifications = Hospital.query.filter_by(verified=False).count()

    total_requests = BloodRequest.query.count()
    active_requests = BloodRequest.query.filter(BloodRequest.status.in_(['Pending', 'In Progress'])).count()
    emergency_requests = BloodRequest.query.filter(
        BloodRequest.emergency_level.in_(['Urgent', 'Critical']),
        BloodRequest.status.in_(['Pending', 'In Progress'])
    ).count()
    completed_donations = DonationHistory.query.filter_by(status='Completed').count()

    recent_users = User.query.order_by(User.created_at.desc()).limit(6).all()
    recent_requests = BloodRequest.query.order_by(BloodRequest.created_at.desc()).limit(6).all()

    return render_template(
        'admin/dashboard.html',
        total_users=total_users,
        total_donors=total_donors,
        total_hospitals=total_hospitals,
        pending_verifications=pending_verifications,
        total_requests=total_requests,
        active_requests=active_requests,
        emergency_requests=emergency_requests,
        completed_donations=completed_donations,
        recent_users=recent_users,
        recent_requests=recent_requests
    )


@admin_bp.route('/users')
@role_required('admin')
def users():
    """Manage users across the system."""
    role_filter = request.args.get('role', 'all')
    query = User.query

    if role_filter != 'all':
        query = query.filter_by(role=role_filter)

    all_users = query.order_by(User.created_at.desc()).all()
    return render_template('admin/users.html', users=all_users, current_role=role_filter)


@admin_bp.route('/users/<int:user_id>/toggle-active', methods=['POST'])
@role_required('admin')
def toggle_user_active(user_id):
    """Block or unblock a user account."""
    if user_id == session.get('user_id'):
        flash('You cannot deactivate your own admin account.', 'warning')
        return redirect(url_for('admin.users'))

    user = db.get_or_404(User, user_id)
    user.is_active = not user.is_active
    db.session.commit()

    status = "activated" if user.is_active else "blocked"
    flash(f"User {user.name} ({user.email}) has been {status}.", 'success')
    return redirect(url_for('admin.users'))


@admin_bp.route('/hospitals')
@role_required('admin')
def hospitals():
    """Manage hospital verifications."""
    all_hospitals = Hospital.query.order_by(Hospital.created_at.desc()).all()
    return render_template('admin/hospitals.html', hospitals=all_hospitals)


@admin_bp.route('/hospitals/<int:hospital_id>/toggle-verify', methods=['POST'])
@role_required('admin')
def toggle_hospital_verify(hospital_id):
    """Approve or revoke a hospital's verification status."""
    hospital = db.get_or_404(Hospital, hospital_id)
    hospital.verified = not hospital.verified
    db.session.commit()

    status = "verified" if hospital.verified else "unverified"
    flash(f"Hospital '{hospital.hospital_name}' marked as {status}.", 'success')
    return redirect(url_for('admin.hospitals'))


@admin_bp.route('/requests')
@role_required('admin')
def requests():
    """Inspect all system blood requests."""
    all_requests = BloodRequest.query.order_by(BloodRequest.created_at.desc()).all()
    return render_template('admin/requests.html', requests=all_requests)


@admin_bp.route('/reports')
@role_required('admin')
def reports():
    """System analytics and reports."""
    # Blood group breakdown
    blood_groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    blood_group_counts = {}
    for bg in blood_groups:
        blood_group_counts[bg] = Donor.query.filter_by(blood_group=bg).count()

    total_donations = DonationHistory.query.count()
    completed_donations = DonationHistory.query.filter_by(status='Completed').count()

    return render_template(
        'admin/reports.html',
        blood_group_counts=blood_group_counts,
        total_donations=total_donations,
        completed_donations=completed_donations
    )
