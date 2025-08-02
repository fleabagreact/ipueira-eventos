from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
from datetime import datetime

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    criado_em = Column(DateTime, default=datetime.utcnow)

class Evento(Base):
    __tablename__ = "eventos"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    descricao = Column(Text)
    data = Column(DateTime)
    local = Column(String)
    tipo = Column(String)
    criado_em = Column(DateTime, default=datetime.utcnow)
