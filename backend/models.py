from sqlalchemy import Column, Integer, String, Float, DateTime, func
from .db import Base


class Result(Base):
    __tablename__ = "results"
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, index=True)
    value = Column(Float, nullable=False)
    unit = Column(String, default="Pa")
    created_at = Column(DateTime, server_default=func.now())

