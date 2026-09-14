import { fileURLToPath } from 'url'
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { join, relative } from 'path'

const here = fileURLToPath(new URL('.', import.meta.url))
const DOCS_DIR = join(here, '../src/content/docs')
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

function slugFor(file: string): string {
  let rel = relative(DOCS_DIR, file).replace(/\\/g, '/').replace(/\.mdx$/, '')
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

const files = walk(DOCS_DIR)
const indexes = files.map((file) => {
  const raw = readFileSync(file, 'utf8')
  const { title, description, body } = parseFrontmatter(raw)
  const slug = slugFor(file)
  const url = slug ? `/docs/${slug}` : '/docs'
  return { title: title ?? url, description, content: body, url }
})

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(OUT_FILE, JSON.stringify(indexes))
console.log(`Wrote search index data for ${indexes.length} pages to ${relative(join(here, '..'), OUT_FILE)}`)
