"""
Database Connection & Engine Manager
PostgreSQL + TimescaleDB Extension • SQLAlchemy 2.0 Async Engine
Ministry of Skill Development & Entrepreneurship (MSDE)
"""

import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://lmis_admin:lmis_secure_pass@localhost:5432/lmis_timescale"
)

# Engine configured for high-concurrency analytical reads & time-series streaming
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_size=20,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=1800,
    pool_pre_ping=True,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)

class Base(DeclarativeBase):
    pass

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for injecting database sessions into FastAPI endpoints."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def verify_timescaledb_extension() -> bool:
    """Checks if TimescaleDB extension is active on the connected PostgreSQL instance."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            text("SELECT extname, extversion FROM pg_extension WHERE extname = 'timescaledb';")
        )
        row = result.fetchone()
        if row:
            print(f"[TimescaleDB] Active version: {row.extversion}")
            return True
        print("[TimescaleDB] Warning: extension not detected. Running on standard PostgreSQL.")
        return False
