from fastapi import FastAPI

from app.characters import router as character_router

app = FastAPI(title="Mahabharata AI API", version="0.1.0")
app.include_router(character_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
