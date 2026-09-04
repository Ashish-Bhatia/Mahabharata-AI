"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Name = { language: string; text: string };
type Character = {
  id: string;
  names: Name[];
  description: Name[];
  source_refs: string[];
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

function title(character: Character) {
  return character.names.find((name) => name.language === "en")?.text ?? character.names[0]?.text ?? character.id;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/characters`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("load failed");
        return response.json() as Promise<Character[]>;
      })
      .then(setCharacters)
      .catch((reason: unknown) => {
        if ((reason as { name?: string }).name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return characters;
    return characters.filter((character) =>
      character.names.some((name) => name.text.toLocaleLowerCase().includes(needle)),
    );
  }, [characters, query]);

  return (
    <main style={{ maxWidth: 760, margin: "48px auto", padding: 24 }}>
      <h1>Mahabharata AI</h1>
      <p>Search canonical characters and inspect source provenance.</p>
      <label htmlFor="character-search">Character search</label>
      <input
        id="character-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Krishna or कृष्ण"
        style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 24px" }}
      />
      {loading && <p role="status">Loading characters...</p>}
      {error && <p role="alert">Unable to load the character catalogue.</p>}
      {!loading && !error && (
        <section aria-label="Character results">
          {results.map((character) => (
            <article key={character.id} style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}>
              <h2><Link href={`/characters/${encodeURIComponent(character.id)}`}>{title(character)}</Link></h2>
              <p>{character.description.find((item) => item.language === "en")?.text}</p>
              <p><strong>Names:</strong> {character.names.map((name) => name.text).join(" · ")}</p>
              <p><strong>Source:</strong> {character.source_refs.join(", ")}</p>
            </article>
          ))}
          {results.length === 0 && <p role="status">No matching character found.</p>}
        </section>
      )}
    </main>
  );
}
