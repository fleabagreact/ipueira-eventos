# Ipueira-Eventos

## Visão Geral

**Tecnologias Utilizadas:**

* Python 3.10+
* FastAPI
* Uvicorn
* SQLAlchemy
* SQLite
* JWT (com `python-jose`)
* Pydantic
* Passlib (para hashing de senha)

**Descrição:**
Plataforma Web para gestão de eventos comunitários da cidade de Ipueira, com foco na organização, divulgação e acompanhamento de eventos como festivais, campeonatos, reuniões culturais e religiosas.

**Objetivo:**
Facilitar o cadastro, gerenciamento e divulgação de eventos comunitários, com funcionalidades de autenticação, filtros, avaliações e inteligência artificial para recomendações e prevenção de conflitos de agenda.

---

## Estrutura do Projeto

```
ipueira-eventos/
├── backend/               # Código do backend
│   ├── main.py           # Ponto de entrada da aplicação
│   ├── database.py       # Configuração do banco de dados
│   ├── models/           # Modelos de banco de dados
│   │   └── models.py     # Definições SQLAlchemy
│   ├── routes/           # Endpoints da API
│   │   ├── auth.py       # Rotas de autenticação
│   │   └── eventos.py    # Rotas de eventos
│   ├── schemas/          # Modelos Pydantic
│   │   └── schemas.py    # Validação de dados
│   ├── utils/            # Utilitários
│   │   └── auth_utils.py # Funções de autenticação
│   ├── requirements.txt  # Dependências do projeto
│   └── .gitignore        # Arquivos a serem ignorados pelo Git
└── frontend/              # Código do frontend
    ├── src/              # Código fonte do frontend
    │   ├── App.jsx       # Componente principal da aplicação
    │   ├── componentes/  # Componentes reutilizáveis
    │   │   ├── EventoCard.jsx
    │   │   ├── EventoForm.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── pages/        # Páginas da aplicação
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Cadastro.jsx
    │   │   └── Eventos.jsx
    │   ├── services/     # Comunicação com backend
    │   │   └── api.js
    │   ├── assets/       # Recursos estáticos
    │   └── index.html    # HTML principal
    ├── .env              # Variáveis de ambiente
    ├── .gitignore        # Arquivos a serem ignorados pelo Git
    └── package.json      # Dependências do frontend
```

---

## Funcionalidades Principais

* **Autenticação JWT**: Cadastro e login de administradores.
* **CRUD de Eventos**: Criar, visualizar, atualizar e excluir eventos.
* **Interação do Usuário**: Avaliação e comentários de eventos.
* **Filtros Inteligentes**: Pesquisa por data, local e tipo de evento.
* **Recomendações com IA**: Sugestões de eventos com base em interações passadas.
* **Detecção de Conflitos**: IA identifica conflitos de agenda e sugere alternativas.

---

## Como Executar o Projeto

### Pré-requisitos

* Python 3.10+ instalado
* Git (opcional para clonar)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/ipueira-eventos.git
   cd ipueira-eventos
   ```

2. Configure o ambiente virtual:

   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Linux/Mac:
   source venv/bin/activate
   ```

3. Instale as dependências do backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. Inicie a aplicação do backend:

   ```bash
   uvicorn main:app --reload
   ```

5. Para o frontend, navegue até a pasta `frontend` e instale as dependências:

   ```bash
   cd ../frontend
   npm install
   ```

6. Inicie a aplicação do frontend:

   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:8000` e a documentação interativa em `http://localhost:8000/docs`. O frontend estará disponível em `http://localhost:5173`.

---

## Dependências Principais

As principais dependências do backend estão listadas em `requirements.txt`:

```
fastapi==0.115.12
uvicorn==0.34.3
sqlalchemy==2.0.41
python-jose==3.5.0
passlib==1.7.4
bcrypt==4.3.0
pydantic==2.11.5
```

As principais dependências do frontend estão listadas em `package.json`:

```json
{
  "dependencies": {
    "axios": "^1.11.0",
    "bootstrap": "^5.3.7",
    "jwt-decode": "^4.0.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.7.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.6.0",
    "vite": "^7.0.4"
  }
}
```

Para instalar todas as dependências, execute:

```bash
pip install -r requirements.txt
```

e

```bash
npm install
```

---
