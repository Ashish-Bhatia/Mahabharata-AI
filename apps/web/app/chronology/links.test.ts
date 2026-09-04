import { describe, expect, it } from "vitest";
import { chronologyLinkLabel } from "./links";

describe("chronology navigation", () => {
  it("has an explicit action label", () => expect(chronologyLinkLabel).toBe("Explore chronology"));
});
