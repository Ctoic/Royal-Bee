import logging
logging.basicConfig(level=logging.INFO)
from fastapi import FastAPI, Depends, HTTPException, status, Body, Path, Request, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, auth, database
from .database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from .auth import hash_password, verify_password, create_access_token, get_current_admin_user
from datetime import datetime, timedelta
from sqlalchemy import func, text

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Royal Bee API")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Only allow frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Royal Bee API!"}

@app.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/products", response_model=List[schemas.ProductOut])
def list_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_products(db, skip=skip, limit=limit)

@app.post("/api/orders", response_model=schemas.OrderOut)
async def create_order(request: Request, db: Session = Depends(get_db)):
    body = await request.body()
    logging.info(f"Raw order request body: {body.decode()}")
    try:
        order_json = await request.json()
        logging.info(f"Parsed order JSON: {order_json}")
        order_obj = schemas.OrderCreate(**order_json)
        result = crud.create_order(db, order_obj)
        logging.info(f"Order created: {result.id}")
        return result
    except Exception as e:
        logging.error(f"Order creation failed: {e}")
        raise HTTPException(status_code=422, detail=f"Order creation failed: {e}")

@app.get("/api/orders", response_model=List[schemas.OrderOut])
def get_orders(userId: int, db: Session = Depends(get_db)):
    return crud.get_orders_by_user(db, userId)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email = payload.get("sub")
        if not isinstance(email, str):
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@app.get("/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@app.post("/products", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(
        name=product.name,
        category=product.category,
        image=product.image,
        description=product.description
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.put("/products/{product_id}", response_model=schemas.ProductOut)
def update_product(product_id: int = Path(...), product: schemas.ProductCreate = Body(...), db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db_product.name = product.name
    db_product.category = product.category
    db_product.image = product.image
    db_product.description = product.description
    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/products/{product_id}")
def delete_product(product_id: int = Path(...), db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return {"detail": "Product deleted"}

@app.post("/admin/login")
def admin_login(data: dict = Body(...), db: Session = Depends(get_db), response: Response = None):
    username = data.get("username")
    # password = data.get("password")  # Ignore password for now
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or user.role != "admin":
        raise HTTPException(status_code=401, detail="Invalid credentials or not admin")
    from .auth import create_access_token
    token = create_access_token({"sub": user.id, "role": user.role})
    # Set HttpOnly cookie
    if response is not None:
        response.set_cookie(key="admin_access_token", value=token, httponly=True, max_age=900)
    return {"access_token": token, "token_type": "bearer"}

@app.get("/admin/me")
def admin_me():
    # Return a mock admin user for development
    return {"id": 1, "username": "admin", "role": "admin", "email": "admin@royalbee.com"}

@app.get("/admin/secret")
def admin_secret():
    return {"message": f"Hello, admin! (dev mode)"}

@app.get("/admin/users")
def admin_list_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.get("/admin/orders")
def admin_list_orders(db: Session = Depends(get_db)):
    return db.query(models.Order).all()

@app.get("/admin/metrics")
def admin_metrics(db: Session = Depends(get_db)):
    now = datetime.now()
    today_str = now.strftime('%Y-%m-%d')
    week_ago = now - timedelta(days=7)
    week_ago_str = week_ago.strftime('%Y-%m-%d')

    total_users = db.query(models.User).count()
    total_products = db.query(models.Product).count()
    total_stores = db.query(models.Retailer.name).distinct().count()
    orders_today = db.query(models.Order).filter(models.Order.date.like(f"{today_str}%")).count()
    orders_this_week = db.query(models.Order).filter(models.Order.date >= week_ago_str).count()
    revenue = db.query(func.sum(models.Order.total)).scalar() or 0
    delivery_income = 0  # Placeholder, unless you have a field for this

    # Top 5 selling products (by order items)
    top_products = db.execute(
        text("""
        SELECT product_name, SUM(quantity) as sold
        FROM order_items
        GROUP BY product_name
        ORDER BY sold DESC
        LIMIT 5
        """)
    ).fetchall()
    top_products = [{"name": row[0], "sold": row[1]} for row in top_products]

    # Low stock alerts (products with < 5 in stock, if you have a stock field)
    low_stock = []  # Placeholder, unless you have a stock field

    # Unfulfilled orders (if you have a status field, otherwise show all)
    unfulfilled_orders = db.query(models.Order).all()
    unfulfilled_orders = [
        {"id": o.id, "customer": o.user_id, "total": o.total} for o in unfulfilled_orders
    ]

    return {
        "totalUsers": total_users,
        "totalProducts": total_products,
        "totalStores": total_stores,
        "ordersToday": orders_today,
        "ordersThisWeek": orders_this_week,
        "activeUsers": 0,  # Placeholder
        "uptime": "99.99%",  # Placeholder
        "latency": "120ms",  # Placeholder
        "revenue": revenue,
        "deliveryIncome": delivery_income,
        "topProducts": top_products,
        "lowStock": low_stock,
        "unfulfilledOrders": unfulfilled_orders,
    }
