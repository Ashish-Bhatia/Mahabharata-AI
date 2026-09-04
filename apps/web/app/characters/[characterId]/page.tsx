import { notFound } from "next/navigation";

import { getCharacter } from "../../../lib/api";

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
  const relationships = character.relationships ?? [];

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
