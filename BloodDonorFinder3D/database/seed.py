"""
Realistic Development Database Seeder
--------------------------------------
Populates development database with:
- System Administrator account
- Verified and pending hospitals
- Donors of all 8 blood groups across different cities
- Active, Urgent, and Critical Emergency Blood Requests
- Donation History records
- Notifications
"""

import sys
from pathlib import Path
from datetime import datetime, date, timedelta

# Ensure parent directory is in sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from models import db, User, Donor, Hospital, BloodRequest, DonationHistory, Notification


def seed_database():
    """Seed the database with sample development records."""
    print("Clearing existing tables...")
    db.drop_all()
    db.create_all()

    print("Creating System Administrator...")
    admin_user = User(
        name="System Administrator",
        email="admin@blooddonor.org",
        role="admin",
        phone="+1-800-555-0100",
        location="Headquarters",
        is_active=True
    )
    admin_user.set_password("Admin@123")
    db.session.add(admin_user)

    print("Creating Sample Hospitals...")
    hospitals_data = [
        {
            "name": "St. Jude Central Hospital",
            "email": "stjude@hospital.org",
            "password": "Hospital@123",
            "phone": "+1-312-555-0144",
            "address": "742 Evergreen Terrace",
            "city": "Chicago",
            "verified": True,
            "contact_person": "Dr. Sarah Mitchell"
        },
        {
            "name": "Metro Trauma & Health Center",
            "email": "metro@hospital.org",
            "password": "Hospital@123",
            "phone": "+1-212-555-0188",
            "address": "450 5th Avenue, Suite 400",
            "city": "New York",
            "verified": True,
            "contact_person": "Dr. Robert Chen"
        },
        {
            "name": "Pacific Care Medical Campus",
            "email": "pacific@hospital.org",
            "password": "Hospital@123",
            "phone": "+1-213-555-0199",
            "address": "1200 Wilshire Blvd",
            "city": "Los Angeles",
            "verified": True,
            "contact_person": "Dr. Elena Vasquez"
        },
        {
            "name": "Hope Valley Community Clinic",
            "email": "hopevalley@hospital.org",
            "password": "Hospital@123",
            "phone": "+1-713-555-0122",
            "address": "880 Memorial Loop",
            "city": "Houston",
            "verified": False,  # Pending admin verification
            "contact_person": "James Wilson, RN"
        }
    ]

    hospitals_map = {}
    for hd in hospitals_data:
        u = User(
            name=hd["contact_person"],
            email=hd["email"],
            role="hospital",
            phone=hd["phone"],
            location=hd["city"],
            is_active=True
        )
        u.set_password(hd["password"])
        db.session.add(u)
        db.session.flush()

        h = Hospital(
            user_id=u.id,
            hospital_name=hd["name"],
            contact_person=hd["contact_person"],
            address=hd["address"],
            city=hd["city"],
            location=hd["city"],
            phone=hd["phone"],
            verified=hd["verified"]
        )
        db.session.add(h)
        db.session.flush()
        hospitals_map[hd["email"]] = h

    print("Creating Donors (All 8 Blood Groups)...")
    today = date.today()
    donors_data = [
        {
            "name": "Alexander Hayes",
            "email": "alex.hayes@example.com",
            "phone": "+1-312-555-0201",
            "blood_group": "O-",  # Universal donor
            "city": "Chicago",
            "address": "1042 North Clark St",
            "age": 28,
            "gender": "Male",
            "availability": True,
            "last_donation_date": today - timedelta(days=120)  # Eligible
        },
        {
            "name": "Emily Watson",
            "email": "emily.watson@example.com",
            "phone": "+1-212-555-0202",
            "blood_group": "O+",
            "city": "New York",
            "address": "320 West 85th St",
            "age": 25,
            "gender": "Female",
            "availability": True,
            "last_donation_date": today - timedelta(days=95)  # Eligible
        },
        {
            "name": "Marcus Davis",
            "email": "marcus.davis@example.com",
            "phone": "+1-213-555-0203",
            "blood_group": "A+",
            "city": "Los Angeles",
            "address": "452 Ocean Parkway",
            "age": 34,
            "gender": "Male",
            "availability": True,
            "last_donation_date": today - timedelta(days=45)  # Recently donated (<90 days)
        },
        {
            "name": "Sophia Martinez",
            "email": "sophia.martinez@example.com",
            "phone": "+1-713-555-0204",
            "blood_group": "A-",
            "city": "Houston",
            "address": "1805 Heights Blvd",
            "age": 29,
            "gender": "Female",
            "availability": True,
            "last_donation_date": today - timedelta(days=180)
        },
        {
            "name": "David Kim",
            "email": "david.kim@example.com",
            "phone": "+1-312-555-0205",
            "blood_group": "B+",
            "city": "Chicago",
            "address": "560 South Michigan Ave",
            "age": 31,
            "gender": "Male",
            "availability": True,
            "last_donation_date": None  # First-time donor
        },
        {
            "name": "Chloe Bennett",
            "email": "chloe.bennett@example.com",
            "phone": "+1-212-555-0206",
            "blood_group": "B-",
            "city": "New York",
            "address": "128 East Broadway",
            "age": 27,
            "gender": "Female",
            "availability": False,  # Temporarily unavailable
            "last_donation_date": today - timedelta(days=110)
        },
        {
            "name": "Lucas Rossi",
            "email": "lucas.rossi@example.com",
            "phone": "+1-213-555-0207",
            "blood_group": "AB+",  # Universal recipient
            "city": "Los Angeles",
            "address": "810 Sunset Blvd",
            "age": 32,
            "gender": "Male",
            "availability": True,
            "last_donation_date": today - timedelta(days=150)
        },
        {
            "name": "Zara Patel",
            "email": "zara.patel@example.com",
            "phone": "+1-713-555-0208",
            "blood_group": "AB-",
            "city": "Houston",
            "address": "2210 Rice Blvd",
            "age": 26,
            "gender": "Female",
            "availability": True,
            "last_donation_date": today - timedelta(days=100)
        }
    ]

    donors_map = {}
    for dd in donors_data:
        u = User(
            name=dd["name"],
            email=dd["email"],
            role="donor",
            phone=dd["phone"],
            location=dd["city"],
            is_active=True
        )
        u.set_password("Donor@123")
        db.session.add(u)
        db.session.flush()

        d = Donor(
            user_id=u.id,
            blood_group=dd["blood_group"],
            availability=dd["availability"],
            age=dd["age"],
            gender=dd["gender"],
            address=dd["address"],
            city=dd["city"],
            last_donation_date=dd["last_donation_date"]
        )
        db.session.add(d)
        db.session.flush()
        donors_map[dd["email"]] = (u, d)

    print("Creating Blood Requests (Normal, Urgent, Critical)...")
    stjude = hospitals_map["stjude@hospital.org"]
    metro = hospitals_map["metro@hospital.org"]
    pacific = hospitals_map["pacific@hospital.org"]

    req_critical = BloodRequest(
        hospital_id=metro.id,
        blood_group="O-",
        units_required=3,
        emergency_level="Critical",
        city="New York",
        location="ICU Ward 4B, Emergency Trauma",
        description="Immediate requirement for vehicular trauma surgery with massive hemorrhage.",
        status="Pending",
        required_date=today + timedelta(days=1)
    )
    db.session.add(req_critical)

    req_urgent = BloodRequest(
        hospital_id=stjude.id,
        blood_group="A+",
        units_required=2,
        emergency_level="Urgent",
        city="Chicago",
        location="Cardiology Surgery Wing",
        description="Scheduled open-heart surgery requires reserve whole blood units.",
        status="Pending",
        required_date=today + timedelta(days=2)
    )
    db.session.add(req_urgent)

    req_normal = BloodRequest(
        hospital_id=pacific.id,
        blood_group="B+",
        units_required=1,
        emergency_level="Normal",
        city="Los Angeles",
        location="Pediatric Oncology Clinic",
        description="Routine supportive transfusion for leukemia patient under active protocol.",
        status="In Progress",
        required_date=today + timedelta(days=4)
    )
    db.session.add(req_normal)

    req_completed = BloodRequest(
        hospital_id=metro.id,
        blood_group="O+",
        units_required=2,
        emergency_level="Urgent",
        city="New York",
        location="Maternity Surgical Wing",
        description="Postpartum hemorrhage transfusion support.",
        status="Completed",
        required_date=today - timedelta(days=10)
    )
    db.session.add(req_completed)
    db.session.flush()

    print("Creating Donation History & Notifications...")
    # Donation history for completed request
    alex_user, alex_donor = donors_map["alex.hayes@example.com"]
    emily_user, emily_donor = donors_map["emily.watson@example.com"]

    past_donation = DonationHistory(
        donor_id=emily_donor.id,
        request_id=req_completed.id,
        donation_date=datetime.now() - timedelta(days=10),
        status="Completed",
        units_donated=2,
        notes="Successful whole blood collection, patient fully recovered."
    )
    db.session.add(past_donation)

    # Notifications
    notif_critical = Notification(
        user_id=alex_user.id,
        request_id=req_critical.id,
        message="🚨 CRITICAL EMERGENCY: Metro Trauma & Health Center needs 3 unit(s) of O- blood in New York.",
        notification_type="emergency",
        is_read=False
    )
    db.session.add(notif_critical)

    notif_welcome = Notification(
        user_id=alex_user.id,
        message="Welcome to Blood Donor Finder! Your universal donor profile (O-) is active and ready to save lives.",
        notification_type="info",
        is_read=True
    )
    db.session.add(notif_welcome)

    db.session.commit()
    print("Database seeding completed successfully!")


if __name__ == '__main__':
    from app import app
    with app.app_context():
        seed_database()
