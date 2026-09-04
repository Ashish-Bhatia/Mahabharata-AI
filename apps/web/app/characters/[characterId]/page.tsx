import CharacterClient from "./CharacterClient";

const staticCharacterIds = ["arjuna", "krishna"];

type CharacterPageProps = { params: Promise<{ characterId: string }> };

export function generateStaticParams() {
  return staticCharacterIds.map((characterId) => ({ characterId }));
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { characterId } = await params;
  return <CharacterClient characterId={characterId} />;
}
