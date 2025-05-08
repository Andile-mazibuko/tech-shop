from sqlalchemy import Column, PrimaryKeyConstraint, String,Integer,Float,ForeignKey,Date
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer,autoincrement=True,primary_key = True)
    email = Column(String,unique=True,nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String,nullable=False)
    role = Column(String)

    user_order = relationship("Order",back_populates="owner")
    
    def __init__(self,first_name,last_name,email,password,role="CUSTOMER"):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = password
        self.role = role

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
    quantity = Column(Integer)
    product = relationship("OrderProduct",back_populates="order_product")


class Order(Base):
    __tablename__ = "orders"
    order_id = Column(Integer,primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    status = Column(String)
    date= Column(Date)

    #Relationships
    owner = relationship("User",back_populates="user_order")
    order_product = relationship("OrderProduct",back_populates="order")

    def __init__(self,user_id:int,status:str = "payment recieved",date = Date()):
        self.user_id = user_id
        self.status = status
        self.date = date


#join ORDER and products
class OrderProduct(Base):
    __tablename__ = "order_products"
    order_id = Column(Integer,ForeignKey("orders.order_id"))
    prod_id = Column(Integer,ForeignKey("products.prod_id"))

    __table_args__ = (PrimaryKeyConstraint('order_id', 'prod_id'),)

    order = relationship("Order",back_populates="order_product")
    order_product = relationship("Product",back_populates="product")

class WishList(Base):
    __tablename__ = "wishlist"
    user_id = Column(Integer,ForeignKey("users.user_id"))
    prod_id = Column(Integer,ForeignKey("products.prod_id"))

    __table_args__ = (PrimaryKeyConstraint('user_id','prod_id'),)