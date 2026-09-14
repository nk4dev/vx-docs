import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import ApiContent, { frontmatter } from '../content/docs/api.mdx'
import { pageTree } from '../source'

export default function ApiPage() {
  const fm = frontmatter as { title?: string; description?: string }
  return (
    <DocsLayout tree={pageTree} nav={{ title: 'VX SDK' }} githubUrl="https://github.com/nk4dev/vx">
      <DocsPage toc={[]}>
        {fm.title && <DocsTitle>{fm.title}</DocsTitle>}
        {fm.description && <DocsDescription>{fm.description}</DocsDescription>}
        <DocsBody>
          <ApiContent />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  )
}
