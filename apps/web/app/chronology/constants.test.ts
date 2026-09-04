import { describe, expect, it } from "vitest";
import { chronologyApiPath } from "./constants";

describe("chronology API", () => {
  it("uses the canonical events endpoint", () => expect(chronologyApiPath).toBe("/events"));
});
