from sqlalchemy.orm import Session
from models import User 

def update_balance(db: Session, user_id: int, amount_dzd: float = 0.0, amount_eur: float = 0.0):
  user = db.query(User).filter(User.id == user_id).first()
  if user:
    user.balance_dzd += amount_dzd
    user.balance_eur += amount_eur
    db.commit()
    db.refresh(user)

def decrease_balance(db: Session, user_id: int, amount_dzd: float = 0.0, amount_eur: float = 0.0):
  user = db.query(User).filter(User.id == user_id).first()
  if user:
    user.balance_dzd -= amount_dzd
    user.balance_eur -= amount_eur
    db.commit()
    db.refresh(user)