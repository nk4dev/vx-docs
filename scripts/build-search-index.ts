import { fileURLToPath } from 'url'
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { join, relative } from 'path'

const here = fileURLToPath(new URL('.', import.meta.url))
const CONTENT_DIR = join(here, '../src/content')
// Mirrors the content roots in src/docs-loader.ts; `prefix` is the locale's URL prefix.
const LOCALES = [
  { locale: 'en', dir: join(CONTENT_DIR, 'docs'), prefix: '' },
  { locale: 'ja', dir: join(CONTENT_DIR, 'ja/docs'), prefix: '/ja' },
]
const OUT_DIR = join(here, '../src/generated')
const OUT_FILE = join(OUT_DIR, 'search-index.json')

function walk(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (entry.endsWith('.mdx')) out.push(full)
  }
  return out
}

function slugFor(dir: string, file: string): string {
  let rel = relative(dir, file).replace(/\\/g, '/').replace(/\.mdx$/, '')
  if (rel === 'index') rel = ''
  else if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length)
  return rel
}

function parseFrontmatter(raw: string): { title?: string; description?: string; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { body: raw }
  const yaml = match[1]
  const body = raw.slice(match[0].length)
  const title = yaml.match(/^title:\s*(.+)$/m)?.[1]?.trim()
  const description = yaml.match(/^description:\s*(.+)$/m)?.[1]?.trim()
  return { title, description, body }
}

const indexes = LOCALES.flatMap(({ locale, dir, prefix }) =>
  walk(dir).map((file) => {
    const raw = readFileSync(file, 'utf8')
    const { title, description, body } = parseFrontmatter(raw)
    const slug = slugFor(dir, file)
    const url = slug ? `${prefix}/docs/${slug}` : `${prefix}/docs`
    return { title: title ?? url, description, content: body, url, locale }
  }),
)

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_FILE, JSON.stringify(indexes))
console.log(`Wrote search index data for ${indexes.length} pages to ${relative(join(here, '..'), OUT_FILE)}`)
