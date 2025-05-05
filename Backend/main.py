from os import name
from turtle import title
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import LogInSchema, ProductSchema, UserSchema
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
@app.get("/login")
def get_user(user_credentials: LogInSchema) :
    user = db_session.query(User).filter(User.email == user_credentials.email).first()
    if user.password == user_credentials.password:
        return user
    else:
        return ""

@app.post("/add_product")
def addProduct(prod: ProductSchema):
    product = Product(
        name=prod.name,
        category=prod.category,
        price=prod.price,
        title=prod.title,
        description=prod.description
        )
    db_session.add(product)
    db_session.commit()

@app.get("/get_products")
def getProducts():
    try:
        return db_session.query(Product).all()
    except Exception as e:
        raise HTTPException(status_code=500,detail="Internal server Exception")