import { uiStateOrder } from "./ui";
import { expect, it } from "vitest";
it("orders primary UI states", () => expect(uiStateOrder).toEqual(["loading", "error", "empty", "ready"]));
