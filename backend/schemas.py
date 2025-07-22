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
    price: Optional[float] = None

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    retailers: Optional[List['RetailerOut']] = None
    class Config:
        orm_mode = True

class RetailerBase(BaseModel):
    name: str
    logo: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    delivery_options: Optional[str] = None
    product_id: int
    price: Optional[float] = None

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

class OrderItemBase(BaseModel):
    product_name: str
    quantity: int
    retailer: str
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemOut(OrderItemBase):
    id: int
    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    date: str
    total: float
    payment: str
    address: str

class OrderCreate(OrderBase):
    items: List[OrderItemCreate]
    user_id: int

class OrderOut(OrderBase):
    id: int
    items: List[OrderItemOut]
    user_id: int
    class Config:
        orm_mode = True

ProductOut.update_forward_refs()
