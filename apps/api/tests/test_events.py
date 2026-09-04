from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_events_are_returned_in_chronological_order() -> None:
    response = client.get("/events")
    assert response.status_code == 200
    assert [event["id"] for event in response.json()] == [
        "event:lakshagriha",
        "event:draupadi-swayamvara",
        "event:kurukshetra-war",
    ]


def test_event_search_is_case_insensitive_and_trimmed() -> None:
    response = client.get("/events", params={"q": "  KURUKSHETRA  "})
    assert response.status_code == 200
    assert [event["id"] for event in response.json()] == ["event:kurukshetra-war"]


def test_event_search_supports_devanagari() -> None:
    response = client.get("/events", params={"q": "द्रौपदी"})
    assert response.status_code == 200
    assert response.json()[0]["id"] == "event:draupadi-swayamvara"


def test_unknown_event_returns_404() -> None:
    response = client.get("/events/event:unknown")
    assert response.status_code == 404
    assert response.json()["detail"] == "Event not found"


def test_event_contains_participants_and_provenance() -> None:
    response = client.get("/events/event:kurukshetra-war")
    assert response.status_code == 200
    payload = response.json()
    assert "character:arjuna" in payload["character_ids"]
    assert payload["source_refs"] == ["source:mahabharata-primary"]
