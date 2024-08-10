from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routers import expenses, users, incomes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(users.router, prefix="/api/users", tags=['users'])
app.include_router(expenses.router, prefix="/api/expenses", tags=['expenses'])
app.include_router(incomes.router, prefix="/api/incomes", tags=['incomes'])

@app.get('/')
async def root():
    return {"message": "Welcome to the Expense Tracker API"}
