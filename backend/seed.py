import sys
import os
import json

# Ensure backend is in sys.path for direct script execution
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm import Session
from backend.database import engine, SessionLocal
from backend import models
from .auth import hash_password

# Sample data (copy from mockData.ts, adapted to Python)
PRODUCTS = [
    {
        "name": "Organic Bananas (6 pack)",
        "category": "Fresh Produce",
        "image": "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400",
        "description": "Fresh organic bananas, perfect for snacking or baking",
        "retailers": [
            {"name": "Royal Bee", "price": 1.20, "rating": 4.5, "delivery_options": "Same day delivery"},
            {"name": "Tesco", "price": 1.30, "rating": 4.3, "delivery_options": "Next day delivery"},
            {"name": "Sainsbury's", "price": 1.25, "rating": 4.2, "delivery_options": "Next day delivery"},
            {"name": "Morrisons", "price": 1.35, "rating": 4.1, "delivery_options": "2-3 day delivery"},
        ]
    },
    {
        "name": "Whole Milk (2L)",
        "category": "Dairy",
        "image": "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400",
        "description": "Fresh whole milk, rich in calcium and protein",
        "retailers": [
            {"name": "Royal Bee", "price": 1.35, "rating": 4.6, "delivery_options": "Same day delivery"},
            {"name": "Tesco", "price": 1.40, "rating": 4.4, "delivery_options": "Next day delivery"},
            {"name": "Sainsbury's", "price": 1.45, "rating": 4.3, "delivery_options": "Next day delivery"},
            {"name": "Morrisons", "price": 1.38, "rating": 4.2, "delivery_options": "2-3 day delivery"},
        ]
    },
    {
        "name": "Sourdough Bread",
        "category": "Bakery",
        "image": "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400",
        "description": "Artisan sourdough bread, freshly baked daily",
        "retailers": [
            {"name": "Royal Bee", "price": 1.80, "rating": 4.7, "delivery_options": "Same day delivery"},
            {"name": "Tesco", "price": 1.95, "rating": 4.5, "delivery_options": "Next day delivery"},
            {"name": "Sainsbury's", "price": 1.85, "rating": 4.4, "delivery_options": "Next day delivery"},
            {"name": "Morrisons", "price": 1.90, "rating": 4.3, "delivery_options": "2-3 day delivery"},
        ]
    },
    {
        "name": "Free-Range Eggs (12 pack)",
        "category": "Fresh Produce",
        "image": "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400",
        "description": "Fresh free-range eggs from happy hens",
        "retailers": [
            {"name": "Royal Bee", "price": 2.20, "rating": 4.8, "delivery_options": "Same day delivery"},
            {"name": "Tesco", "price": 2.30, "rating": 4.6, "delivery_options": "Next day delivery"},
            {"name": "Sainsbury's", "price": 2.25, "rating": 4.5, "delivery_options": "Next day delivery"},
            {"name": "Morrisons", "price": 2.35, "rating": 4.4, "delivery_options": "2-3 day delivery"},
        ]
    },
    {
        "name": "Pasta - Penne (500g)",
        "category": "Pantry",
        "image": "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400",
        "description": "Premium durum wheat pasta, perfect for family meals",
        "retailers": [
            {"name": "Royal Bee", "price": 0.85, "rating": 4.4, "delivery_options": "Same day delivery"},
            {"name": "Tesco", "price": 0.90, "rating": 4.3, "delivery_options": "Next day delivery"},
            {"name": "Sainsbury's", "price": 0.88, "rating": 4.2, "delivery_options": "Next day delivery"},
            {"name": "Morrisons", "price": 0.92, "rating": 4.1, "delivery_options": "2-3 day delivery"},
        ]
    },
    {
        "name": "Chicken Breast (500g)",
        "category": "Meat",
        "image": "https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=400",
        "description": "Fresh chicken breast, high in protein",
        "retailers": [
            {"name": "Royal Bee", "price": 3.50, "rating": 4.6, "delivery_options": "Same day delivery"},
            {"name": "Tesco", "price": 3.65, "rating": 4.5, "delivery_options": "Next day delivery"},
            {"name": "Sainsbury's", "price": 3.55, "rating": 4.4, "delivery_options": "Next day delivery"},
            {"name": "Morrisons", "price": 3.70, "rating": 4.3, "delivery_options": "2-3 day delivery"},
        ]
    },
]

RETAILER_LOGOS = {
    "Royal Bee": "🐝",
    "Tesco": "🏪",
    "Sainsbury's": "🛍️",
    "Morrisons": "🏬",
}

RETAILER_DESCRIPTIONS = {
    "Royal Bee": "Your local supermarket with unbeatable prices",
    "Tesco": "Every little helps - quality products at great prices",
    "Sainsbury's": "Quality ingredients, carefully sourced",
    "Morrisons": "Fresh food specialists with local sourcing",
}

def seed():
    db = SessionLocal()
    try:
        # Clear existing data
        db.query(models.Retailer).delete()
        db.query(models.Product).delete()
        db.commit()

        # Create initial admin user if not exists
        admin = db.query(models.User).filter(models.User.username == 'admin').first()
        if not admin:
            admin_user = models.User(
                username='admin',
                email='admin@royalbee.com',
                name='Admin',
                hashed_password=hash_password('admin123'),
                role='admin',
                points=0
            )
            db.add(admin_user)
            db.commit()

        for prod in PRODUCTS:
            best_price = min([r["price"] for r in prod["retailers"]]) if prod["retailers"] else None
            product = models.Product(
                name=prod["name"],
                category=prod["category"],
                image=prod["image"],
                description=prod["description"],
                price=best_price
            )
            db.add(product)
            db.flush()  # get product.id
            for r in prod["retailers"]:
                retailer = models.Retailer(
                    name=r["name"],
                    logo=RETAILER_LOGOS.get(r["name"]),
                    description=RETAILER_DESCRIPTIONS.get(r["name"]),
                    rating=r["rating"],
                    delivery_options=r["delivery_options"],
                    product_id=product.id,
                    price=r["price"]
                )
                db.add(retailer)
        db.commit()
        print("Database seeded successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    seed() 