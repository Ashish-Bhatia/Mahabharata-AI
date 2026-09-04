"use client";

import { useMemo, useState } from "react";

type Name = { language: string; text: string };
type Character = {
  id: string;
  names: Name[];
  description: Name[];
  source_refs: string[];
};

const characters: Character[] = [
  {
    id: "character:krishna",
    names: [
      { language: "sa", text: "कृष्ण" },
      { language: "hi", text: "कृष्ण" },
      { language: "en", text: "Krishna" },
    ],
    description: [{ language: "en", text: "A central figure in the Mahabharata and an ally and guide of the Pandavas." }],
    source_refs: ["source:mahabharata-primary"],
  },
  {
    id: "character:arjuna",
    names: [
      { language: "sa", text: "अर्जुन" },
      { language: "hi", text: "अर्जुन" },
      { language: "en", text: "Arjuna" },
    ],
    description: [{ language: "en", text: "One of the Pandava brothers and a principal warrior in the Mahabharata." }],
    source_refs: ["source:mahabharata-primary"],
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return characters;
    return characters.filter((character) =>
      character.names.some((name) => name.text.toLocaleLowerCase().includes(needle)),
    );
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
        style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 24px" }}
      />
      <section aria-label="Character results">
        {results.map((character) => (
          <article key={character.id} style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}>
            <h2>{character.names.find((name) => name.language === "en")?.text}</h2>
            <p>{character.description.find((item) => item.language === "en")?.text}</p>
            <p><strong>Names:</strong> {character.names.map((name) => name.text).join(" · ")}</p>
            <p><strong>Source:</strong> {character.source_refs.join(", ")}</p>
          </article>
        ))}
        {results.length === 0 && <p>No matching character found.</p>}
      </section>
    </main>
  );
}
