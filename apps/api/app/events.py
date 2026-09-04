import json
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException, Query

router = APIRouter(prefix="/events", tags=["events"])

FIXTURE = Path(__file__).resolve().parents[3] / "data" / "fixtures" / "events.json"


def load_events() -> list[dict[str, Any]]:
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


@router.get("")
def list_events(q: str = Query(default="", min_length=0)) -> list[dict[str, Any]]:
    events = sorted(load_events(), key=lambda event: (event["sequence"], event["id"]))
    needle = q.casefold().strip()
    if not needle:
        return events
    return [
        event
        for event in events
        if any(needle in name["text"].casefold() for name in event["names"])
    ]


@router.get("/{event_id:path}")
def get_event(event_id: str) -> dict[str, Any]:
    for event in load_events():
        if event["id"] == event_id:
            return event
    raise HTTPException(status_code=404, detail="Event not found")
