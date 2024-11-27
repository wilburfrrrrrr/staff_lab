from sqlalchemy import Column, String, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship

from config.database import Base


class Employee(Base):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    applicant_id = Column(Integer, ForeignKey('applicants.id'), nullable=False)
    sueldo_base = Column(Integer)
    date_hired = Column(Date)
    extra_hours = Column(Integer)
    bonificacion = Column(Integer)
    auxilio_rodamiento = Column(Integer)
    last_payment = Column(Date)

    applicant = relationship("Applicants", back_populates="employees")
    payment_history = relationship("PaymentHistory", back_populates="employee", cascade="all, delete-orphan")
