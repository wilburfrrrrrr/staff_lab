from sqlalchemy import Column, String, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship
from config.database import Base


class Analyst(Base):
    __tablename__ = 'analysts'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String, index=True)
    second_name = Column(String, index=True)
    last_name = Column(String, index=True)
    second_last_name = Column(String, index=True)
    phone = Column(String, index=True)

    user = relationship("User", back_populates="analyst")
