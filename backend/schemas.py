from pydantic import BaseModel, Field, confloat


class ComputeIn(BaseModel):
    volumen: confloat(gt=0) = Field(..., description="m³ > 0")
    temperatura: float = Field(..., description="°C (>-273.15)")


class ComputeOut(BaseModel):
    resultado: float
    unidad: str = "Pa"


class ResultOut(BaseModel):
    id: int
    label: str
    value: float
    unit: str

    class Config:
        from_attributes = True

