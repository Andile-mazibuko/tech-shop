from typing import Optional
from pydantic import BaseModel

class UserSchema(BaseModel):
    first_name: str
    last_name: str
    password: str
    role: str
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