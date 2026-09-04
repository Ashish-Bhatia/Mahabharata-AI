from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_search_character_by_english_name() -> None:
    response = client.get("/characters", params={"q": "Krishna"})
    assert response.status_code == 200
    assert response.json()[0]["id"] == "character:krishna"


def test_search_character_is_case_insensitive_and_trims_whitespace() -> None:
    response = client.get("/characters", params={"q": "  kRiShNa  "})
    assert response.status_code == 200
    assert [item["id"] for item in response.json()] == ["character:krishna"]


def test_search_character_by_devanagari_name() -> None:
    response = client.get("/characters", params={"q": "अर्जुन"})
    assert response.status_code == 200
    assert response.json()[0]["id"] == "character:arjuna"


def test_search_character_by_partial_name() -> None:
    response = client.get("/characters", params={"q": "Krish"})
    assert response.status_code == 200
    assert [item["id"] for item in response.json()] == ["character:krishna"]


def test_search_without_query_returns_all_characters() -> None:
    response = client.get("/characters")
    assert response.status_code == 200
    assert [item["id"] for item in response.json()] == [
        "character:krishna",
        "character:arjuna",
    ]


def test_search_with_whitespace_only_returns_all_characters() -> None:
    response = client.get("/characters", params={"q": "   "})
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_search_with_no_match_returns_empty_list() -> None:
    response = client.get("/characters", params={"q": "Duryodhana"})
    assert response.status_code == 200
    assert response.json() == []


def test_get_character() -> None:
    response = client.get("/characters/character:krishna")
    assert response.status_code == 200
    assert response.json()["source_refs"] == ["source:mahabharata-primary"]


def test_missing_character() -> None:
    response = client.get("/characters/character:unknown")
    assert response.status_code == 404
    assert response.json()["detail"] == "Character not found"
