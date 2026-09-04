from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_relationships_are_deterministically_ordered() -> None:
    response = client.get("/relationships")
    assert response.status_code == 200
    assert [item["id"] for item in response.json()] == [
        "relationship:arjuna-draupadi",
        "relationship:krishna-arjuna",
        "relationship:krishna-pandavas",
    ]


def test_relationships_filter_by_character() -> None:
    response = client.get("/relationships", params={"character_id": "character:arjuna"})
    assert response.status_code == 200
    assert {item["id"] for item in response.json()} == {
        "relationship:arjuna-draupadi",
        "relationship:krishna-arjuna",
    }


def test_relationships_filter_by_kind() -> None:
    response = client.get("/relationships", params={"kind": "spouse"})
    assert response.status_code == 200
    assert [item["id"] for item in response.json()] == ["relationship:arjuna-draupadi"]


def test_relationship_detail_contains_provenance() -> None:
    response = client.get("/relationships/relationship:krishna-arjuna")
    assert response.status_code == 200
    assert response.json()["source_refs"] == ["source:mahabharata-primary"]


def test_unknown_relationship_returns_404() -> None:
    response = client.get("/relationships/relationship:unknown")
    assert response.status_code == 404
    assert response.json()["detail"] == "Relationship not found"
