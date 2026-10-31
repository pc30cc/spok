// TypeScript shapes of the tables in db/schema.sql, used to type `db.from(...)` (see db.server.ts).
// Keep them in sync with db/schema.sql: Row is a full row as read from PostgreSQL (timestamps as
// ISO strings, bigint as number); columns listed as optional may be left out of an INSERT
// because they have a default or accept NULL.
import type { TableTypes } from "./pg-db.server";

export type AppDownloadClicksRow = {
  app_id: string;
  created_at: string;
  id: string;
  platform: string;
  referrer: string | null;
  user_agent: string | null;
};

export type AppsRow = {
  created_at: string;
  description: string;
  download_url: string;
  enabled: number;
  features_json: string;
  icon_url: string;
  id: string;
  min_os: string;
  name: string;
  platform: string;
  screenshots_json: string;
  short_desc: string;
  size: string;
  slug: string;
  sort_order: number;
  subtitle: string;
  updated_at: string;
  version: string;
};

export type AutoblogRunsRow = {
  details: string | null;
  error: string | null;
  finished_at: string | null;
  id: string;
  post_ids: string;
  posts_created: number;
  posts_requested: number;
  started_at: string;
  status: string;
  trigger_source: string;
};

export type AutoblogSettingsRow = {
  author: string | null;
  category_id: string | null;
  created_at: string;
  enabled: number;
  id: string;
  last_run_at: string | null;
  master_prompt: string;
  next_topic_seed: number;
  posts_per_day: number;
  publish_status: string;
  run_hours: string;
  topic_pool: string;
  total_generated: number;
  updated_at: string;
  with_image: number;
};

export type BackupRunsRow = {
  checksum: string | null;
  error: string | null;
  filename: string | null;
  finished_at: string | null;
  id: string;
  path: string | null;
  provider: string | null;
  row_count: number;
  size_bytes: number | null;
  started_at: string;
  status: string;
  table_count: number;
  trigger_source: string;
};

export type BlogCategoriesRow = {
  created_at: string;
  description: string | null;
  id: string;
  name: string;
  parent_id: string | null;
  seo_description: string | null;
  seo_title: string | null;
  slug: string;
  sort_order: number;
  updated_at: string;
};

export type BlogPostTagsRow = {
  created_at: string;
  post_id: string;
  tag_id: string;
};

export type BlogPostsRow = {
  author: string | null;
  canonical_url: string | null;
  category_id: string | null;
  content: string | null;
  cover_image: string | null;
  created_at: string;
  excerpt: string | null;
  focus_keyword: string | null;
  id: string;
  indexable: number;
  published_at: string | null;
  robots: string;
  seo_description: string | null;
  seo_title: string | null;
  slug: string;
  status: string;
  tags_csv: string;
  title: string;
  updated_at: string;
};

export type BlogTagsRow = {
  created_at: string;
  description: string | null;
  id: string;
  name: string;
  seo_description: string | null;
  seo_title: string | null;
  slug: string;
  sort_order: number;
  updated_at: string;
};

export type CatalogCategoriesRow = {
  created_at: string;
  id: string;
  name: string;
  sort_order: number;
  type: string;
  updated_at: string;
};

export type CatalogItemsRow = {
  bullets_json: string;
  category_id: string | null;
  created_at: string;
  description: string;
  icon: string;
  id: string;
  published: number;
  short_desc: string;
  slug: string;
  sort_order: number;
  title: string;
  type: string;
  updated_at: string;
};

export type ContactMessagesRow = {
  created_at: string;
  email: string | null;
  id: string;
  ip_address: string | null;
  message: string;
  name: string;
  phone: string | null;
  status: string;
  subject: string | null;
};

export type LoginAttemptsRow = {
  created_at: string;
  email: string;
  id: string;
  ip_address: string | null;
  reason: string | null;
  success: number;
  user_agent: string | null;
};

export type MediaAssetsRow = {
  alt: string | null;
  created_at: string;
  filename: string;
  height: number | null;
  id: string;
  mime_type: string | null;
  path: string;
  provider: string;
  size_bytes: number | null;
  updated_at: string;
  uploaded_by: string | null;
  url: string;
  width: number | null;
};

export type SchedulerRunsRow = {
  job: string;
  last_note: string | null;
  last_run_at: string;
  last_status: string | null;
};

export type SeoPagesRow = {
  canonical_url: string | null;
  created_at: string;
  description: string | null;
  id: string;
  og_image: string | null;
  page_key: string;
  path: string;
  robots: string;
  schema_json: string | null;
  title: string | null;
  updated_at: string;
};

export type SeoProposalsRow = {
  action: string;
  after_json: string;
  applied_at: string | null;
  before_json: string;
  created_at: string;
  decided_at: string | null;
  detail: string;
  error: string;
  id: string;
  kind: string;
  severity: string;
  source: string;
  status: string;
  target: string;
  title: string;
};

export type SettingsRow = {
  id: string;
  is_private: number;
  setting_key: string;
  setting_value: string;
  updated_at: string;
};

export type SitePresenceRow = {
  last_seen: string;
  path: string;
  session_id: string;
};

export type SiteVisitsRow = {
  created_at: string;
  id: string;
  path: string;
  session_id: string;
};

export type UserSessionsRow = {
  created_at: string;
  expires_at: string;
  id: string;
  ip_address: string | null;
  token_hash: string;
  user_agent: string | null;
  user_id: string;
};

export type UsersRow = {
  created_at: string;
  display_name: string | null;
  email: string;
  id: string;
  is_active: number;
  last_login_at: string | null;
  password_hash: string;
  role: string;
  updated_at: string;
};

export interface DbTables {
  app_download_clicks: TableTypes<
    AppDownloadClicksRow,
    "created_at" | "platform" | "referrer" | "user_agent"
  >;
  apps: TableTypes<
    AppsRow,
    | "created_at"
    | "description"
    | "download_url"
    | "enabled"
    | "features_json"
    | "icon_url"
    | "min_os"
    | "platform"
    | "screenshots_json"
    | "short_desc"
    | "size"
    | "sort_order"
    | "subtitle"
    | "updated_at"
    | "version"
  >;
  autoblog_runs: TableTypes<
    AutoblogRunsRow,
    | "details"
    | "error"
    | "finished_at"
    | "post_ids"
    | "posts_created"
    | "posts_requested"
    | "started_at"
    | "status"
    | "trigger_source"
  >;
  autoblog_settings: TableTypes<
    AutoblogSettingsRow,
    | "author"
    | "category_id"
    | "created_at"
    | "enabled"
    | "last_run_at"
    | "master_prompt"
    | "next_topic_seed"
    | "posts_per_day"
    | "publish_status"
    | "run_hours"
    | "topic_pool"
    | "total_generated"
    | "updated_at"
    | "with_image"
  >;
  backup_runs: TableTypes<
    BackupRunsRow,
    | "checksum"
    | "error"
    | "filename"
    | "finished_at"
    | "path"
    | "provider"
    | "row_count"
    | "size_bytes"
    | "started_at"
    | "status"
    | "table_count"
    | "trigger_source"
  >;
  blog_categories: TableTypes<
    BlogCategoriesRow,
    | "created_at"
    | "description"
    | "parent_id"
    | "seo_description"
    | "seo_title"
    | "sort_order"
    | "updated_at"
  >;
  blog_post_tags: TableTypes<BlogPostTagsRow, "created_at">;
  blog_posts: TableTypes<
    BlogPostsRow,
    | "author"
    | "canonical_url"
    | "category_id"
    | "content"
    | "cover_image"
    | "created_at"
    | "excerpt"
    | "focus_keyword"
    | "indexable"
    | "published_at"
    | "robots"
    | "seo_description"
    | "seo_title"
    | "status"
    | "tags_csv"
    | "updated_at"
  >;
  blog_tags: TableTypes<
    BlogTagsRow,
    "created_at" | "description" | "seo_description" | "seo_title" | "sort_order" | "updated_at"
  >;
  catalog_categories: TableTypes<CatalogCategoriesRow, "created_at" | "sort_order" | "updated_at">;
  catalog_items: TableTypes<
    CatalogItemsRow,
    | "bullets_json"
    | "category_id"
    | "created_at"
    | "description"
    | "icon"
    | "published"
    | "short_desc"
    | "sort_order"
    | "updated_at"
  >;
  contact_messages: TableTypes<
    ContactMessagesRow,
    "created_at" | "email" | "ip_address" | "phone" | "status" | "subject"
  >;
  login_attempts: TableTypes<
    LoginAttemptsRow,
    "created_at" | "ip_address" | "reason" | "success" | "user_agent"
  >;
  media_assets: TableTypes<
    MediaAssetsRow,
    | "alt"
    | "created_at"
    | "height"
    | "mime_type"
    | "provider"
    | "size_bytes"
    | "updated_at"
    | "uploaded_by"
    | "width"
  >;
  scheduler_runs: TableTypes<SchedulerRunsRow, "last_note" | "last_run_at" | "last_status">;
  seo_pages: TableTypes<
    SeoPagesRow,
    | "canonical_url"
    | "created_at"
    | "description"
    | "og_image"
    | "path"
    | "robots"
    | "schema_json"
    | "title"
    | "updated_at"
  >;
  seo_proposals: TableTypes<
    SeoProposalsRow,
    | "after_json"
    | "applied_at"
    | "before_json"
    | "created_at"
    | "decided_at"
    | "detail"
    | "error"
    | "kind"
    | "severity"
    | "source"
    | "status"
    | "target"
    | "title"
  >;
  settings: TableTypes<SettingsRow, "is_private" | "setting_value" | "updated_at">;
  site_presence: TableTypes<SitePresenceRow, "last_seen">;
  site_visits: TableTypes<SiteVisitsRow, "created_at">;
  user_sessions: TableTypes<UserSessionsRow, "created_at" | "ip_address" | "user_agent">;
  users: TableTypes<
    UsersRow,
    "created_at" | "display_name" | "is_active" | "last_login_at" | "role" | "updated_at"
  >;
}
