import { chronologyEndpoint } from "./api";
import { expect, it } from "vitest";
it("builds the event endpoint without duplicate slashes", () => expect(chronologyEndpoint("http://localhost:8000/")).toBe("http://localhost:8000/events"));
