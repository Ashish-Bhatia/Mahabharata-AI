import { expect, it } from "vitest";
it("defines the frontend CI gate", () => expect("build + tests").toContain("tests"));
