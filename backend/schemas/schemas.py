from pydantic import BaseModel
from datetime import datetime

class AdminCreate(BaseModel):
    username: str
    password: str

class UsuarioCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str

class EventoBase(BaseModel):
    titulo: str
    descricao: str
    data: datetime
    local: str
    tipo: str

class EventoCreate(EventoBase):
    pass

class EventoOut(EventoBase):
    id: int
    criado_em: datetime

    class Config:
        from_attributes = True
