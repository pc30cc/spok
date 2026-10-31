# spok

Marketing website built with TanStack Start (React + Vite), rendered on the server and
bundled into a plain Node server by Nitro.

## Development

Requires Node.js 22, npm and a PostgreSQL database: set `DATABASE_URL` (e.g. in `.env`, see
`.env.example`). The schema in `db/schema.sql` is applied when the server starts.

```sh
npm ci
npm run dev
```

`npm test` runs the Vitest suite, `npm run lint` runs ESLint.

## Deployment (Coolify / Nixpacks)

The site is deployed by Coolify from the `main` branch using the Nixpacks build pack; everything it
needs is in `nixpacks.toml`:

- `npm run build` emits `dist/server/index.mjs` (SSR) and `dist/client` (static assets); Nitro's
  `node-server` preset is the default and `NITRO_PRESET` (set in `nixpacks.toml`) can change it.
- Start command: `node --env-file-if-exists=.env dist/server/index.mjs` (Coolify environment
  variables take precedence over `.env`).

Environment variables are set in the Coolify app (see `.env.example` for the full list);
`DATABASE_URL` is required, see `docs/self-host-postgres.md`. `VITE_*` variables are read at build
time, so mark them as build variables too. Health checks: `GET /healthz` (process only) and
`GET /api/public/health` (environment and database).
