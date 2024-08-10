from sqlalchemy.orm import Session
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from models import User
from schemas import users as us

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_email_or_username(db: Session, username_or_email: str):
    return db.query(User).filter(
        (User.email == username_or_email) | (User.username == username_or_email )
    ).first()

def get_users(db:Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()

def register(db: Session, user: us.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, 
                   email=user.email, 
                   hashed_password=hashed_password,
                   balance_dzd=0.0,
                   balance_eur=0.0)
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except IntegrityError:
        db.rollback()
        existing_user = get_user_by_email_or_username(db, user.username)
        if existing_user:
            if existing_user.username == user.username:
                raise ValueError("Username already registred")
            else:
                raise ValueError("Email already registred")
    return db_user

def login(db: Session, username_or_email: str, password: str):
    user = get_user_by_email_or_username(db, username_or_email)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user
    