import json
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException, Query

router = APIRouter(prefix="/characters", tags=["characters"])

FIXTURE = Path(__file__).resolve().parents[3] / "data" / "fixtures" / "characters.json"


def load_characters() -> list[dict[str, Any]]:
    return json.loads(FIXTURE.read_text(encoding="utf-8"))


def matches(character: dict[str, Any], query: str) -> bool:
    needle = query.casefold().strip()
    return any(needle in name["text"].casefold() for name in character["names"])


@router.get("")
def search_characters(q: str = Query(default="", min_length=0)) -> list[dict[str, Any]]:
    characters = load_characters()
    if not q.strip():
        return characters
    return [character for character in characters if matches(character, q)]


@router.get("/{character_id:path}")
def get_character(character_id: str) -> dict[str, Any]:
    for character in load_characters():
        if character["id"] == character_id:
            return character
    raise HTTPException(status_code=404, detail="Character not found")
