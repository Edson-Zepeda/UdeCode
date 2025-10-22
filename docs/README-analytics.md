Analytics / Notas

- Servicio de ejemplo: `calcular_presion(volumen, temperatura)` que valida rangos y devuelve presión en Pascal.
- Endpoints expuestos:
  - `GET /health` – ping
  - `POST /compute` – calcula y persiste un resultado de demo
  - `GET /results` – últimos 25 resultados

Exportar OpenAPI (después de levantar el backend):

curl http://localhost:8000/openapi.json -o docs/openapi.json

Ideas para prototipos (Itzel):
- Empezar en notebooks (`.ipynb`) validando unidades/rangos.
- Extraer funciones validadas a `backend/services/*.py`.
- Exponer vía FastAPI en `backend/main.py`.

