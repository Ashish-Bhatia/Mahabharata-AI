"use client";

import type { CSSProperties } from "react";

type Relationship = {
  id: string;
  kind: string;
  names: { language: string; text: string }[];
  from_character_id: string;
  to_character_id: string;
};

function label(item: Relationship) {
  return item.names.find((name) => name.language === "en")?.text ?? item.id;
}

export function RelationshipGraph({ items }: { items: Relationship[] }) {
  return (
    <section aria-label="Relationship graph" style={{ display: "grid", gap: 12 }}>
      {items.map((item) => {
        const card: CSSProperties = { border: "1px solid currentColor", borderRadius: 8, padding: 12 };
        return (
          <article key={item.id} style={card}>
            <strong>{label(item)}</strong>
            <p>{item.from_character_id} → {item.to_character_id}</p>
            <small>{item.kind}</small>
          </article>
        );
      })}
    </section>
  );
}
