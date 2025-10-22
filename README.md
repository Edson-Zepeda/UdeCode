HackMTY 2025 – Monorepo Template

Monorepo para prototipar rápido en hackathon con:
- Backend: FastAPI + SQLAlchemy + SQLite (local) y Postgres (opcional)
- Frontend: React + Vite (TypeScript)
- Notebooks/prototipos Python (Itzel), empaquetados como servicios expuestos por FastAPI
- Tests rápidos con Pytest

Requisitos
- Python 3.11+
- Node 18+
- (Opcional) Make, Docker, GUI para SQL (TablePlus/Beekeeper/DBeaver)

Estructura
- backend: API FastAPI, ORM, servicios y tests
- frontend: Vite React TS; integra con API por `VITE_API_URL`
- design: tokens y assets
- docs: notas de analytics y export de OpenAPI

Quickstart (dev)
1) Backend
   - Crear venv e instalar deps:
     - Windows (PowerShell): `python -m venv .venv; . .venv/Scripts/Activate.ps1; pip install -r backend/requirements.txt`
     - macOS/Linux: `python3 -m venv .venv && source .venv/bin/activate && pip install -r backend/requirements.txt`
   - Copiar `.env.example` a `.env` y ajustar `DB_URL` si hace falta.
   - Ejecutar API: `uvicorn backend.main:app --reload --port 8000`
   - Docs: abrir `http://localhost:8000/docs`

2) Frontend
   - Ir a `frontend/`, copiar `.env.example` a `.env` (o setear `VITE_API_URL`):
     - `VITE_API_URL=http://localhost:8000`
   - Instalar deps: `npm i`
   - Correr dev server: `npm run dev` (abre en `http://localhost:5173`)

3) Tests backend
   - `pytest -q`

Exportar OpenAPI
- Con la API corriendo: `curl http://localhost:8000/openapi.json -o docs/openapi.json`

Notas
- CORS está habilitado para `http://localhost:5173` por defecto.
- Cambiar a Postgres seteando `DB_URL` (ver `.env.example`).

