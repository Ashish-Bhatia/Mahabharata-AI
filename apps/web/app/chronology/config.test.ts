import { chronologyConfig } from "./config";
import { expect, it } from "vitest";
it("configures chronology", () => expect(chronologyConfig.route).toBe("/chronology"));
