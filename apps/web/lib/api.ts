export type Name = { language: string; text: string };

export type Character = {
  id: string;
  names: Name[];
  description: Name[];
  source_refs: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function searchCharacters(query: string): Promise<Character[]> {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());

  const response = await fetch(`${API_BASE_URL}/characters?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Character search failed: ${response.status}`);
  }

  return response.json();
}
