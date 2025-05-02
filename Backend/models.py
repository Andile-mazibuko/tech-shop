from sqlalchemy import Column, String,Integer,Float,ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer,autoincrement=True,primary_key = True)
    email = Column(String,unique=True,nullable=False)
    first_name = Column(String)
    password = Column(String,nullable=False)
    role = Column(String)

    user_order = relationship("Order",back_populates="owner")
   
    #TODO: Hash password
    def hashPassword(self,password:str):
        return ""

class Product(Base):
    __tablename__ = "products"
    prod_id = Column(Integer,primary_key=True)
    title = Column(String)
    name = Column(String)
    description = Column(String)
    price = Column(Float, nullable=False)
    category = Column(String,nullable=False)

    order_product = relationship("Order",back_populates="order_products")


class Order(Base):
    __tablename__ = "orders"
    order_id = Column(Integer,primary_key=True)
    user_id = Column(Integer, ForeignKey="users.user_id")

    owner = relationship("User",back_populates="user_order")

#join ORDER and products
class OrderProduct(Base):
    __tablename__ = "order_products"
    order_id = Column(Integer,ForeignKey="orders.order_id")
    prod_id = Column(Integer,ForeignKey="products.prod_id")

    order = relationship("Order",back_populates="order_product")
    order_product = relationship("Product",back_populates="order_product")

