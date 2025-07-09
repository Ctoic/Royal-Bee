from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)

    cart_items = relationship("CartItem", back_populates="user")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String, nullable=False)
    image = Column(String)
    description = Column(String)

    retailers = relationship("Retailer", back_populates="product")
    cart_items = relationship("CartItem", back_populates="product")

class Retailer(Base):
    __tablename__ = "retailers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    logo = Column(String)
    description = Column(String)
    rating = Column(Float)
    delivery_options = Column(String)
    product_id = Column(Integer, ForeignKey("products.id"))

    product = relationship("Product", back_populates="retailers")

class CartItem(Base):
    __tablename__ = "cart_items"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    retailer_id = Column(Integer, ForeignKey("retailers.id"))
    quantity = Column(Integer, default=1)
    price = Column(Float)

    user = relationship("User", back_populates="cart_items")
    product = relationship("Product", back_populates="cart_items")
