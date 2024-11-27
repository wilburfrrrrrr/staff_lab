from sqlalchemy import Column, String, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship

from config.database import Base

class Applicants(Base):
    __tablename__ = 'applicants'
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, index=True)
    second_name = Column(String, index=True)
    last_name = Column(String, index=True)
    second_last_name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone = Column(String, index=True)
    genre = Column(String, index=True)
    state = Column(Integer, index=True)
    cv = Column(String)

    employees = relationship("Employee", back_populates="applicant", cascade="all, delete-orphan")