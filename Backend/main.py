from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base,SessionLocal,engine
from models import User,Product,Order,OrderProduct

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(engine)

db_session = SessionLocal()

user = User(email="andi@gmail.com",last_name="Mazibuko",first_name="andile",password="password123")

db_session.add(user)
db_session.commit()