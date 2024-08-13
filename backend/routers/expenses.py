from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from schemas import expenses as expense_schemas
from models import User
from controllers import expenses as expense_controller
from database import get_db
from fastapi.security import OAuth2PasswordBearer
from .users import get_current_user
from datetime import datetime

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

@router.get('/', response_model=List[expense_schemas.Expense])
async def read_expenses(
  skip: int = 0,
  limit: int = 100,
  type: Optional[str] = None,
  sort_by_amount: Optional[str] = Query(None, regex="^(asc|desc)$"),
  currency: Optional[str] = None,
  start_date: Optional[datetime] = None,
  end_date: Optional[datetime] = None,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user)
):
  return expense_controller.get_expenses(
    db, 
    user_id=current_user.id, 
    skip=skip, limit=limit, 
    type=type, 
    sort_by_amount=sort_by_amount,
    currency=currency,
    start_date=start_date,
    end_date=end_date)

@router.get('/{expense_id}', response_model=expense_schemas.Expense)
async def read_expense(
  expense_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user)
):
  expense = expense_controller.get_expense(
    db, 
    user_id=current_user.id, 
    expense_id=expense_id)
  if expense is None:
    raise HTTPException(status_code=404, detail='Expense not found')
  return expense

@router.post('/', response_model=expense_schemas.Expense)
def create_expense(
  expense: expense_schemas.ExpenseCreate,
  db: Session =Depends(get_db),
  current_user: User = Depends(get_current_user)
):
  return expense_controller.create_expense(db=db, expense=expense, user_id=current_user.id)

@router.put("/{expense_id}", response_model=expense_schemas.Expense)
def update_expense(
    expense_id: int,
    expense_update: expense_schemas.ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated_expense = expense_controller.update_expense(
        db=db,
        user_id=current_user.id,
        expense_id=expense_id,
        expense_update=expense_update,
    )
    if not updated_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return updated_expense

@router.delete("/{expense_id}", response_model=expense_schemas.Expense)
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted_expense = expense_controller.delete_expense(db=db, expense_id=expense_id, user_id=current_user.id)
    if not deleted_expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return deleted_expense