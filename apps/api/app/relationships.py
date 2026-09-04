import json
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException, Query

router = APIRouter(prefix="/relationships", tags=["relationships"])
FIXTURE = Path(__file__).resolve().parents[3] / "data" / "fixtures" / "relationships.json"


def load_relationships() -> list[dict[str, Any]]:
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


@router.get("")
def list_relationships(
    character_id: str | None = Query(default=None),
    kind: str | None = Query(default=None),
) -> list[dict[str, Any]]:
    items = load_relationships()
    if character_id:
        items = [item for item in items if character_id in (item["from_character_id"], item["to_character_id"])]
    if kind:
        items = [item for item in items if item["kind"] == kind]
    return sorted(items, key=lambda item: item["id"])


@router.get("/{relationship_id:path}")
def get_relationship(relationship_id: str) -> dict[str, Any]:
    for item in load_relationships():
        if item["id"] == relationship_id:
            return item
    raise HTTPException(status_code=404, detail="Relationship not found")
