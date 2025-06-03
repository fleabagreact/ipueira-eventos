from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import Admin
from schemas.schemas import AdminCreate, Token
from database import SessionLocal
from utils.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=Token, operation_id="auth_register_admin")
def register_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.username == admin.username).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    
    new_admin = Admin(
        username=admin.username,
        hashed_password=hash_password(admin.password)
    )
    
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)

    token = create_access_token({"sub": new_admin.username})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/login", response_model=Token, operation_id="auth_login_admin")
def login_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.username == admin.username).first()
    
    if not db_admin or not verify_password(admin.password, db_admin.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    
    token = create_access_token({"sub": db_admin.username})
    return {"access_token": token, "token_type": "bearer"}
