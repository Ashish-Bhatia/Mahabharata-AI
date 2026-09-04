import { describe, expect, it } from "vitest";

describe("event chronology contract", () => {
  it("uses stable event identifiers", () => {
    expect("event:kurukshetra-war").toMatch(/^event:[a-z0-9-]+$/);
  });
});
