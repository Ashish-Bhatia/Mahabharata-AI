"use client";

import { useEffect, useState } from "react";
import { Character, searchCharacters } from "../lib/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        setResults(await searchCharacters(query));
      } catch {
        setError("Unable to load characters. Check the API connection and try again.");
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

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
        aria-describedby="search-status"
        style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 24px" }}
      />
      <p id="search-status" aria-live="polite">
        {loading ? "Searching..." : `${results.length} character${results.length === 1 ? "" : "s"} found`}
      </p>
      {error && <p role="alert">{error}</p>}
      <section aria-label="Character results">
        {results.map((character) => (
          <article key={character.id} style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}>
            <h2>{character.names.find((name) => name.language === "en")?.text}</h2>
            <p>{character.description.find((item) => item.language === "en")?.text}</p>
            <p><strong>Names:</strong> {character.names.map((name) => name.text).join(" · ")}</p>
            <p><strong>Source:</strong> {character.source_refs.join(", ")}</p>
            <a href={`/characters/${encodeURIComponent(character.id)}`}>View profile</a>
          </article>
        ))}
        {!loading && !error && results.length === 0 && <p>No matching character found.</p>}
      </section>
    </main>
  );
}
