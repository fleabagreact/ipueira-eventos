from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.models import Evento
from schemas.schemas import EventoCreate, EventoOut
from database import SessionLocal
from utils.auth_utils import admin_required

router = APIRouter(prefix="/eventos", tags=["Eventos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=EventoOut)
def criar_evento(evento: EventoCreate, db: Session = Depends(get_db), admin=Depends(admin_required)):
    novo_evento = Evento(**evento.dict())
    db.add(novo_evento)
    db.commit()
    db.refresh(novo_evento)
    return novo_evento

@router.get("/", response_model=List[EventoOut])
def listar_eventos(db: Session = Depends(get_db)):
    return db.query(Evento).all()

@router.put("/{evento_id}", response_model=EventoOut)
def atualizar_evento(evento_id: int, evento: EventoCreate, db: Session = Depends(get_db), admin=Depends(admin_required)):
    db_evento = db.query(Evento).filter(Evento.id == evento_id).first()
    if not db_evento:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    for key, value in evento.dict().items():
        setattr(db_evento, key, value)
    db.commit()
    db.refresh(db_evento)
    return db_evento

@router.delete("/{evento_id}")
def deletar_evento(evento_id: int, db: Session = Depends(get_db), admin=Depends(admin_required)):
    db_evento = db.query(Evento).filter(Evento.id == evento_id).first()
    if not db_evento:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    db.delete(db_evento)
    db.commit()
    return {"detail": "Evento deletado"}
