import { chronologyVersion } from "./version";
import { expect, it } from "vitest";
it("versions chronology", () => expect(chronologyVersion).toBe("0.1.0"));
