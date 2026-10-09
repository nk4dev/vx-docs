import type { I18nConfig } from 'fumadocs-core/i18n'
import type { Translations } from 'fumadocs-ui/i18n'

export type Locale = 'en' | 'ja'

// English is served unprefixed (`/docs/...`); every other locale lives under `/<locale>/docs/...`.
// A plain object rather than `defineI18n()`: outside the browser `fumadocs-core/i18n` resolves to a
// build that imports `next/server`, which the Pages Function and vite.config.ts cannot load.
export const i18n: I18nConfig<Locale> = {
  languages: ['en', 'ja'],
  defaultLanguage: 'en',
  hideLocale: 'default-locale',
}

export const locales: { name: string; locale: Locale }[] = [
  { name: 'English', locale: 'en' },
  { name: '日本語', locale: 'ja' },
]

export const uiTranslations: Partial<Record<Locale, Partial<Translations>>> = {
  ja: {
    search: '検索',
    searchNoResult: '結果が見つかりません',
    toc: 'このページの内容',
    tocNoHeadings: '見出しがありません',
    lastUpdate: '最終更新',
    chooseLanguage: '言語を選択',
    nextPage: '次のページ',
    previousPage: '前のページ',
    chooseTheme: 'テーマ',
    editOnGithub: 'GitHub で編集',
  },
}

function isLocale(value: string | undefined): value is Locale {
  return i18n.languages.includes(value as Locale)
}

export function localeFromPath(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0]
  return isLocale(first) && first !== i18n.defaultLanguage ? first : i18n.defaultLanguage
}

/** Rewrite `pathname` (in any locale) to the equivalent path in `locale`. */
export function localizePath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  if (isLocale(segments[0])) segments.shift()
  if (locale !== i18n.defaultLanguage) segments.unshift(locale)
  return `/${segments.join('/')}`
}
