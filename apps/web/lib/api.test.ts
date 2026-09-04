import { describe, expect, it, vi } from "vitest";
import { searchCharacters } from "./api";

describe("searchCharacters", () => {
  it("requests multilingual character search from the API", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([{ id: "character:krishna", names: [], description: [], source_refs: [] }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(searchCharacters("कृष्ण")).resolves.toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/characters?q=%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%A3",
      { cache: "no-store" },
    );

    fetchMock.mockRestore();
  });

  it("raises an error for failed API responses", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 503 }));

    await expect(searchCharacters("Krishna")).rejects.toThrow("Character search failed: 503");
    fetchMock.mockRestore();
  });
});
