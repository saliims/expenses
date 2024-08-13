import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from jose import JWTError, jwt
from datetime import datetime, timedelta
from pydantic import BaseModel

from controllers import users as us
from schemas import users
from database import get_db

load_dotenv()

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRES_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 30))

def create_access_token(data: dict):
  to_encode = data.copy()
  expire = datetime.now() + timedelta(minutes=int(ACCESS_TOKEN_EXPIRES_MINUTES))
  to_encode.update({'exp': expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db:Session = Depends(get_db)):
  credentials_exception = HTTPException(status_code=401, detail='Could not validate credentials', headers={"WWW-Authenticate": "Bearer"})
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username_or_email: str = payload.get('sub')
    if username_or_email is None:
      raise credentials_exception
  except JWTError:
    raise credentials_exception
  user = us.get_user_by_email_or_username(db, username_or_email=username_or_email)
  return user

@router.post('/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  user = us.login(db, form_data.username, form_data.password)
  if not user: 
    raise HTTPException(status_code=400, detail='Incorrect credentials')
  access_token = create_access_token(data={"sub": user.username})

  user_data = users.UserInResponse(
    id=user.id,
    username=user.username,
    email=user.email
  )
  return {"access_token": access_token, "token_type": "bearer", "user":user_data.model_dump()}

@router.post('/register', response_model=users.User)
def signup(user: users.UserCreate, db: Session = Depends(get_db)):
  try: 
    return us.register(db=db, user=user)
  except ValueError as e:
    raise HTTPException(status_code=400, detail=str(e))
  
@router.get('/me', response_model=users.User)
async def read_users_me(current_user: users.User = Depends(get_current_user)):
  return current_user

@router.get('/', response_model=List[users.User])
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
  users = us.get_users(db, skip=skip, limit=limit)
  return users