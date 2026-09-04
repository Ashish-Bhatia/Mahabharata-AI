import { describe, expect, it } from "vitest";
import type { ChronologyStatus } from "./status";

describe("chronology status", () => {
  it("supports the four primary UI states", () => {
    const states: ChronologyStatus[] = ["loading", "error", "empty", "ready"];
    expect(states).toHaveLength(4);
  });
});
