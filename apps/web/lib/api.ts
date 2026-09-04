export type Name = { language: string; text: string };

export type Relationship = {
  type: string;
  target_id: string;
};

export type Character = {
  id: string;
  names: Name[];
  description: Name[];
  relationships?: Relationship[];
  source_refs: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  return response.json();
}

export function searchCharacters(query: string): Promise<Character[]> {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  return request<Character[]>(`/characters?${params.toString()}`);
}

export async function getCharacter(characterId: string): Promise<Character | null> {
  const response = await fetch(`${API_BASE_URL}/characters/${encodeURIComponent(characterId)}`, {
    cache: "no-store",
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Character profile failed: ${response.status}`);
  return response.json();
}
