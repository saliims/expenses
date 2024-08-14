from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from models import Income
from schemas import expenses
from controllers.balance import update_balance, decrease_balance
from datetime import datetime

def create_income(db: Session, income: expenses.IncomeCreate, user_id:int):
  db_income= Income(**income.model_dump(), user_id=user_id)
  db.add(db_income)
  db.commit()
  db.refresh(db_income)

  if income.currency == "DZD":
    update_balance(db, user_id, amount_dzd=income.amount)
  elif income.currency == "EUR":
    update_balance(db, user_id, amount_eur=income.amount)

  return db_income

def get_incomes(db:Session, 
                user_id: int, 
                skip: int = 0, 
                limit: int =100, 
                type:str = None, 
                sort_by_amount: str = None,
                currency: str= None,
                start_date: datetime = None,
                end_date: datetime = None):
  query = db.query(Income).filter(Income.user_id == user_id)

  if type: 
    query = query.filter(Income.type == type)

  if currency: 
    query = query.filter(Income.currency == currency)

  if start_date:
    query = query.filter(Income.created_at >= start_date)

  if end_date:
    query = query.filter(Income.created_at <= end_date)

  if sort_by_amount:
    if sort_by_amount.lower() =='asc':
      query = query.order_by(asc(Income.amount))
    elif sort_by_amount.lower() == "desc":
      query = query.order_by(desc(Income.amount))

  return query.offset(skip).limit(limit).all()

def get_income(db:Session, user_id:int, income_id: int):
  return db.query(Income).filter(Income.user_id == user_id, Income.id == income_id ).first()

def update_income(db: Session, income_id: int, user_id: int, income_update: expenses.IncomeCreate):
  income = db.query(Income).filter(Income.user_id == user_id, Income.id == income_id).first()

  if income:
    amount_difference = income_update.amount - income.amount

    if amount_difference != 0:
      if income.currency == "DZD":
        update_balance(db, user_id, amount_dzd=amount_difference)
      elif income.currency == "EUR":
        update_balance(db, user_id, amount_eur=amount_difference)

    for var, value in vars(income_update).items():
      setattr(income, var, value) if value else None

    db.commit()
    db.refresh(income)
    
  return income

def delete_income(db:Session, income_id: int, user_id:int):
  db_income = db.query(Income).filter(Income.user_id == user_id, Income.id == income_id).first()
  if db_income:
    if db_income.currency == "DZD":
      decrease_balance(db, user_id, amount_dzd=db_income.amount)
    elif db_income.currency == "EUR":
      decrease_balance(db, user_id, amount_eur=db_income.amount)
    db.delete(db_income)
    db.commit()
    return db_income
  return None
