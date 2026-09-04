"use client";

import { useEffect, useMemo, useState } from "react";

type Name = { language: string; text: string };
type Event = {
  id: string;
  sequence: number;
  names: Name[];
  description: string;
  character_ids: string[];
  source_refs: string[];
};

type Character = {
  id: string;
  names: Name[];
  description: Name[];
  source_refs: string[];
};

const characters: Character[] = [
  { id: "character:krishna", names: [{ language: "sa", text: "कृष्ण" }, { language: "hi", text: "कृष्ण" }, { language: "en", text: "Krishna" }], description: [{ language: "en", text: "A central figure in the Mahabharata and an ally and guide of the Pandavas." }], source_refs: ["source:mahabharata-primary"] },
  { id: "character:arjuna", names: [{ language: "sa", text: "अर्जुन" }, { language: "hi", text: "अर्जुन" }, { language: "en", text: "Arjuna" }], description: [{ language: "en", text: "One of the Pandava brothers and a principal warrior in the Mahabharata." }], source_refs: ["source:mahabharata-primary"] },
];

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

function label(event: Event) {
  return event.names.find((name) => name.language === "en")?.text ?? event.names[0]?.text ?? event.id;
}

export default function Home() {
  const [characterQuery, setCharacterQuery] = useState("");
  const [eventQuery, setEventQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/events`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load events");
        return response.json() as Promise<Event[]>;
      })
      .then(setEvents)
      .catch((reason: unknown) => {
        if ((reason as { name?: string }).name !== "AbortError") setError("Unable to load the event chronology.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const charactersResults = useMemo(() => {
    const needle = characterQuery.trim().toLocaleLowerCase();
    if (!needle) return characters;
    return characters.filter((character) => character.names.some((name) => name.text.toLocaleLowerCase().includes(needle)));
  }, [characterQuery]);

  const eventResults = useMemo(() => {
    const needle = eventQuery.trim().toLocaleLowerCase();
    if (!needle) return events;
    return events.filter((event) => event.names.some((name) => name.text.toLocaleLowerCase().includes(needle)));
  }, [eventQuery, events]);

  return (
    <main style={{ maxWidth: 900, margin: "48px auto", padding: 24 }}>
      <h1>Mahabharata AI</h1>
      <p>Explore canonical characters and a sourced chronology of major events.</p>

      <section aria-labelledby="characters-heading">
        <h2 id="characters-heading">Characters</h2>
        <label htmlFor="character-search">Character search</label>
        <input id="character-search" value={characterQuery} onChange={(event) => setCharacterQuery(event.target.value)} placeholder="Krishna or कृष्ण" style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 24px" }} />
        {charactersResults.map((character) => <article key={character.id} style={{ border: "1px solid #ccc", padding: 16, marginBottom: 12 }}><h3>{character.names.find((name) => name.language === "en")?.text}</h3><p>{character.description.find((item) => item.language === "en")?.text}</p><p><strong>Names:</strong> {character.names.map((name) => name.text).join(" · ")}</p><p><strong>Source:</strong> {character.source_refs.join(", ")}</p></article>)}
        {charactersResults.length === 0 && <p>No matching character found.</p>}
      </section>

      <section aria-labelledby="chronology-heading" style={{ marginTop: 48 }}>
        <h2 id="chronology-heading">Event chronology</h2>
        <label htmlFor="event-search">Event search</label>
        <input id="event-search" value={eventQuery} onChange={(event) => setEventQuery(event.target.value)} placeholder="Kurukshetra or कुरुक्षेत्र" style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 24px" }} />
        {loading && <p role="status">Loading chronology...</p>}
        {!loading && error && <p role="alert">{error}</p>}
        {!loading && !error && eventResults.map((event) => <article key={event.id} style={{ borderLeft: "4px solid currentColor", padding: "8px 16px", marginBottom: 20 }}><p><strong>Event {event.sequence}</strong></p><h3>{label(event)}</h3><p>{event.description}</p><p><strong>Participants:</strong> {event.character_ids.join(", ")}</p><p><strong>Source:</strong> {event.source_refs.join(", ")}</p></article>)}
        {!loading && !error && eventResults.length === 0 && <p>No matching event found.</p>}
      </section>
    </main>
  );
}
