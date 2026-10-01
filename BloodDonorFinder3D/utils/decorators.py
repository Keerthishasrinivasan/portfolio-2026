from functools import wraps
from flask import session, redirect, url_for, flash, request, jsonify


def login_required(f):
    """
    Decorator requiring an authenticated session.
    Redirects HTML requests to login page; returns JSON 401 for API calls.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            if request.path.startswith('/api/'):
                return jsonify({'success': False, 'message': 'Authentication required'}), 401
            flash('Please log in to access this page.', 'warning')
            return redirect(url_for('auth.login', next=request.path))
        return f(*args, **kwargs)
    return decorated_function


def role_required(*allowed_roles):
    """
    Decorator requiring the logged-in user to have one of the specified roles.
    Example: @role_required('donor') or @role_required('admin', 'hospital')
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session:
                if request.path.startswith('/api/'):
                    return jsonify({'success': False, 'message': 'Authentication required'}), 401
                flash('Please log in to continue.', 'warning')
                return redirect(url_for('auth.login', next=request.path))

            user_role = session.get('role')
            if user_role not in allowed_roles:
                if request.path.startswith('/api/'):
                    return jsonify({'success': False, 'message': 'Unauthorized role for this action'}), 403
                flash('You do not have permission to access this area.', 'danger')
                
                # Redirect to appropriate dashboard based on user's actual role
                if user_role == 'donor':
                    return redirect(url_for('donor.dashboard'))
                elif user_role == 'hospital':
                    return redirect(url_for('hospital.dashboard'))
                elif user_role == 'admin':
                    return redirect(url_for('admin.dashboard'))
                return redirect(url_for('main.index'))

            return f(*args, **kwargs)
        return decorated_function
    return decorator


def anonymous_required(f):
    """
    Redirects already authenticated users to their corresponding dashboard.
    Useful for login and register pages.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' in session:
            role = session.get('role')
            if role == 'donor':
                return redirect(url_for('donor.dashboard'))
            elif role == 'hospital':
                return redirect(url_for('hospital.dashboard'))
            elif role == 'admin':
                return redirect(url_for('admin.dashboard'))
            return redirect(url_for('main.index'))
        return f(*args, **kwargs)
    return decorated_function
