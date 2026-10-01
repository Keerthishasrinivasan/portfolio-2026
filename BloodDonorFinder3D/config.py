import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root if it exists
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / '.env')


class Config:
    """Base configuration settings."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'bdf-secret-key-fallback-change-in-production-2026')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Session security
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    PERMANENT_SESSION_LIFETIME = 86400  # 24 hours in seconds

    # Database directory ensures database/ exists
    DB_DIR = BASE_DIR / 'database'
    DB_DIR.mkdir(exist_ok=True)
    DEFAULT_DB_URI = f"sqlite:///{(DB_DIR / 'blood_donor.db').as_posix()}"
    
    _env_db = os.environ.get('DATABASE_URL')
    if not _env_db or 'database/blood_donor.db' in _env_db:
        SQLALCHEMY_DATABASE_URI = DEFAULT_DB_URI
    else:
        SQLALCHEMY_DATABASE_URI = _env_db


class DevelopmentConfig(Config):
    """Development environment configuration."""
    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    """Test environment configuration using in-memory database."""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    WTF_CSRF_ENABLED = False


class ProductionConfig(Config):
    """Production environment configuration."""
    DEBUG = False
    TESTING = False
    SESSION_COOKIE_SECURE = True


config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
