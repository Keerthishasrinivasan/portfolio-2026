"""Authentication routes for Donor, Hospital, and Admin."""

from datetime import datetime
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from models import db, User, Donor, Hospital
from utils.compatibility import VALID_BLOOD_GROUPS
from utils.decorators import anonymous_required, login_required

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['GET', 'POST'])
@anonymous_required
def login():
    """User login supporting Donor, Hospital, and Admin."""
    if request.method == 'POST':
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')

        if not email or not password:
            flash('Please enter both email and password.', 'warning')
            return render_template('login.html', email=email)

        user = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            flash('Invalid email or password. Please check your credentials.', 'danger')
            return render_template('login.html', email=email)

        if not user.is_active:
            flash('Your account has been deactivated. Please contact support.', 'danger')
            return render_template('login.html', email=email)

        # Set session
        session.clear()
        session['user_id'] = user.id
        session['user_name'] = user.name
        session['email'] = user.email
        session['role'] = user.role

        flash(f'Welcome back, {user.name}!', 'success')

        # Role-based redirection
        next_url = request.args.get('next')
        if next_url and next_url.startswith('/'):
            return redirect(next_url)

        if user.role == 'donor':
            return redirect(url_for('donor.dashboard'))
        elif user.role == 'hospital':
            return redirect(url_for('hospital.dashboard'))
        elif user.role == 'admin':
            return redirect(url_for('admin.dashboard'))
        return redirect(url_for('main.index'))

    return render_template('login.html')


@auth_bp.route('/register', methods=['GET', 'POST'])
@anonymous_required
def register():
    """Registration for Donors and Hospitals."""
    role = request.args.get('role', 'donor').lower()
    if role not in ('donor', 'hospital'):
        role = 'donor'

    if request.method == 'POST':
        role = request.form.get('role', 'donor').lower()
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')
        phone = request.form.get('phone', '').strip()
        city = request.form.get('city', '').strip()

        # Validation
        if not name or not email or not password or not phone or not city:
            flash('Please fill out all required fields.', 'warning')
            return render_template('register.html', active_role=role, blood_groups=VALID_BLOOD_GROUPS)

        if password != confirm_password:
            flash('Passwords do not match.', 'danger')
            return render_template('register.html', active_role=role, blood_groups=VALID_BLOOD_GROUPS)

        if len(password) < 6:
            flash('Password must be at least 6 characters long.', 'danger')
            return render_template('register.html', active_role=role, blood_groups=VALID_BLOOD_GROUPS)

        if User.query.filter_by(email=email).first():
            flash('An account with this email already exists. Please log in.', 'warning')
            return redirect(url_for('auth.login', email=email))

        try:
            user = User(
                name=name,
                email=email,
                role=role,
                phone=phone,
                location=city,
                is_active=True
            )
            user.set_password(password)
            db.session.add(user)
            db.session.flush()  # Obtain user.id

            if role == 'donor':
                blood_group = request.form.get('blood_group', '').strip().upper()
                if blood_group not in VALID_BLOOD_GROUPS:
                    db.session.rollback()
                    flash('Please select a valid blood group.', 'danger')
                    return render_template('register.html', active_role='donor', blood_groups=VALID_BLOOD_GROUPS)

                age = request.form.get('age', type=int)
                gender = request.form.get('gender', 'Other')
                address = request.form.get('address', '').strip()
                last_donation_str = request.form.get('last_donation_date', '').strip()
                last_donation_date = None
                if last_donation_str:
                    try:
                        last_donation_date = datetime.strptime(last_donation_str, '%Y-%m-%d').date()
                    except ValueError:
                        pass

                donor = Donor(
                    user_id=user.id,
                    blood_group=blood_group,
                    availability=True,
                    age=age,
                    gender=gender,
                    address=address,
                    city=city,
                    last_donation_date=last_donation_date
                )
                db.session.add(donor)

            elif role == 'hospital':
                hospital_name = request.form.get('hospital_name', '').strip() or name
                contact_person = request.form.get('contact_person', '').strip() or name
                address = request.form.get('address', '').strip()

                hospital = Hospital(
                    user_id=user.id,
                    hospital_name=hospital_name,
                    contact_person=contact_person,
                    address=address,
                    city=city,
                    location=city,
                    phone=phone,
                    verified=False  # Must be approved by admin
                )
                db.session.add(hospital)

            db.session.commit()

            # Automatic session login
            session.clear()
            session['user_id'] = user.id
            session['user_name'] = user.name
            session['email'] = user.email
            session['role'] = user.role

            flash('Registration successful! Welcome to the Blood Donor Finder network.', 'success')
            if role == 'donor':
                return redirect(url_for('donor.dashboard'))
            else:
                return redirect(url_for('hospital.dashboard'))

        except Exception as e:
            db.session.rollback()
            flash(f'An error occurred during registration: {str(e)}', 'danger')
            return render_template('register.html', active_role=role, blood_groups=VALID_BLOOD_GROUPS)

    return render_template('register.html', active_role=role, blood_groups=VALID_BLOOD_GROUPS)


@auth_bp.route('/logout')
@login_required
def logout():
    """Clear session and log out the user."""
    session.clear()
    flash('You have been successfully logged out.', 'info')
    return redirect(url_for('main.index'))
