import { frontendSlice } from "./frontend";
import { expect, it } from "vitest";
it("identifies the frontend slice", () => expect(frontendSlice).toBe("event-chronology"));
