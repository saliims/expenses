from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from schemas import expenses as expense_schemas, users as user_schemas
from controllers import expenses as expense_controller
from database import get_db
from fastapi.security import OAuth2PasswordBearer
from .users import get_current_user

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

@router.get('/', response_model=List[expense_schemas.Expense])
async def read_expenses(
  skip: int = 0,
  limit: int = 100,
  type: Optional[str] = None,
  sort_by_amount: Optional[str] = Query(None, regex="^(asc|desc)$"),
  db: Session = Depends(get_db),
  current_user: user_schemas.User = Depends(get_current_user)
):
  return expense_controller.get_expenses(
    db, 
    user_id=current_user.id, 
    skip=skip, limit=limit, 
    type=type, 
    sort_by_amount=sort_by_amount)

@router.get('/{expense_id}')
async def read_expense(
  expense_id: int,
  db: Session = Depends(get_db),
  current_user: user_schemas.User = Depends(get_current_user)
):
  expense = expense_controller.get_expense(
    db, 
    user_id=current_user.id, 
    expense_id=expense_id)
  if expense is None:
    raise HTTPException(status_code=404, detail='Expense not found')
  return expense