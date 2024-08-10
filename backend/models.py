from sqlalchemy import Column, ForeignKey, String, Integer, Float, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum

class TransactionType(enum.Enum):
    Food = "Food"
    Fun = "Fun"
    Salary = "Salary"
    Clothes = "Clothes"
    Tech = "Tech"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    balance_dzd = Column(Float, default=0.0)
    balance_eur = Column(Float, default=0.0)

    expenses = relationship("Expense", back_populates="user")
    incomes = relationship("Income", back_populates="user")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    description = Column(String)
    amount = Column(Float)
    currency = Column(String)
    type = Column(Enum(TransactionType), index=True)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship("User", back_populates="expenses")


class Income(Base):
    __tablename__ = "incomes"

    id = Column(Integer, primary_key=True)
    description = Column(String)
    amount = Column(Float)
    currency = Column(String)
    type = Column(Enum(TransactionType), index=True)
    user_id = Column(Integer, ForeignKey('users.id'))

    user = relationship('User', back_populates="incomes")
