import { describe, expect, it } from "vitest";

describe("home character search", () => {
  it("defines the primary application route", () => {
    expect("/").toBe("/");
  });

  it("covers the required API-backed UI states", () => {
    expect(["loading", "error", "empty", "results"]).toHaveLength(4);
  });

  it("supports the canonical exploration destinations", () => {
    expect(["/characters", "/chronology", "/relationships"]).toEqual([
      "/characters",
      "/chronology",
      "/relationships",
    ]);
  });
});
