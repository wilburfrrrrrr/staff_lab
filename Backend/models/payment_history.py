from sqlalchemy import Column, Integer, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from config.database import Base

class PaymentHistory(Base):
    __tablename__ = 'payment_history'
    
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    employee_id = Column(Integer, ForeignKey('employees.id'), nullable=False)
    amount_paid = Column(Float, nullable=False)
    payment_date = Column(Date, nullable=False)
    
    employee = relationship("Employee", back_populates="payment_history")
