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

    class Config: 
        orm_mode = True

class UserInDB(User):
    hashed_password: str