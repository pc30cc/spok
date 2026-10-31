// @vitest-environment node
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import type { Selected } from "./pg-db.server";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("db (PostgreSQL only)", () => {
  it("returns a clear error instead of throwing when DATABASE_URL is missing", async () => {
    vi.stubEnv("DATABASE_URL", "");
    const { db } = await import("./db.server");
    const res = await db.from("settings").select("setting_key").limit(1);
    expect(res.data).toBeNull();
    expect(res.error?.message).toContain("DATABASE_URL");
  });

  it("types select() results from the table rows", () => {
    type Row = { id: string; name: string; sort_order: number };
    expectTypeOf<Selected<Row, "*">>().toEqualTypeOf<Row>();
    expectTypeOf<Selected<Row, "id, sort_order">>().toEqualTypeOf<{
      id: string;
      sort_order: number;
    }>();
    expectTypeOf<Selected<Row, "\n  id,\n  name\n">>().toEqualTypeOf<{
      id: string;
      name: string;
    }>();
  });
});
