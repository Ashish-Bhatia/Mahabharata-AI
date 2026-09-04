"use client";

import { useEffect, useState } from "react";
import { RelationshipGraph } from "./RelationshipGraph";

type Relationship = {
  id: string;
  kind: string;
  names: { language: string; text: string }[];
  from_character_id: string;
  to_character_id: string;
  source_refs: string[];
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function RelationshipsPage() {
  const [items, setItems] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/relationships`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("load failed");
        return response.json() as Promise<Relationship[]>;
      })
      .then(setItems)
      .catch((reason: unknown) => {
        if ((reason as { name?: string }).name !== "AbortError") setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "48px auto", padding: 24 }}>
      <h1>Mahabharata relationships</h1>
      <p>Explore sourced relationships between characters.</p>
      {loading && <p role="status">Loading relationships...</p>}
      {error && <p role="alert">Unable to load relationships.</p>}
      {!loading && !error && items.length > 0 && <RelationshipGraph items={items} />}
      {!loading && !error && items.length === 0 && <p role="status">No relationships found.</p>}
    </main>
  );
}
