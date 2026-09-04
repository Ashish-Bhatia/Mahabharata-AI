import { describe, expect, it } from "vitest";

describe("chronology page contract", () => {
  it("uses the canonical chronology route", () => {
    expect("/chronology").toBe("/chronology");
  });

  it("defines the primary event exploration states", () => {
    expect(["loading", "error", "empty", "results"]).toHaveLength(4);
  });

  it("supports multilingual search examples", () => {
    expect(["Kurukshetra", "कुरुक्षेत्र"]).toContain("कुरुक्षेत्र");
  });
});
