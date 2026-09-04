import { describe, expect, it } from "vitest";
import { sortChronology } from "./sort";

describe("chronology ordering", () => {
  it("orders by sequence then stable id", () => {
    expect(sortChronology([{ id: "b", sequence: 2 }, { id: "a", sequence: 1 }]).map((x) => x.id)).toEqual(["a", "b"]);
  });
});
