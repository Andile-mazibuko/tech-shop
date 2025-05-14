from typing import List, Optional
from pydantic import BaseModel
from datetime import date

class UserSchema(BaseModel):
    first_name: str
    last_name: str
    password: str
    role: Optional[str] = None
    email: str

class LogInSchema(BaseModel):
    email: str
    password: str

class ProductSchema(BaseModel):
    prod_id:Optional[int] = None
    title : str
    name : str
    description: str
    price: float
    category: str
    quantity:int

class WishlistSchema(BaseModel):
    user_id: int
    prod_id: int

class OrderSchema(BaseModel):
    order_id: Optional[int] = None
    user_id: int
    status: Optional[str] = None
    date: Optional[str] = None
    total: float
    products: List[ProductSchema]

class UpdateOrderStatusSchema(BaseModel):
    order_id: int
    new_status: str