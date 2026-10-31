# دیتابیس PostgreSQL سلف‌هاست روی Coolify

سایت فقط با PostgreSQL کار می‌کند. رشتهٔ اتصال از متغیر محیطی `DATABASE_URL` خوانده می‌شود و
لایهٔ `src/lib/pg-db.server.ts` با درایور `pg` مستقیم به دیتابیس وصل می‌شود (کد سایت از طریق
`db` در `src/lib/db.server.ts` به آن دسترسی دارد؛ نوع جدول‌ها در `src/lib/db-types.ts` است).

اگر `DATABASE_URL` تنظیم نشده باشد، هر کوئری خطای «DATABASE_URL تنظیم نشده است» برمی‌گرداند:
صفحات عمومی با تنظیمات پیش‌فرض بالا می‌آیند، ورود به پنل ممکن نیست و `GET /api/public/health`
وضعیت 503 برمی‌گرداند.

---

## ۱) ساخت کانتینر PostgreSQL در Coolify

**روش پیشنهادی (دیتابیس مدیریت‌شده خود Coolify):**

1. Coolify ← پروژه سایت ← **New Resource ← Databases ← PostgreSQL**، نسخه **17**.
2. نام دیتابیس `webyar`، کاربر `webyar` و یک رمز قوی تعیین کنید.
3. **Make it publicly available** را خاموش بگذارید (اپ از شبکه داخلی وصل می‌شود).
4. Start بزنید و از صفحهٔ همان دیتابیس **Postgres URL (internal)** را کپی کنید؛ چیزی شبیه
   `postgresql://webyar:PASS@<uuid>:5432/webyar`.
5. در همان صفحه بخش **Backups** را هم می‌توانید فعال کنید (بک‌آپ سطح سرور با `pg_dump`، مکمل
   بک‌آپ داخل پنل ادمین).

**روش جایگزین (Docker Compose):** فایل `docker/postgres/docker-compose.yml` را در
**New Resource ← Docker Compose (Empty)** بگذارید، `POSTGRES_PASSWORD` را تعریف و Deploy کنید.
آدرس داخلی: `postgresql://webyar:PASS@webyar-db:5432/webyar`.

> اپ و دیتابیس باید در یک شبکهٔ Docker باشند (در Coolify: هر دو در یک Project/Environment، یا
> گزینهٔ «Connect to Predefined Network»).

## ۲) وصل کردن سایت به دیتابیس

1. Coolify ← اپ سایت ← **Environment Variables**:
   `DATABASE_URL=postgresql://webyar:PASS@<db-host>:5432/webyar`
   (برای سرور بیرونی با SSL، `?sslmode=require` را به انتهای آدرس اضافه کنید.)
2. **Redeploy**. هنگام بالا آمدن، `db/schema.sql` به‌صورت idempotent اجرا می‌شود (روی دیتابیس
   خالی همهٔ جدول‌ها ساخته می‌شوند و جدول‌های جدید مثل `backup_runs` به دیتابیس موجود اضافه
   می‌شوند؛ هیچ داده‌ای حذف نمی‌شود). با `DATABASE_AUTO_MIGRATE=false` این مرحله غیرفعال می‌شود.
3. `GET /api/public/health` باید `"database": "ok"` برگرداند.

## ۳) انتقال داده به یک دیتابیس دیگر

- **از پنل ادمین ← پشتیبان‌گیری ← انتقال دیتابیس به دیتابیس**: رشتهٔ اتصال PostgreSQL مقصد را
  وارد کنید؛ ساختار جدول‌ها و همهٔ داده‌ها با یک کلیک منتقل و تعداد ردیف‌ها مقایسه می‌شود.
- **دستی با ابزارهای PostgreSQL:**

  ```sh
  pg_dump --no-owner --no-privileges "$SOURCE_DATABASE_URL" | psql "$TARGET_DATABASE_URL" -v ON_ERROR_STOP=1
  ```

## ۴) بک‌آپ دستی و روزانه (پنل ادمین ← پشتیبان‌گیری)

- **گرفتن بک‌آپ الان**: کل دیتابیس با `pg_dump` به یک فایل `sql.gz` تبدیل و روی همان فضای
  ذخیره‌سازی‌ای که در **تنظیمات عمومی ← ذخیره‌سازی رسانه** وصل است (بانی سی‌دی‌ان یا ابر آروان)
  آپلود می‌شود. اگر `pg_dump` روی سرور نباشد، فایل `json.gz` ساخته می‌شود (ایمیج Nixpacks
  ابزارهای `postgresql_17` را نصب می‌کند).
- **بک‌آپ خودکار روزانه**: روشن/خاموش، ساعت اجرا به وقت تهران، مدت نگه‌داری (روز) و حداقل تعداد
  نسخه‌ای که همیشه نگه داشته می‌شود. زمان‌بند داخلی سرور هر ۵ دقیقه بررسی می‌کند و اگر سرور سر
  ساعت خاموش بوده، همان روز جبران می‌کند.
- **تاریخچه**: دانلود، بازیابی با یک کلیک (بعد از بررسی checksum فایل) و حذف هر نسخه.
- امنیت: فایل‌ها با نام تصادفی و بدون ACL عمومی آپلود می‌شوند و دانلود فقط از طریق API ذخیره‌سازی
  با کلید سمت سرور انجام می‌شود. روی بانی، Storage Zone به‌صورت پیش‌فرض از طریق Pull Zone عمومی
  است؛ اگر می‌خواهید پوشهٔ `backups/` اصلاً از سی‌دی‌ان در دسترس نباشد، در Pull Zone یک Edge Rule
  برای مسدود کردن `*/backups/*` بگذارید.
- بازیابی دستی فایل `sql.gz` بیرون از پنل:
  `gunzip -c file.sql.gz | psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction`.
  فایل `json.gz` بعد از unzip (`gunzip`) از بخش «بازیابی از فایل JSON» پنل قابل بازیابی است.

## تست

```sh
TEST_DATABASE_URL=postgres://postgres@localhost:5432/webyar_test npx vitest run src/lib/pg-db.server.test.ts
```
