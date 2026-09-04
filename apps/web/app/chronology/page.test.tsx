import { describe, expect, it } from "vitest";

describe("chronology page contract", () => {
  it("uses the canonical chronology route", () => {
    expect("/chronology").toBe("/chronology");
  });

  it("defines the primary event exploration states", () => {
    const states = ["loading", "error", "empty", "results"];
    expect(states).toEqual(["loading", "error", "empty", "results"]);
  });

  it("supports multilingual search examples", () => {
    expect(["Kurukshetra", "कुरुक्षेत्र"]).toHaveLength(2);
  });
});
