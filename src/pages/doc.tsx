import { useLocation, useParams } from 'react-router-dom'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { getDoc } from '../docs-loader'
import { getPageTree } from '../source'
import { localeFromPath, localizePath, type Locale } from '../i18n'

const notFound: Record<Locale, string> = {
  en: 'Page not found.',
  ja: 'ページが見つかりません。',
}

export default function DocPage() {
  const params = useParams()
  const locale = localeFromPath(useLocation().pathname)
  const slug = params['*'] ?? ''
  const doc = getDoc(slug, locale)

  return (
    <DocsLayout
      tree={getPageTree(locale)}
      nav={{ title: 'VX SDK', url: localizePath('/', locale) }}
      githubUrl="https://github.com/nk4dev/vx"
      i18n
    >
      <DocsPage toc={[]}>
        {doc ? (
          <>
            {doc.frontmatter.title && <DocsTitle>{doc.frontmatter.title}</DocsTitle>}
            {doc.frontmatter.description && <DocsDescription>{doc.frontmatter.description}</DocsDescription>}
            <DocsBody lang={doc.locale}>
              <doc.Component components={{ pre: defaultMdxComponents.pre }} />
            </DocsBody>
          </>
        ) : (
          <DocsBody>
            <p>{notFound[locale]}</p>
          </DocsBody>
        )}
      </DocsPage>
    </DocsLayout>
  )
}
