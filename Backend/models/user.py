from sqlalchemy import Column, String, Integer, ForeignKey, Date
from sqlalchemy.orm import relationship

from config.database import Base

class User(Base):
    __tablename__ = 'users' 
    id= Column(Integer, autoincrement=True,primary_key=True, index=True)
    email= Column(String(30), index=True,unique=True)
    password= Column(String(30),index=True)
    rol=Column(Integer)

    analyst = relationship("Analyst", back_populates="user", cascade="all, delete-orphan")

