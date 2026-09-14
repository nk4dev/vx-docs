import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import { initSimpleSearch } from 'fumadocs-core/search/server'

function shim(rel: string) {
  return fileURLToPath(new URL(rel, import.meta.url))
}

// Dev-only stand-in for the `/api/search` Cloudflare Pages Function (functions/api/search.ts),
// which only runs under `wrangler pages dev`, not plain `vite`.
function searchApiDevMiddleware(): Plugin {
  return {
    name: 'search-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/search', async (req, res) => {
        const url = new URL(req.url ?? '', 'http://localhost')
        const query = url.searchParams.get('query')
        res.setHeader('content-type', 'application/json')

        if (!query) {
          res.end('[]')
          return
        }

        const indexes = JSON.parse(readFileSync(shim('./src/generated/search-index.json'), 'utf8'))
        const searchServer = initSimpleSearch({ indexes })
        const results = await searchServer.search(query, {
          tag: url.searchParams.get('tag')?.split(',') ?? undefined,
          locale: url.searchParams.get('locale') ?? undefined,
        })
        res.end(JSON.stringify(results))
      })
    },
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm] }) },
    react(),
    searchApiDevMiddleware(),
  ],
  resolve: {
    alias: {
      'next/link': shim('./src/shims/next-link.tsx'),
      'next/navigation': shim('./src/shims/next-navigation.ts'),
      'next/image': shim('./src/shims/next-image.tsx'),
    },
  },
})
