from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from schemas import expenses as income_schemas
from models import User
from controllers import incomes as income_controller
from database import get_db
from fastapi.security import OAuth2PasswordBearer
from .users import get_current_user
from datetime import datetime

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

@router.get('/', response_model=List[income_schemas.Income])
async def read_incomes(
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
  return income_controller.get_incomes(
    db, 
    user_id=current_user.id, 
    skip=skip, limit=limit, 
    type=type, 
    sort_by_amount=sort_by_amount,
    currency=currency,
    start_date=start_date,
    end_date=end_date)

@router.get('/{income_id}', response_model=income_schemas.Income)
async def read_income(
  income_id: int,
  db: Session = Depends(get_db),
  current_user: User = Depends(get_current_user)
):
  income = income_controller.get_income(
    db, 
    user_id=current_user.id, 
    income_id=income_id)
  if  income is None:
    raise HTTPException(status_code=404, detail='Income not found')
  return  income

@router.post('/', response_model=income_schemas.Income)
def create_income(
  income: income_schemas.IncomeCreate,
  db: Session =Depends(get_db),
  current_user: User = Depends(get_current_user)
):
  return income_controller.create_income(db=db, income=income, user_id=current_user.id)

@router.put("/{income_id}", response_model=income_schemas.Income)
def update_income(
    income_id: int,
    income_update: income_schemas.IncomeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    updated_income = income_controller.update_income(
        db=db,
        user_id=current_user.id,
        income_id=income_id,
        income_update=income_update,
    )
    if not updated_income:
        raise HTTPException(status_code=404, detail="Income not found")
    return updated_income

@router.delete("/{income_id}", response_model=income_schemas.Income)
def delete_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted_income = income_controller.delete_income(db=db, income_id=income_id, user_id=current_user.id)
    if not deleted_income:
        raise HTTPException(status_code=404, detail="Income not found")
    return deleted_income