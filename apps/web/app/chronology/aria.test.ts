import { describe, expect, it } from "vitest";
import { chronologyLabel } from "./aria";

describe("chronology accessibility", () => {
  it("provides a descriptive label", () => expect(chronologyLabel).toBe("Event chronology"));
});
