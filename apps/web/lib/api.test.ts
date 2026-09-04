import { describe, expect, it, vi } from "vitest";
import { getCharacter, searchCharacters } from "./api";

describe("character API", () => {
  it("searches characters", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([{ id: "character:krishna", names: [], description: [], source_refs: [] }]), { status: 200 }),
    );
    await expect(searchCharacters("कृष्ण")).resolves.toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8000/characters?q=%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%A3", { cache: "no-store" });
    fetchMock.mockRestore();
  });

  it("returns a character profile", async () => {
    const character = { id: "character:krishna", names: [], description: [], relationships: [{ type: "ally", target_id: "character:arjuna" }], source_refs: ["source:mahabharata-primary"] };
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify(character), { status: 200 }));
    await expect(getCharacter("character:krishna")).resolves.toEqual(character);
    fetchMock.mockRestore();
  });

  it("maps a missing profile to null", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 404 }));
    await expect(getCharacter("character:unknown")).resolves.toBeNull();
    fetchMock.mockRestore();
  });
});
