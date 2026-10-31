# spok

Marketing website built with TanStack Start (React + Vite), rendered on the server and
bundled into a plain Node server by Nitro.

## Development

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

`npm test` runs the Vitest suite, `npm run lint` runs ESLint.

## Deployment (Coolify / Nixpacks)

The site is deployed by Coolify from the `main` branch using the Nixpacks build pack; everything it
needs is in `nixpacks.toml`:

- `NITRO_PRESET=node-server` makes `npm run build` emit `dist/server/index.mjs` (SSR) and
  `dist/client` (static assets).
- Start command: `node --env-file-if-exists=.env dist/server/index.mjs` (Coolify environment
  variables take precedence over `.env`).

Environment variables are set in the Coolify app (see `.env.example` for the full list). `VITE_*`
variables are read at build time, so mark them as build variables too. Health check: `GET /healthz`.
