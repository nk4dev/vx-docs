import { createI18nSearchAPI, type Index } from 'fumadocs-core/search/server'
import { i18n } from './i18n'

export type LocalizedIndex = Index & { locale: string }

// Orama's built-in tokenizers split on whitespace and treat Japanese characters as separators,
// so Japanese text would never be indexed. Latin words are kept whole; runs of Japanese
// characters are indexed as overlapping bigrams, which makes any 2+ character query match.
const JAPANESE_RUN = /[぀-ヿ㐀-䶿一-鿿ｦ-ﾟ]+/g
const SEGMENT = /[a-z0-9_]+|[぀-ヿ㐀-䶿一-鿿ｦ-ﾟ]+/g

function tokenizeJapanese(raw: string): string[] {
  if (typeof raw !== 'string') return [raw]

  const tokens = new Set<string>()
  for (const segment of raw.normalize('NFKC').toLowerCase().match(SEGMENT) ?? []) {
    JAPANESE_RUN.lastIndex = 0
    if (!JAPANESE_RUN.test(segment) || segment.length === 1) {
      tokens.add(segment)
      continue
    }
    for (let i = 0; i < segment.length - 1; i++) tokens.add(segment.slice(i, i + 2))
  }
  return [...tokens]
}

export function createSearchServer(indexes: LocalizedIndex[]) {
  return createI18nSearchAPI('simple', {
    i18n,
    indexes,
    localeMap: {
      en: 'english',
      ja: {
        tokenizer: {
          language: 'english',
          normalizationCache: new Map(),
          tokenize: tokenizeJapanese,
        },
        // Bigrams are short, so typo tolerance would match almost anything; require every token instead.
        search: { tolerance: 0, threshold: 0 },
      },
    },
  })
}
