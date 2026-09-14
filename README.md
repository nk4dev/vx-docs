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
