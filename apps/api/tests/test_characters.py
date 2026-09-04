from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_search_character_by_english_name() -> None:
    response = client.get("/characters", params={"q": "Krishna"})
    assert response.status_code == 200
    assert response.json()[0]["id"] == "character:krishna"


def test_search_character_by_devanagari_name() -> None:
    response = client.get("/characters", params={"q": "अर्जुन"})
    assert response.status_code == 200
    assert response.json()[0]["id"] == "character:arjuna"


def test_get_character() -> None:
    response = client.get("/characters/character:krishna")
    assert response.status_code == 200
    assert response.json()["source_refs"] == ["source:mahabharata-primary"]


def test_missing_character() -> None:
    response = client.get("/characters/character:unknown")
    assert response.status_code == 404
