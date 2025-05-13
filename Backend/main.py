from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import LogInSchema, ProductSchema, UserSchema, WishlistSchema,OrderSchema
from database import Base,SessionLocal,engine
from models import User,Product,Order,OrderProduct,WishList,Cart,CartProduct

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
        raise HTTPException(500,detail="Invalid login details")

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

@app.post("/add_cart/{user_id}/{prod_id}")
def add_to_cart(user_id:int,prod_id:int):
    try:
        user_cart = db_session.query(Cart).filter(Cart.user_id == user_id).first()

        #if cart is empty create a new one
        if not user_cart:
            db_session.add(Cart(user_id = user_id,status = "Active"))
            db_session.commit()
            new_cart = db_session.query(Cart).filter(Cart.user_id == user_id).first()
            cart_product = CartProduct(cart_id = new_cart.cart_id,prod_id = prod_id)
            db_session.add(cart_product)
            db_session.commit()

        elif user_cart:
            cart_product = CartProduct(cart_id = user_cart.cart_id,prod_id = prod_id)
            db_session.add(cart_product)
            db_session.commit()
        else:
            raise HTTPException(500,detail="The server failed to process your request")
    except Exception as e:
        raise HTTPException(500)
    

@app.get("/user_cart/{user_id}")
def get_user_cart(user_id:int):
    try:
        return db_session.query(Product).\
            join(CartProduct, CartProduct.prod_id ==  Product.prod_id).\
            join(Cart,Cart.cart_id == CartProduct.cart_id).\
            filter(Cart.user_id == user_id).all()
    except Exception as e:
        raise HTTPException(404, detail="Cart not found")

@app.delete("/delete_cart/{user_id}/{prod_id}")
def delete_from_cart(user_id:int,prod_id:int):
    try:
        #1- Find user cart
        user_cart = db_session.query(Cart).filter(Cart.user_id == user_id).first()
        if user_cart:
            #2- Find product from the cart
            user_product = db_session.query(CartProduct).filter(CartProduct.cart_id == user_cart.cart_id,CartProduct.prod_id == prod_id).first()
            #3- Delete product
            db_session.delete(user_product)
        else:
            raise HTTPException(404,"CART Not Found")
        
        #4- update changes
        db_session.commit()
    except Exception as e:
        raise HTTPException(500)

@app.post("/create_order")
def create_order(order:OrderSchema):
    #create order first
    user_order = Order(user_id=order.user_id,total=order.total)
    db_session.add(user_order)
    db_session.flush()
    
    #Add products
    for product in order.products:
        order_product = OrderProduct(prod_id = product.prod_id,order_id = user_order.order_id)
        db_session.add(order_product)
    db_session.commit()

@app.get("/orders")
def get_orders():
    order_products: List[OrderSchema] = []
    products_schema : List[ProductSchema] = []
    orders = db_session.query(Order).all()

    for order in orders:
        products = db_session.query(Product).join(OrderProduct, OrderProduct.prod_id == Product.prod_id).join(Order,Order.order_id == OrderProduct.order_id).all()
        for prod in products:
            prod_schema = ProductSchema(
                prod_id=prod.prod_id,
                title=prod.title,
                name=prod.name,
                description=prod.description,
                category=prod.category,
                quantity=prod.quantity,
                price=prod.price,
                )
            products_schema.append(prod_schema)

        order_products.append(OrderSchema(
            products=products_schema,
            total = order.total,
            user_id=order.user_id,
            status=order.status,
            order_id=order.order_id
            ))
        
    return order_products