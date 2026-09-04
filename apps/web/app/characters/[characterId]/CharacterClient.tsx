"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Name = { language: string; text: string };
type Character = { id: string; names: Name[]; description: Name[]; source_refs: string[] };
type Relationship = { id: string; kind: string; from_character_id: string; to_character_id: string; source_refs: string[] };

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function CharacterClient({ characterId }: { characterId: string }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const id = decodeURIComponent(characterId);
    const controller = new AbortController();
    Promise.all([
      fetch(`${apiBase}/characters/${encodeURIComponent(id)}`, { signal: controller.signal }),
      fetch(`${apiBase}/relationships?character_id=${encodeURIComponent(id)}`, { signal: controller.signal }),
    ])
      .then(async ([characterResponse, relationshipResponse]) => {
        if (!characterResponse.ok || !relationshipResponse.ok) throw new Error("load failed");
        return [await characterResponse.json() as Character, await relationshipResponse.json() as Relationship[]] as const;
      })
      .then(([loadedCharacter, loadedRelationships]) => {
        setCharacter(loadedCharacter);
        setRelationships(loadedRelationships);
      })
      .catch((reason: unknown) => {
        if ((reason as { name?: string }).name !== "AbortError") setError(true);
      });
    return () => controller.abort();
  }, [characterId]);

  if (error) return <main style={{ maxWidth: 760, margin: "48px auto", padding: 24 }}><p role="alert">Unable to load this character.</p><Link href="/characters">Back to characters</Link></main>;
  if (!character) return <main style={{ maxWidth: 760, margin: "48px auto", padding: 24 }}><p role="status">Loading character...</p></main>;

  const title = character.names.find((name) => name.language === "en")?.text ?? character.names[0]?.text ?? character.id;
  return (
    <main style={{ maxWidth: 760, margin: "48px auto", padding: 24 }}>
      <p><Link href="/characters">Back to characters</Link></p>
      <h1>{title}</h1>
      <p>{character.description.find((item) => item.language === "en")?.text}</p>
      <p><strong>Names:</strong> {character.names.map((name) => name.text).join(" · ")}</p>
      <h2>Relationships</h2>
      {relationships.length === 0 ? <p>No relationships recorded.</p> : relationships.map((relationship) => (
        <article key={relationship.id} style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8 }}>
          <strong>{relationship.kind}</strong>
          <p>{relationship.from_character_id} → {relationship.to_character_id}</p>
          <p><strong>Source:</strong> {relationship.source_refs.join(", ")}</p>
        </article>
      ))}
      <h2>Provenance</h2>
      <p>{character.source_refs.join(", ")}</p>
    </main>
  );
}
