R = 8.31  # const. demo


def calcular_presion(volumen: float, temperatura_c: float) -> float:
    if volumen <= 0:
        raise ValueError("Volumen debe ser > 0")
    if temperatura_c < -273.15:
        raise ValueError("Temperatura por debajo de cero absoluto")
    return (R * (temperatura_c + 273.15)) / volumen

