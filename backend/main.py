from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, eventos
from database import Base, engine, SessionLocal
from models.models import Admin
from utils.auth_utils import hash_password

app = FastAPI(title="Plataforma de Eventos")

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Criação das tabelas
Base.metadata.create_all(bind=engine)

# Função para criar admin padrão se não existir
def criar_admin_padrao():
    db = SessionLocal()
    admin = db.query(Admin).filter(Admin.username == "admin").first()
    if not admin:
        novo_admin = Admin(
            username="admin",
            hashed_password=hash_password("admin123")
        )
        db.add(novo_admin)
        db.commit()
        print("Admin padrão criado.")
    else:
        print("Admin padrão já existe.")
    db.close()

# Chama a função para garantir admin
criar_admin_padrao()

# Rotas
app.include_router(auth.router)
app.include_router(eventos.router)
