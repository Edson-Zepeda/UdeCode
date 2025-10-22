import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db import Base, engine, SessionLocal
from .models import Result
from .schemas import ComputeIn, ComputeOut, ResultOut
from .services.analytics import calcular_presion

app = FastAPI(title="HackMTY SQL API", version="0.1.0")
Base.metadata.create_all(bind=engine)

# CORS para dev frontend
origins = [
    os.getenv("FRONTEND_ORIGIN", "http://localhost:5173"),
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/compute", response_model=ComputeOut)
def compute(body: ComputeIn, db: Session = Depends(get_db)):
    try:
        p = calcular_presion(body.volumen, body.temperatura)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    # persistimos para demo / métricas
    row = Result(label="presion", value=p, unit="Pa")
    db.add(row)
    db.commit()
    return ComputeOut(resultado=p, unidad="Pa")


@app.get("/results", response_model=list[ResultOut])
def results(db: Session = Depends(get_db)):
    return db.query(Result).order_by(Result.id.desc()).limit(25).all()

