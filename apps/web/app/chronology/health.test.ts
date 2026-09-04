import { chronologyHealth } from "./health";
import { expect, it } from "vitest";
it("reports chronology health", () => expect(chronologyHealth).toBe("ready"));
