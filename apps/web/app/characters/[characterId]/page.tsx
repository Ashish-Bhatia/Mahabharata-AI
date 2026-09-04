import { notFound } from "next/navigation";

import type { Character } from "../../../lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function getCharacter(characterId: string): Promise<Character | null> {
  const response = await fetch(`${API_BASE_URL}/characters/${encodeURIComponent(characterId)}`, {
    cache: "no-store",
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Character profile failed: ${response.status}`);
  return response.json();
}

export default async function CharacterProfile({
  params,
}: {
  params: Promise<{ characterId: string }>;
}) {
  const { characterId } = await params;
  const character = await getCharacter(characterId);
  if (!character) notFound();

  const englishName = character.names.find((name) => name.language === "en")?.text ?? character.id;
  const description = character.description.find((item) => item.language === "en")?.text;
  const relationships = (character as Character & { relationships?: { type: string; target_id: string }[] }).relationships ?? [];

  return (
    <main style={{ maxWidth: 760, margin: "48px auto", padding: 24 }}>
      <p><a href="/">Back to character search</a></p>
      <h1>{englishName}</h1>
      {description && <p>{description}</p>}
      <h2>Names</h2>
      <ul>{character.names.map((name) => <li key={`${name.language}-${name.text}`}>{name.text} ({name.language})</li>)}</ul>
      <h2>Relationships</h2>
      {relationships.length ? (
        <ul>{relationships.map((relationship) => <li key={`${relationship.type}-${relationship.target_id}`}>{relationship.type}: {relationship.target_id}</li>)}</ul>
      ) : <p>No relationships recorded.</p>}
      <h2>Provenance</h2>
      <ul>{character.source_refs.map((source) => <li key={source}>{source}</li>)}</ul>
    </main>
  );
}
