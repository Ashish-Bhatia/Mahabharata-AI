import { describe, expect, it } from "vitest";
import { chronologyFeature } from "./manifest";

describe("chronology feature", () => {
  it("points to the canonical event API", () => expect(chronologyFeature.api).toBe("/events"));
});
