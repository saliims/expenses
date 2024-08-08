from pydantic import BaseModel

class ExpenseBase(BaseModel):
    description: str | None = None
    amount: float
    type: str

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    user_id: int

    class Config:
        orm_mode= True

class IncomeBase(BaseModel):
    description: str | None = None
    amount: float
    type: str

class IncomeCreate(IncomeBase):
    pass

class Income(IncomeBase):
    id: int
    user_id: int

    class Config:
        orm_mode= True