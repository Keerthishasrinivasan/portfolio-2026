"""Public / main website routes."""

from flask import Blueprint, render_template, request
from models import db, Donor, Hospital, BloodRequest, DonationHistory, User
from utils.compatibility import VALID_BLOOD_GROUPS, MEDICAL_DISCLAIMER, is_compatible, get_compatible_donors_for_recipient

main_bp = Blueprint('main', __name__)


@main_bp.route('/')
def index():
    """Homepage with statistics, hero section, and emergency ticker."""
    total_donors = Donor.query.filter_by(availability=True).count()
    total_hospitals = Hospital.query.filter_by(verified=True).count()
    total_donations = DonationHistory.query.filter_by(status='Completed').count()
    active_requests = BloodRequest.query.filter(BloodRequest.status.in_(['Pending', 'In Progress'])).count()
    
    # Urgent/Critical requests for top emergency ticker
    emergency_requests = BloodRequest.query.filter(
        BloodRequest.status.in_(['Pending', 'In Progress']),
        BloodRequest.emergency_level.in_(['Urgent', 'Critical'])
    ).order_by(BloodRequest.created_at.desc()).limit(5).all()

    return render_template(
        'index.html',
        total_donors=total_donors,
        total_hospitals=total_hospitals,
        total_donations=total_donations,
        active_requests=active_requests,
        emergency_requests=emergency_requests,
        blood_groups=VALID_BLOOD_GROUPS,
        disclaimer=MEDICAL_DISCLAIMER
    )


@main_bp.route('/about')
def about():
    """About us, eligibility guidelines, and medical disclaimers."""
    return render_template('about.html', disclaimer=MEDICAL_DISCLAIMER)


@main_bp.route('/find-donor')
def find_donor():
    """Find a donor search directory."""
    blood_group = request.args.get('blood_group', '').strip().upper()
    city = request.args.get('city', '').strip()
    include_compatible = request.args.get('compatible', 'false').lower() == 'true'

    query = Donor.query.join(User).filter(User.is_active == True)

    if blood_group and blood_group in VALID_BLOOD_GROUPS:
        if include_compatible:
            compatible_groups = get_compatible_donors_for_recipient(blood_group)
            query = query.filter(Donor.blood_group.in_(compatible_groups))
        else:
            query = query.filter(Donor.blood_group == blood_group)

    if city:
        query = query.filter(Donor.city.ilike(f"%{city}%"))

    # Only show available donors by default
    query = query.filter(Donor.availability == True)
    donors = query.order_by(Donor.created_at.desc()).limit(50).all()

    # Distinct cities for filter dropdown
    cities = [c[0] for c in db.session.query(Donor.city).distinct().order_by(Donor.city).all() if c[0]]

    return render_template(
        'find_donor.html',
        donors=donors,
        blood_groups=VALID_BLOOD_GROUPS,
        selected_blood_group=blood_group,
        selected_city=city,
        include_compatible=include_compatible,
        cities=cities,
        disclaimer=MEDICAL_DISCLAIMER
    )


@main_bp.route('/emergency')
def emergency():
    """High-priority emergency blood requests view."""
    critical_requests = BloodRequest.query.filter(
        BloodRequest.status.in_(['Pending', 'In Progress']),
        BloodRequest.emergency_level.in_(['Urgent', 'Critical'])
    ).order_by(BloodRequest.created_at.desc()).all()

    return render_template(
        'emergency_request.html',
        requests=critical_requests,
        disclaimer=MEDICAL_DISCLAIMER
    )
