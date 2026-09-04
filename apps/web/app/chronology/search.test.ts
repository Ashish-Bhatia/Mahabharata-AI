import { describe, expect, it } from "vitest";
import { matchesEvent } from "./search";

describe("chronology search", () => {
  const event = { names: [{ text: "Kurukshetra War" }, { text: "कुरुक्षेत्र युद्ध" }] };
  it("trims and ignores case", () => expect(matchesEvent(event, "  KURUKSHETRA ")).toBe(true));
  it("supports Devanagari", () => expect(matchesEvent(event, "कुरुक्षेत्र")).toBe(true));
  it("returns false for an unknown term", () => expect(matchesEvent(event, "Hastinapura")).toBe(false));
});
