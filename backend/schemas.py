from pydantic import BaseModel
from typing import Optional, List

class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    category: str
    image: Optional[str] = None
    description: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    class Config:
        orm_mode = True

class RetailerBase(BaseModel):
    name: str
    logo: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    delivery_options: Optional[str] = None
    product_id: int

class RetailerCreate(RetailerBase):
    pass

class RetailerOut(RetailerBase):
    id: int
    class Config:
        orm_mode = True

class CartItemBase(BaseModel):
    product_id: int
    retailer_id: int
    quantity: int
    price: float

class CartItemCreate(CartItemBase):
    pass

class CartItemOut(CartItemBase):
    id: int
    class Config:
        orm_mode = True
