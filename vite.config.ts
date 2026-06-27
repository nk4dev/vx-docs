import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

function shim(rel: string) {
  return fileURLToPath(new URL(rel, import.meta.url))
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] }) },
    react(),
  ],
  resolve: {
    alias: {
      'next/link': shim('./src/shims/next-link.tsx'),
      'next/navigation': shim('./src/shims/next-navigation.ts'),
      'next/image': shim('./src/shims/next-image.tsx'),
    },
  },
})
