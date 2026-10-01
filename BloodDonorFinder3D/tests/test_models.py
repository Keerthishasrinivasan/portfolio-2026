"""Unit tests for SQLAlchemy models, password hashing, and relationships."""

import unittest
from datetime import date, timedelta
from app import create_app
from models import db, User, Donor, Hospital, BloodRequest, DonationHistory, Notification


class TestDatabaseModels(unittest.TestCase):
    """Test suite for database models and relationships."""

    def setUp(self):
        """Set up in-memory testing app and clean database."""
        self.app = create_app('testing')
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        """Clean up database session and tables."""
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_password_hashing(self):
        """Test secure password hashing and verification."""
        user = User(
            name="John Doe",
            email="john@example.com",
            role="donor",
            phone="+1-555-0101"
        )
        user.set_password("SecretPassword123")
        db.session.add(user)
        db.session.commit()

        # Ensure plain text is not stored
        self.assertNotEqual(user.password_hash, "SecretPassword123")
        self.assertTrue(user.check_password("SecretPassword123"))
        self.assertFalse(user.check_password("WrongPassword"))

    def test_donor_profile_and_eligibility(self):
        """Test Donor profile creation and 90-day donation eligibility logic."""
        user = User(
            name="Jane Donor",
            email="jane@example.com",
            role="donor",
            phone="+1-555-0102"
        )
        user.set_password("Pass123")
        db.session.add(user)
        db.session.flush()

        # Donor who donated 30 days ago (<90 days -> not yet eligible)
        donor = Donor(
            user_id=user.id,
            blood_group="O+",
            city="New York",
            availability=True,
            last_donation_date=date.today() - timedelta(days=30)
        )
        db.session.add(donor)
        db.session.commit()

        self.assertEqual(user.donor.id, donor.id)
        self.assertFalse(donor.is_eligible_to_donate)
        self.assertEqual(donor.days_until_eligible, 60)

        # Donor who donated 100 days ago (>90 days -> eligible)
        donor.last_donation_date = date.today() - timedelta(days=100)
        db.session.commit()
        self.assertTrue(donor.is_eligible_to_donate)
        self.assertEqual(donor.days_until_eligible, 0)

    def test_hospital_and_blood_requests_relationship(self):
        """Test Hospital creation and cascading BloodRequest relationship."""
        user = User(
            name="Dr. Smith",
            email="smith@hospital.com",
            role="hospital",
            phone="+1-555-0103"
        )
        user.set_password("HospitalPass123")
        db.session.add(user)
        db.session.flush()

        hospital = Hospital(
            user_id=user.id,
            hospital_name="Mercy General",
            address="100 Hospital Way",
            city="Boston",
            phone="+1-555-0103",
            verified=True
        )
        db.session.add(hospital)
        db.session.flush()

        req = BloodRequest(
            hospital_id=hospital.id,
            blood_group="AB-",
            units_required=2,
            emergency_level="Urgent",
            city="Boston",
            status="Pending"
        )
        db.session.add(req)
        db.session.commit()

        self.assertEqual(hospital.requests.count(), 1)
        self.assertEqual(hospital.requests.first().blood_group, "AB-")
        self.assertEqual(req.hospital.hospital_name, "Mercy General")

    def test_cascade_delete_user_removes_donor(self):
        """Deleting a user should cascade delete their donor record."""
        user = User(
            name="Temp User",
            email="temp@example.com",
            role="donor",
            phone="+1-555-0199"
        )
        user.set_password("Pass123")
        db.session.add(user)
        db.session.flush()

        donor = Donor(
            user_id=user.id,
            blood_group="B+",
            city="Miami"
        )
        db.session.add(donor)
        db.session.commit()

        donor_id = donor.id
        db.session.delete(user)
        db.session.commit()

        self.assertIsNone(db.session.get(Donor, donor_id))


if __name__ == '__main__':
    unittest.main()
