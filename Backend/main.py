from os import name
from typing import List
from urllib import response
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import LogInSchema, ProductSchema, UserSchema, WishlistSchema
from database import Base,SessionLocal,engine
from models import User,Product,Order,OrderProduct,WishList

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

@app.post("/login")
def get_user(user_credentials: LogInSchema) :
    try:
        user:User = db_session.query(User).filter(User.email == user_credentials.email).first()
        if user.password == user_credentials.password:
            return user
        else:
            raise HTTPException(404)
    except Exception:
        raise HTTPException(500)

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
    except Exception:
        raise HTTPException(status_code=500,detail="internal Server error")

@app.post("/add_wishlist")
def add_to_wishlist(data:WishlistSchema):
    wishlist = WishList(user_id = data.user_id,prod_id=data.prod_id)
    db_session.add(wishlist)
    db_session.commit()

"""
Join Tables and return a list of products
"""
@app.get("/wishlist/{user_id}")
def get_user_wishlist(user_id:int):
    try:
       return db_session.query(Product).join(WishList).filter(Product.prod_id == WishList.prod_id,WishList.user_id == user_id).all()
    except Exception as e:
        raise HTTPException(500)
    

@app.delete('/wishlist_delete/{user_id}/{prod_id}')
def delete_from_wishlist(user_id: int,prod_id:int):
    wishlist_item = db_session.query(WishList).filter(WishList.user_id == user_id, WishList.prod_id == prod_id).first()
    db_session.delete(wishlist_item)
    db_session.commit()