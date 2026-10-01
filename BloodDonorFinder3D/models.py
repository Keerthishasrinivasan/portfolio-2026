"""
SQLAlchemy Database Models for Blood Donor Finder
------------------------------------------------
Defines:
- User (base account model for donor, hospital, admin)
- Donor (profile information, blood group, eligibility, location)
- Hospital (medical facility profile and verification)
- BloodRequest (blood requirements with emergency priorities)
- DonationHistory (track completed or scheduled donations)
- Notification (system and emergency alerts for users)
"""

from datetime import datetime, date, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def utc_now():
    return datetime.now(timezone.utc)


class User(db.Model):
    """Base user account with role-based authorization."""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'donor', 'hospital', 'admin'
    phone = db.Column(db.String(20), nullable=False)
    location = db.Column(db.String(120), nullable=True)  # City or area
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=utc_now, nullable=False)

    # Relationships
    donor = db.relationship('Donor', backref='user', uselist=False, cascade='all, delete-orphan')
    hospital = db.relationship('Hospital', backref='user', uselist=False, cascade='all, delete-orphan')
    notifications = db.relationship('Notification', backref='user', lazy='dynamic', cascade='all, delete-orphan', order_by='Notification.created_at.desc()')

    def set_password(self, password: str):
        """Hash and store the user password."""
        self.password_hash = generate_password_hash(password, method='pbkdf2:sha256')

    def check_password(self, password: str) -> bool:
        """Verify the password against stored hash."""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Serialize user object without sensitive fields."""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'phone': self.phone,
            'location': self.location,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<User {self.id}: {self.email} ({self.role})>'


class Donor(db.Model):
    """Detailed profile for registered blood donors."""
    __tablename__ = 'donors'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)
    blood_group = db.Column(db.String(5), nullable=False, index=True)  # A+, A-, B+, B-, AB+, AB-, O+, O-
    availability = db.Column(db.Boolean, default=True, nullable=False, index=True)
    last_donation_date = db.Column(db.Date, nullable=True)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    address = db.Column(db.Text, nullable=True)
    city = db.Column(db.String(100), nullable=False, index=True)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=utc_now, nullable=False)

    # Relationships
    donations = db.relationship('DonationHistory', backref='donor', lazy='dynamic', cascade='all, delete-orphan', order_by='DonationHistory.donation_date.desc()')

    @property
    def is_eligible_to_donate(self) -> bool:
        """
        Check medically suggested wait period (typically 90 days between whole blood donations).
        """
        if not self.last_donation_date:
            return True
        days_since = (date.today() - self.last_donation_date).days
        return days_since >= 90

    @property
    def days_until_eligible(self) -> int:
        """Days remaining until next safe donation."""
        if not self.last_donation_date:
            return 0
        days_since = (date.today() - self.last_donation_date).days
        return max(0, 90 - days_since)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.user.name if self.user else None,
            'email': self.user.email if self.user else None,
            'phone': self.user.phone if self.user else None,
            'blood_group': self.blood_group,
            'availability': self.availability,
            'is_eligible': self.is_eligible_to_donate,
            'days_until_eligible': self.days_until_eligible,
            'last_donation_date': self.last_donation_date.isoformat() if self.last_donation_date else None,
            'age': self.age,
            'gender': self.gender,
            'city': self.city,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<Donor {self.id}: {self.blood_group} in {self.city}>'


class Hospital(db.Model):
    """Profile and verification status for hospitals & blood banks."""
    __tablename__ = 'hospitals'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False)
    hospital_name = db.Column(db.String(150), nullable=False)
    contact_person = db.Column(db.String(100), nullable=True)
    address = db.Column(db.Text, nullable=False)
    city = db.Column(db.String(100), nullable=False, index=True)
    location = db.Column(db.String(120), nullable=True)  # Specific campus or landmark
    phone = db.Column(db.String(20), nullable=False)
    verified = db.Column(db.Boolean, default=False, nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=utc_now, nullable=False)

    # Relationships
    requests = db.relationship('BloodRequest', backref='hospital', lazy='dynamic', cascade='all, delete-orphan', order_by='BloodRequest.created_at.desc()')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'hospital_name': self.hospital_name,
            'contact_person': self.contact_person,
            'email': self.user.email if self.user else None,
            'phone': self.phone,
            'address': self.address,
            'city': self.city,
            'location': self.location,
            'verified': self.verified,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<Hospital {self.id}: {self.hospital_name} ({self.city})>'


class BloodRequest(db.Model):
    """Blood request created by a hospital."""
    __tablename__ = 'blood_requests'

    id = db.Column(db.Integer, primary_key=True)
    hospital_id = db.Column(db.Integer, db.ForeignKey('hospitals.id', ondelete='CASCADE'), nullable=False)
    blood_group = db.Column(db.String(5), nullable=False, index=True)
    units_required = db.Column(db.Integer, default=1, nullable=False)
    emergency_level = db.Column(db.String(20), default='Normal', nullable=False, index=True)  # 'Normal', 'Urgent', 'Critical'
    city = db.Column(db.String(100), nullable=False, index=True)
    location = db.Column(db.String(150), nullable=True)  # Ward / Dept / Specific Address
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default='Pending', nullable=False, index=True)  # 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'
    required_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=utc_now, nullable=False)

    # Relationships
    donations = db.relationship('DonationHistory', backref='blood_request', lazy='dynamic')
    notifications = db.relationship('Notification', backref='blood_request', lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'hospital_id': self.hospital_id,
            'hospital_name': self.hospital.hospital_name if self.hospital else None,
            'hospital_phone': self.hospital.phone if self.hospital else None,
            'blood_group': self.blood_group,
            'units_required': self.units_required,
            'emergency_level': self.emergency_level,
            'city': self.city,
            'location': self.location,
            'description': self.description,
            'status': self.status,
            'required_date': self.required_date.isoformat() if self.required_date else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<BloodRequest {self.id}: {self.blood_group} ({self.emergency_level}) for {self.city}>'


class DonationHistory(db.Model):
    """Historical records of blood donations completed or scheduled."""
    __tablename__ = 'donation_history'

    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('donors.id', ondelete='CASCADE'), nullable=False)
    request_id = db.Column(db.Integer, db.ForeignKey('blood_requests.id', ondelete='SET NULL'), nullable=True)
    donation_date = db.Column(db.DateTime, default=utc_now, nullable=False)
    status = db.Column(db.String(20), default='Completed', nullable=False)  # 'Scheduled', 'Completed', 'Cancelled'
    units_donated = db.Column(db.Integer, default=1, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=utc_now, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'donor_id': self.donor_id,
            'donor_name': self.donor.user.name if (self.donor and self.donor.user) else None,
            'blood_group': self.donor.blood_group if self.donor else None,
            'request_id': self.request_id,
            'hospital_name': self.blood_request.hospital.hospital_name if (self.blood_request and self.blood_request.hospital) else None,
            'donation_date': self.donation_date.isoformat() if self.donation_date else None,
            'status': self.status,
            'units_donated': self.units_donated,
            'notes': self.notes
        }

    def __repr__(self):
        return f'<DonationHistory {self.id}: Donor {self.donor_id} -> Status {self.status}>'


class Notification(db.Model):
    """User notifications for requests, status changes, and emergencies."""
    __tablename__ = 'notifications'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    request_id = db.Column(db.Integer, db.ForeignKey('blood_requests.id', ondelete='SET NULL'), nullable=True)
    message = db.Column(db.Text, nullable=False)
    notification_type = db.Column(db.String(50), default='info', nullable=False)  # 'emergency', 'request', 'status', 'info'
    is_read = db.Column(db.Boolean, default=False, nullable=False, index=True)
    created_at = db.Column(db.DateTime, default=utc_now, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'request_id': self.request_id,
            'message': self.message,
            'notification_type': self.notification_type,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

    def __repr__(self):
        return f'<Notification {self.id} for User {self.user_id}: read={self.is_read}>'
