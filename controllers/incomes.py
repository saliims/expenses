from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from models import Income
from schemas import expenses

def create_income(db: Session, income: expenses.IncomeCreate, user_id:int):
  db_income= Income(
    description= income.description,
    amount = income.amount,
    type = income.type,
    user_id = user_id,
  )
  db.add(db_income)
  db.commit()
  db.refresh(db_income)
  return db_income

def get_incomes(db:Session, user_id: int, skip: int = 0, limit: int =100, type:str = None, sort_by_amount: str = None):
  query = db.query(Income).filter(Income.user_id == user_id)

  if type: 
    query = query.filter(Income.type == type)

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
  if income is None:
    return None
  
  for var, value in vars(income_update).items():
    setattr(income, var, value) if value else None

  db.add(income)
  db.commit()
  db.refresh(income)
  return income

def delete_income(db:Session, income_id: int, user_id:int):
  db_income = db.query(Income).filter(Income.user_id == user_id, Income.id == income_id)
  if db_income:
    db.delete(db_income)
    db.commit()
    return db_income
  return None
