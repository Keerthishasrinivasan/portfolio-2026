"""Routes package for Blood Donor Finder."""

def register_blueprints(app):
    """Register all application blueprints with the Flask app."""
    from .main import main_bp
    from .auth import auth_bp
    from .donor import donor_bp
    from .hospital import hospital_bp
    from .admin import admin_bp
    from .api import api_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(donor_bp, url_prefix='/donor')
    app.register_blueprint(hospital_bp, url_prefix='/hospital')
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(api_bp, url_prefix='/api')
