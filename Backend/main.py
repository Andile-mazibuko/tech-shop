from os import name
from typing import List
from urllib import response
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

@app.post("/create_account")
def create_user(user: UserSchema):
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=user.password
        )
    try:
        db_session.add(new_user)
        db_session.commit()
    except Exception as e:
         raise HTTPException(status_code=500,detail="Internal server Exception")

@app.get("/get_users")   
def get_users():
    try:
        return db_session.query(User).all()
    except Exception as e:
        raise HTTPException(status_code=500,detail="Internal server error")

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
        description=prod.description,
        quantity = prod.quantity
        )
    db_session.add(product)
    db_session.commit()

@app.get("/get_products")
def getProducts():
    try:
        return db_session.query(Product).all()
    except Exception as e:
        raise HTTPException(status_code=500,detail="Internal server error")
    
@app.get("/prod_category/{category}")
def get_products_by_category(category:str):
    try:
        products =  db_session.query(Product).filter(Product.category == category).all()
        if not products:
            raise HTTPException(404,"products Not found")
        return products
    except Exception as e:
        raise HTTPException(status_code=500,detail="internal Server error")