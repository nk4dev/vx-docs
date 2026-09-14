import { useParams } from 'react-router-dom'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { getDoc } from '../docs-loader'
import { pageTree } from '../source'

export default function DocPage() {
  const params = useParams()
  const slug = params['*'] ?? ''
  const doc = getDoc(slug)

  return (
    <DocsLayout tree={pageTree} nav={{ title: 'VX SDK' }} githubUrl="https://github.com/nk4dev/vx">
      <DocsPage toc={[]}>
        {doc ? (
          <>
            {doc.frontmatter.title && <DocsTitle>{doc.frontmatter.title}</DocsTitle>}
            {doc.frontmatter.description && <DocsDescription>{doc.frontmatter.description}</DocsDescription>}
            <DocsBody>
              <doc.Component />
            </DocsBody>
          </>
        ) : (
          <DocsBody>
            <p>Page not found.</p>
          </DocsBody>
        )}
      </DocsPage>
    </DocsLayout>
  )
}
