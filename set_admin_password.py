from backend.database import SessionLocal
from backend.models import User
import bcrypt

# --- CONFIGURE THESE ---
username = "admin"
new_password = "admin123"
# -----------------------

db = SessionLocal()
user = db.query(User).filter(User.username == username).first()
if not user:
    print("Admin user not found!")
else:
    hashed = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    user.hashed_password = hashed
    db.commit()
    print(f"Password for {username} updated successfully!")
db.close() 