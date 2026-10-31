// لایه دسترسی دیتابیس — فقط سمت سرور. سایت فقط با PostgreSQL کار می‌کند: رشته اتصال از
// DATABASE_URL خوانده می‌شود (مثلاً کانتینر PostgreSQL روی Coolify) و اتصال در اولین کوئری برقرار
// می‌شود. اگر DATABASE_URL تنظیم نشده باشد، هر کوئری خطای روشنی در error برمی‌گرداند.
import type { DbTables } from "./db-types";
import { createPgDb, type PgDb } from "./pg-db.server";

export type Db = PgDb<DbTables>;

export const db: Db = createPgDb<DbTables>();

/** شناسه یکتای ۳۶ کاراکتری (سازگار با varchar(36) در MySQL) */
export function newId(): string {
  return crypto.randomUUID();
}

/** زمان جاری به فرمت ISO بدون منطقه‌زمانی خاص */
export function nowIso(): string {
  return new Date().toISOString();
}

/** تبدیل مقدار عددی/بولی دیتابیس (smallint) به بولی */
export function toBool(value: unknown): boolean {
  return value === 1 || value === true || value === "1";
}

/** تبدیل بولی به smallint برای ذخیره */
export function fromBool(value: unknown): number {
  return value ? 1 : 0;
}

/** برچسب‌ها به صورت CSV در دیتابیس ذخیره می‌شوند (بدون آرایه postgres) */
export function parseCsv(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toCsv(items?: string[] | null): string {
  if (!items || items.length === 0) return "";
  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .join(",");
}

/** JSON امن (ستون‌های text به‌جای jsonb) */
export function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** ساخت اسلاگ سازگار با فارسی */
export function slugify(input: string): string {
  const base = (input || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_/\\.,:;!?"'`(){}\[\]]+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base.slice(0, 80) || crypto.randomUUID().slice(0, 8);
}
