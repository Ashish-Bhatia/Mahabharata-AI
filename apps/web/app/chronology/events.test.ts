import { describe, expect, it } from "vitest";
import { eventDetailPath } from "./events";

describe("event detail navigation", () => {
  it("encodes canonical event ids", () => expect(eventDetailPath("event:kurukshetra-war")).toBe("/chronology/event%3Akurukshetra-war"));
});
