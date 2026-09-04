"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Name = { language: string; text: string };
type Character = { id: string; names: Name[]; description: Name[]; source_refs: string[] };

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${apiBase}/characters`)
      .then((response) => {
        if (!response.ok) throw new Error("load failed");
        return response.json() as Promise<Character[]>;
      })
      .then(setCharacters)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ maxWidth: 760, margin: "48px auto", padding: 24 }}>
      <h1>Characters</h1>
      <p>Browse canonical characters and their sourced relationships.</p>
      {loading && <p role="status">Loading characters...</p>}
      {error && <p role="alert">Unable to load the character catalogue.</p>}
      {!loading && !error && characters.map((character) => (
        <article key={character.id} style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}>
          <h2><Link href={`/characters/${encodeURIComponent(character.id)}`}>
            {character.names.find((name) => name.language === "en")?.text ?? character.names[0]?.text ?? character.id}
          </Link></h2>
          <p>{character.description.find((item) => item.language === "en")?.text}</p>
        </article>
      ))}
    </main>
  );
}
