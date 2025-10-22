from backend.services.analytics import calcular_presion
import pytest


def test_ok():
    assert calcular_presion(10, 25) > 0


def test_error_volumen():
    with pytest.raises(ValueError):
        calcular_presion(0, 25)


def test_error_temp():
    with pytest.raises(ValueError):
        calcular_presion(10, -300)

