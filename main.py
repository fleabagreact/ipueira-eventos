from fastapi import FastAPI
from routes import auth
from database import Base, engine
from routes import auth, eventos

app = FastAPI(title="Plataforma de Eventos")

# Criação das tabelas
Base.metadata.create_all(bind=engine)

# Rotas
app.include_router(auth.router)
app.include_router(eventos.router)