import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'
import { i18n, type Locale } from './i18n'

type MDXContent = ComponentType<{ components?: MDXComponents }>

interface DocModule {
  default: MDXContent
  frontmatter?: Record<string, unknown>
}

// One content root per locale; a translated page sits at the same relative path as its English original.
const modules: Record<Locale, Record<string, DocModule>> = {
  en: import.meta.glob('./content/docs/**/*.mdx', { eager: true }),
  ja: import.meta.glob('./content/ja/docs/**/*.mdx', { eager: true }),
}

const roots: Record<Locale, string> = {
  en: './content/docs/',
  ja: './content/ja/docs/',
}

export interface DocEntry {
  slug: string
  locale: Locale
  Component: MDXContent
  frontmatter: { title?: string; description?: string }
}

const entries = new Map<string, DocEntry>()

for (const locale of i18n.languages) {
  for (const [path, mod] of Object.entries(modules[locale])) {
    let slug = path.replace(roots[locale], '').replace(/\.mdx$/, '')
    if (slug === 'index') slug = ''
    else if (slug.endsWith('/index')) slug = slug.slice(0, -'/index'.length)

    entries.set(`${locale}:${slug}`, {
      slug,
      locale,
      Component: mod.default,
      frontmatter: (mod.frontmatter ?? {}) as { title?: string; description?: string },
    })
  }
}

/** Falls back to the default-language page when `slug` has no translation in `locale`. */
export function getDoc(slug: string, locale: Locale = i18n.defaultLanguage): DocEntry | undefined {
  return entries.get(`${locale}:${slug}`) ?? entries.get(`${i18n.defaultLanguage}:${slug}`)
}
