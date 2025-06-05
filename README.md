# Ipueira-Eventos

## 1. Visão Geral

**Tecnologias Utilizadas:**
- Python 3.10+
- FastAPI
- Uvicorn
- SQLAlchemy
- SQLite
- JWT (com `python-jose`)
- Pydantic
- Passlib (para hashing de senhas)

**Descrição:**  
Plataforma Web para gestão de eventos comunitários da cidade de Ipueira, com foco na organização, divulgação e acompanhamento de eventos como festivais, campeonatos, reuniões culturais e religiosas.

**Objetivo:**  
Facilitar o cadastro, gerenciamento e divulgação de eventos comunitários, com funcionalidades de autenticação, filtros, avaliações e inteligência artificial para recomendações e prevenção de conflitos de agenda.

---

## 2. Descrição Detalhada do Projeto

**O que é o projeto?**  
Uma API desenvolvida com FastAPI que oferece suporte para o gerenciamento de eventos comunitários. Permite que administradores gerenciem os eventos e que usuários possam visualizar, comentar e avaliar.

### 2.1 Funcionalidades Principais

- **Autenticação JWT**: Cadastro e login de administradores
- **CRUD de Eventos**: Criar, visualizar, atualizar e excluir eventos
- **Interação do Usuário**: Avaliação e comentários de eventos
- **Filtros Inteligentes**: Pesquisa por data, local e tipo de evento
- **Recomendações com IA**: Sugestões de eventos com base em interações passadas
- **Detecção de Conflitos**: IA identifica conflitos de agenda e sugere alternativas

### 2.2 Estrutura do Projeto

```
ipueira-eventos/
├── main.py               # Ponto de entrada da aplicação
├── database.py           # Configuração do banco de dados
├── eventos.db            # Banco de dados SQLite
├── models/               # Modelos de banco de dados
│   └── models.py         # Definições SQLAlchemy
├── routes/               # Endpoints da API
│   ├── auth.py           # Rotas de autenticação
│   └── eventos.py        # Rotas de eventos
├── schemas/              # Modelos Pydantic
│   └── schemas.py        # Validação de dados
├── utils/                # Utilitários
│   └── auth_utils.py     # Funções de autenticação
├── requirements.txt      # Dependências do projeto
└── README.md             # Documentação
```

---

## 3. Cronograma de Implementação

| Etapa | Descrição | Status |
|-------|-----------|--------|
| 1 | Estruturação inicial e banco de dados | ✔️ |
| 2 | Autenticação JWT | ✔️ |
| 3 | CRUD de eventos e filtros | 🚧 |
| 4 | Comentários, avaliações e IA | ❌ |
| 5 | Testes e documentação final | ❌ |

---

## 4. Como Executar o Projeto

### Pré-requisitos
- Python 3.10+ instalado
- Git (opcional para clonar)

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

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Inicie a aplicação:
```bash
uvicorn main:app --reload
```

A API estará disponível em `http://localhost:8000` e a documentação interativa em `http://localhost:8000/docs`.

---

## 5. Dependências Principais

As principais dependências estão listadas em `requirements.txt`:

```
fastapi==0.115.12
uvicorn==0.34.3
sqlalchemy==2.0.41
python-jose==3.5.0
passlib==1.7.4
bcrypt==4.3.0
pydantic==2.11.5
```

Para instalar todas as dependências, execute:
```bash
pip install -r requirements.txt
```