from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.schemas import EventoCreate, EventoOut
from models.models import Evento
from database import SessionLocal
from typing import List

router = APIRouter(prefix="/eventos", tags=["Eventos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=EventoOut)
def criar_evento(evento: EventoCreate, db: Session = Depends(get_db)):
    novo_evento = Evento(**evento.dict())
    db.add(novo_evento)
    db.commit()
    db.refresh(novo_evento)
    return novo_evento

@router.get("/", response_model=List[EventoOut])
def listar_eventos(db: Session = Depends(get_db)):
    return db.query(Evento).all()