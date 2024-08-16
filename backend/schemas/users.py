from pydantic import BaseModel, EmailStr
from .expenses import Expense, Income

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    expenses: list['Expense'] = []
    incomes: list['Income'] = []
    balance_dzd: float = 0.0
    balance_eur: float= 0.0

    class Config: 
        orm_mode = True

class UserInDB(User):
    hashed_password: str

class UserInResponse(BaseModel):
    id: int
    username: str
    email: str
    balance_dzd: float
    balance_eur: float
   