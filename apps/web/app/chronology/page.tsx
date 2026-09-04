"use client";

import { useEffect, useMemo, useState } from "react";

type Name = { language: string; text: string };
type Event = { id: string; sequence: number; names: Name[]; description: string; character_ids: string[]; source_refs: string[] };

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function ChronologyPage() {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/events`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("load failed"); return response.json() as Promise<Event[]>; })
      .then(setEvents)
      .catch((reason: unknown) => { if ((reason as { name?: string }).name !== "AbortError") setError(true); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return events;
    return events.filter((event) => event.names.some((name) => name.text.toLocaleLowerCase().includes(needle)));
  }, [events, query]);

  return (
    <main style={{ maxWidth: 760, margin: "48px auto", padding: 24 }}>
      <h1>Mahabharata chronology</h1>
      <p>Explore sourced events in canonical chronological order.</p>
      <label htmlFor="event-search">Search events</label>
      <input id="event-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Kurukshetra or कुरुक्षेत्र" style={{ display: "block", width: "100%", padding: 12, margin: "8px 0 24px" }} />
      {loading && <p role="status">Loading chronology...</p>}
      {error && <p role="alert">Unable to load the event chronology.</p>}
      {!loading && !error && filtered.map((event) => <article key={event.id} style={{ borderLeft: "4px solid currentColor", padding: "8px 16px", marginBottom: 20 }}><p><strong>{event.sequence}</strong></p><h2>{event.names.find((name) => name.language === "en")?.text ?? event.names[0]?.text}</h2><p>{event.description}</p><p><strong>Participants:</strong> {event.character_ids.join(", ")}</p><p><strong>Source:</strong> {event.source_refs.join(", ")}</p></article>)}
      {!loading && !error && filtered.length === 0 && <p>No matching event found.</p>}
    </main>
  );
}
