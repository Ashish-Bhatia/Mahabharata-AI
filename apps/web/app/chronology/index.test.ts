import { chronologyTitle } from "./index";
import { describe, expect, it } from "vitest";

describe("chronology metadata", () => {
  it("has a product-facing title", () => expect(chronologyTitle).toBe("Mahabharata chronology"));
});
