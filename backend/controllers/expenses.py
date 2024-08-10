from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from models import Expense
from schemas import expenses
from controllers.balance import decrease_balance, update_balance

def create_expense(db:Session, expense: expenses.ExpenseCreate, user_id: int):
  db_expense = Expense(**expense.model_dump(), user_id=user_id)
  db.add(db_expense)
  db.commit()
  db.refresh(db_expense)

  if expense.currency == "DZD":
    decrease_balance(db, user_id, amount_dzd=expense.amount)
  elif expense.currency == "EUR":
    decrease_balance(db, user_id, amount_eur=expense.amount)

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
  if expense:
    amount_difference = expense_update.amount - expense.amount

    if amount_difference !=0:
      if expense.currency == "DZD":
        update_balance(db, user_id, amount_dzd=amount_difference)
      elif expense.currency == "EUR":
        update_balance(db, user_id, amount_eur=amount_difference)

    for var, value in vars(expense_update).items():
      setattr(expense, var, value) if value else None

    db.commit()
    db.refresh(expense)

  return expense

def delete_expense(db:Session, expense_id:int, user_id: int):
  db_expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id ==  user_id).first()
  if db_expense:
    if db_expense.currency == "DZD":
      update_balance(db, user_id, amount_dzd=db_expense.amount)
    elif db_expense.currency == "EUR":
      update_balance(db, user_id, amount_eur=db_expense.amount)
    db.delete(db_expense)
    db.commit()
    return db_expense
  return None