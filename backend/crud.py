from sqlalchemy.orm import Session, joinedload
from . import models, schemas
from .auth import get_password_hash, verify_password

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).options(joinedload(models.Product.retailers)).offset(skip).limit(limit).all()

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        user_id=order.user_id,
        date=order.date,
        total=order.total,
        payment=order.payment,
        address=order.address
    )
    db.add(db_order)
    db.flush()     # To get db_order.id before adding items
    for item in order.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_name=item.product_name,
            quantity=item.quantity,
            retailer=item.retailer,
            price=item.price
        )
        db.add(db_item)
    # Award points: 2 points for every 10 euros spent
    user = db.query(models.User).filter(models.User.id == order.user_id).first()
    if user:
        points_awarded = int(order.total // 10) * 2
        user.points = (user.points or 0) + points_awarded
    db.commit()
    db.refresh(db_order)
    # Optionally, return points_awarded for frontend display
    # return db_order, points_awarded
    return db_order

def get_orders_by_user(db: Session, user_id: int):
    return db.query(models.Order).options(joinedload(models.Order.items)).filter(models.Order.user_id == user_id).all()
