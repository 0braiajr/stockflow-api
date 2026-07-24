# StockFlow API

REST API for inventory management, built with FastAPI. Project built for portfolio purposes and as a hands-on study of backend architecture in Python.

## Features

- User authentication via JWT (login with email and password)
- Full CRUD for Users, Categories, and Products
- Stock movement tracking (in/out), with available-balance validation
- Reports: dashboard with overall totals and a list of products below minimum stock

## Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy (ORM)
- Alembic (migrations)
- Pydantic (data validation)
- PyJWT + Passlib/bcrypt (authentication)
- Docker and Docker Compose

## Architecture

The project follows a layered separation:
Route → Service → Repository → Model

- **`routes/`** — HTTP layer: receives requests, validates input via `schemas`, returns responses.
- **`services/`** — business rules (e.g. no duplicate emails, no stock-out larger than what's available).
- **`repositories/`** — database access via SQLAlchemy.
- **`models/`** — table definitions (SQLAlchemy ORM).
- **`schemas/`** — input/output validation and formatting (Pydantic).
## Running the project
### Option 1 — Docker (recommended)
Requirements: Docker and Docker Compose.
```bash
docker compose up -d --build
The API will be available at http://localhost:8000/docs.

Option 2 — Local environment
Requirements: Python 3.13+, a running PostgreSQL instance.

python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
Copy .env.example to .env and adjust the values, then run the migrations:

alembic upgrade head
uvicorn app.main:app --reload
Main Endpoints
Method	Route	Description	Auth Required
POST	/users/	Create a user	No
GET	/users/	List users	Yes
DELETE	/users/{id}	Delete a user	Yes
POST	/auth/login	Login (returns a JWT token)	No
POST	/categories/	Create a category	Yes
GET	/categories/	List categories	Yes
PUT	/categories/{id}	Update a category	Yes
DELETE	/categories/{id}	Delete a category	Yes
POST	/products/	Create a product	Yes
GET	/products/	List products	Yes
PUT	/products/{id}	Update a product	Yes
DELETE	/products/{id}	Delete a product	Yes
POST	/stock-movements/	Register a stock movement (in/out)	Yes
GET	/reports/dashboard	Overall totals (products, categories, stock value)	Yes
GET	/reports/low-stock	Products below minimum stock	Yes
Full interactive documentation available at /docs (Swagger).

Folder Structure
app/
├── api/routers/     # auxiliary routes (health check)
├── auth/            # authentication dependency (get_current_user)
├── core/            # configuration, app factory, security (hashing/JWT)
├── database/        # database connection and session
├── models/          # SQLAlchemy models
├── repositories/     # data access
├── routes/          # HTTP routes
├── schemas/         # Pydantic schemas
└── services/        # business rules
alembic/             # migrations