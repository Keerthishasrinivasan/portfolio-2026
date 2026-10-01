"""
Blood Donor Finder - Main Application Entry Point
-------------------------------------------------
Flask Application Factory with database, blueprints, error handlers,
and development CLI commands.
"""

import os
from flask import Flask, render_template, session
from config import config_by_name
from models import db, User, Notification
from routes import register_blueprints


def create_app(config_name=None):
    """Application factory to create and configure the Flask app."""
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'development')

    app = Flask(__name__)
    app.config.from_object(config_by_name.get(config_name, config_by_name['default']))

    # Initialize SQLAlchemy
    db.init_app(app)

    # Register all blueprints
    register_blueprints(app)

    # Global template context processor
    @app.context_processor
    def inject_globals():
        user_id = session.get('user_id')
        unread_count = 0
        current_user = None
        if user_id:
            current_user = db.session.get(User, user_id)
            if current_user:
                unread_count = Notification.query.filter_by(user_id=user_id, is_read=False).count()

        return {
            'current_user': current_user,
            'unread_notifications_count': unread_count,
            'current_role': session.get('role')
        }

    # Custom HTTP error handlers
    @app.errorhandler(403)
    def forbidden_error(error):
        return render_template('errors/403.html'), 403

    @app.errorhandler(404)
    def not_found_error(error):
        return render_template('errors/404.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return render_template('errors/500.html'), 500

    # Custom CLI commands
    @app.cli.command('init-db')
    def init_db_command():
        """Initialize database tables."""
        with app.app_context():
            db.create_all()
            print("Successfully initialized all database tables.")

    @app.cli.command('seed-db')
    def seed_db_command():
        """Populate database with sample development data."""
        from database.seed import seed_database
        with app.app_context():
            seed_database()
            print("Successfully seeded development data.")

    return app


# Create default app instance
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
