# VX SDK Docs

This website is the documentation site for `vx3`, built with [Vite](https://vitejs.dev/), [React](https://react.dev/), and [Fumadocs](https://fumadocs.dev/).

## Installation

```bash
bun install
```

## Local Development

```bash
bun run dev
```

This command starts a local development server. Most changes are reflected live without having to restart the server.

## Translations

English pages live in `src/content/docs` and are served at `/docs/...`. Japanese pages live in `src/content/ja/docs` at the same relative path and are served at `/ja/docs/...`; a page with no translation falls back to English.

When adding a page, add it to both directories and to the sidebar in `src/source.ts`. Links inside Japanese pages should point at `/ja/docs/...`.

## Build

```bash
bun run build
```

This command type-checks the project and generates static content into the `dist` directory, which can be served using any static content hosting service.

## Preview

```bash
bun run preview
```

Serves the production build from `dist` locally.

```bash
bun run pages:preview
```

Serves the production build from `dist` via `wrangler pages dev`, matching the Cloudflare Pages runtime.

## Deployment

```bash
bun run deploy
```

Builds the site and deploys it to Cloudflare Pages via `wrangler pages deploy`.
