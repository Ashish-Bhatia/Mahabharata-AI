import { describe, expect, it } from "vitest";

describe("chronology route", () => {
  it("reserves the dedicated chronology page", () => expect("/chronology").toContain("chronology"));
});
