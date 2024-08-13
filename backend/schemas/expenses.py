from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class CurrencyEnum(str, Enum):
    DZD = "DZD"
    EUR = "EUR"

class TransactionTypeEnum(str, Enum):
    Food = "Food"
    Fun = "Fun"
    Salary = "Salary"
    Clothes = "Clothes"
    Tech = "Tech"

class ExpenseBase(BaseModel):
    description: str | None = None
    amount: float
    currency: CurrencyEnum
    type: TransactionTypeEnum

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode= True

class IncomeBase(BaseModel):
    description: str | None = None
    amount: float
    currency: CurrencyEnum
    type: TransactionTypeEnum

class IncomeCreate(IncomeBase):
    pass

class Income(IncomeBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode= True