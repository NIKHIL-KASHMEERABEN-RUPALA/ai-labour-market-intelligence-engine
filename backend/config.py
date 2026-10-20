import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "LMIS 2.0 National Decision Support Engine"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "sovereign-lmis-super-secret-nic-key-2026")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # TimescaleDB / PostgreSQL Connection String
    POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "lmis_admin")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "lmis_secure_pass")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "lmis_timescale")
    
    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # Redis Cache & Celery Broker
    REDIS_HOST: str = os.getenv("REDIS_HOST", "localhost")
    REDIS_PORT: int = int(os.getenv("REDIS_PORT", "6379"))
    REDIS_URL: str = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
    
    # Celery Task Queue
    CELERY_BROKER_URL: str = REDIS_URL
    CELERY_RESULT_BACKEND: str = REDIS_URL
    
    # Government Cloud Security
    NIC_CLEARANCE_REQUIRED: bool = True
    AUDIT_LOG_ENABLED: bool = True

    class Config:
        case_sensitive = True

settings = Settings()
