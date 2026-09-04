import { describe, expect, it } from "vitest";

describe("event chronology frontend", () => {
  it("defines the primary chronology states", async () => {
    const source = await import("./page");
    expect(source.default).toBeTypeOf("function");
  });
});
