from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import Admin, Usuario
from schemas.schemas import UsuarioCreate, Token
from database import SessionLocal
from utils.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=Token)
def register_user(user: UsuarioCreate, db: Session = Depends(get_db)):
    if user.username.lower() == "admin":
        raise HTTPException(status_code=403, detail="Este nome de usuário não é permitido.")
    
    if db.query(Usuario).filter(Usuario.username == user.username).first():
        raise HTTPException(status_code=400, detail="Usuário já existe")
    
    new_user = Usuario(
        username=user.username,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.username, "role": "user"})
    return {"access_token": token, "token_type": "bearer", "role": "user"}

@router.post("/login", response_model=Token)
def login(user: UsuarioCreate, db: Session = Depends(get_db)):
    if user.username.lower() == "admin":
        admin = db.query(Admin).filter(Admin.username == user.username).first()
        if not admin or not verify_password(user.password, admin.hashed_password):
            raise HTTPException(status_code=400, detail="Credenciais inválidas")
        token = create_access_token({"sub": admin.username, "role": "admin"})
        return {"access_token": token, "token_type": "bearer", "role": "admin"}
    
    db_user = db.query(Usuario).filter(Usuario.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
    
    token = create_access_token({"sub": db_user.username, "role": "user"})
    return {"access_token": token, "token_type": "bearer", "role": "user"}
