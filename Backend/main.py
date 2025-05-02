from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import LogInSchema, UserSchema
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

@app.post("/add_user")
def create_user(user: UserSchema):
    new_user = User(first_name=user.first_name,last_name=user.last_name,email=user.email,password=user.password)
    db_session.add(new_user)
    db_session.commit()
@app.get("/get_user")
def get_user(user_credentials: LogInSchema) :
    user = db_session.query(User).filter(User.email == user_credentials.email).first()
    if user.password == user_credentials.password:
        return user
    else:
        return ""