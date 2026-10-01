"""REST API endpoints for AJAX queries and integrations."""

from flask import Blueprint, jsonify, request, session
from models import db, Donor, Hospital, BloodRequest, Notification, User
from utils.compatibility import (
    VALID_BLOOD_GROUPS,
    is_compatible,
    get_compatible_donors_for_recipient,
    get_compatible_recipients_for_donor,
    MEDICAL_DISCLAIMER
)

api_bp = Blueprint('api', __name__)


@api_bp.route('/stats')
def get_stats():
    """Retrieve live platform metrics."""
    return jsonify({
        'success': True,
        'data': {
            'donors_count': Donor.query.filter_by(availability=True).count(),
            'hospitals_count': Hospital.query.filter_by(verified=True).count(),
            'active_requests': BloodRequest.query.filter(BloodRequest.status.in_(['Pending', 'In Progress'])).count(),
            'emergency_requests': BloodRequest.query.filter(
                BloodRequest.emergency_level.in_(['Urgent', 'Critical']),
                BloodRequest.status.in_(['Pending', 'In Progress'])
            ).count()
        }
    })


@api_bp.route('/compatibility')
def check_compatibility():
    """
    Check blood compatibility.
    Query params:
    - donor: donor blood group
    - recipient: recipient blood group
    OR
    - blood_group: single blood group
    - mode: 'as_recipient' or 'as_donor'
    """
    donor_group = request.args.get('donor', '').strip().upper()
    recipient_group = request.args.get('recipient', '').strip().upper()

    if donor_group and recipient_group:
        try:
            compatible = is_compatible(donor_group, recipient_group)
            return jsonify({
                'success': True,
                'donor': donor_group,
                'recipient': recipient_group,
                'compatible': compatible,
                'disclaimer': MEDICAL_DISCLAIMER
            })
        except ValueError as e:
            return jsonify({'success': False, 'message': str(e)}), 400

    single_group = request.args.get('blood_group', '').strip().upper()
    mode = request.args.get('mode', 'as_recipient')

    if single_group:
        if single_group not in VALID_BLOOD_GROUPS:
            return jsonify({'success': False, 'message': 'Invalid blood group'}), 400

        if mode == 'as_donor':
            can_donate_to = get_compatible_recipients_for_donor(single_group)
            return jsonify({
                'success': True,
                'blood_group': single_group,
                'role': 'donor',
                'can_donate_to': can_donate_to,
                'disclaimer': MEDICAL_DISCLAIMER
            })
        else:
            can_receive_from = get_compatible_donors_for_recipient(single_group)
            return jsonify({
                'success': True,
                'blood_group': single_group,
                'role': 'recipient',
                'can_receive_from': can_receive_from,
                'disclaimer': MEDICAL_DISCLAIMER
            })

    return jsonify({'success': False, 'message': 'Provide donor & recipient or blood_group'}), 400


@api_bp.route('/donors/search')
def search_donors():
    """Query available donors with blood compatibility and location filters."""
    blood_group = request.args.get('blood_group', '').strip().upper()
    city = request.args.get('city', '').strip()
    include_compatible = request.args.get('compatible', 'true').lower() == 'true'

    query = Donor.query.join(User).filter(User.is_active == True, Donor.availability == True)

    if blood_group and blood_group in VALID_BLOOD_GROUPS:
        if include_compatible:
            compatible_groups = get_compatible_donors_for_recipient(blood_group)
            query = query.filter(Donor.blood_group.in_(compatible_groups))
        else:
            query = query.filter(Donor.blood_group == blood_group)

    if city:
        query = query.filter(Donor.city.ilike(f"%{city}%"))

    donors = query.limit(50).all()

    return jsonify({
        'success': True,
        'count': len(donors),
        'donors': [d.to_dict() for d in donors],
        'disclaimer': MEDICAL_DISCLAIMER
    })


@api_bp.route('/notifications')
def get_notifications():
    """Fetch unread notifications for logged in user."""
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    notifications = Notification.query.filter_by(user_id=user_id).order_by(
        Notification.created_at.desc()
    ).limit(15).all()

    return jsonify({
        'success': True,
        'unread_count': sum(1 for n in notifications if not n.is_read),
        'notifications': [n.to_dict() for n in notifications]
    })


@api_bp.route('/notifications/<int:notification_id>/mark-read', methods=['POST'])
def mark_notification_read(notification_id):
    """Mark a notification as read."""
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'message': 'Unauthorized'}), 401

    notif = Notification.query.filter_by(id=notification_id, user_id=user_id).first_or_404()
    notif.is_read = True
    db.session.commit()

    return jsonify({'success': True})
