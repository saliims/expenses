from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from models import Expense
from schemas import expenses

def create_expense(db:Session, expense: expenses.ExpenseCreate, user_id: int):
  db_expense = Expense(
    description= expense.description,
    amount= expense.amount,
    type= expense.type,
    user_id= user_id)
  db.add(db_expense)
  db.commit()
  db.refresh(db_expense)
  return db_expense

def get_expenses(db: Session, user_id: int, skip: int = 0, limit: int =100, type: str = None, sort_by_amount: str = None):
  query = db.query(Expense).filter(Expense.user_id == user_id)

  if type:
    query = query.filter(Expense.type == type)

  if sort_by_amount:
    if sort_by_amount.lower() == 'asc':
      query = query.order_by(asc(Expense.amount))
    elif sort_by_amount.lower() == 'desc':
      query = query.order_by(desc(Expense.amount))
  
  return query.offset(skip).limit(limit).all()

def get_expense(db: Session, user_id: int,expense_id: int):
  return db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == user_id).first()

def update_expense(db: Session, user_id: int, expense_id:int, expense_update: expenses.ExpenseCreate):
  expense = db.query(Expense).filter(Expense.user_id == user_id, Expense.id == expense_id).first()
  if expense is None:
    return None
  
  for var, value in vars(expense_update).items():
    setattr(expense, var, value) if value else None
  
  db.add(expense)
  db.commit()
  db.refresh(expense)
  return expense

def delete_expense(db:Session, expense_id:int, user_id: int):
  db_expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id ==  user_id).first()
  if db_expense:
    db.delete(db_expense)
    db.commit()
    return db_expense
  return None