import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'

type MDXContent = ComponentType<{ components?: MDXComponents }>

interface DocModule {
  default: MDXContent
  frontmatter?: Record<string, unknown>
}

const modules = import.meta.glob('./content/docs/**/*.mdx', { eager: true }) as Record<string, DocModule>

export interface DocEntry {
  slug: string
  Component: MDXContent
  frontmatter: { title?: string; description?: string }
}

const entries = new Map<string, DocEntry>()

for (const [path, mod] of Object.entries(modules)) {
  let slug = path.replace('./content/docs/', '').replace(/\.mdx$/, '')
  if (slug === 'index') slug = ''
  else if (slug.endsWith('/index')) slug = slug.slice(0, -'/index'.length)

  entries.set(slug, {
    slug,
    Component: mod.default,
    frontmatter: (mod.frontmatter ?? {}) as { title?: string; description?: string },
  })
}

export function getDoc(slug: string): DocEntry | undefined {
  return entries.get(slug)
}
