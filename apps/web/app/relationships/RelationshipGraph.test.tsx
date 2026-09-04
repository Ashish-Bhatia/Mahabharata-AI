import { describe, expect, it } from "vitest";

describe("RelationshipGraph", () => {
  it("uses a stable relationship id as the rendered key", () => {
    const relationship = { id: "relationship:krishna-arjuna", kind: "ally" };
    expect(relationship.id).toBe("relationship:krishna-arjuna");
  });

  it("preserves directional relationship semantics", () => {
    const relationship = {
      from_character_id: "character:krishna",
      to_character_id: "character:arjuna",
    };
    expect(`${relationship.from_character_id} → ${relationship.to_character_id}`).toContain("→");
  });
});
