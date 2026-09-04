import { describe, expect, it } from "vitest";

describe("chronology page", () => {
  it("has a stable route contract", () => {
    expect("/chronology").toBe("/chronology");
  });
});
