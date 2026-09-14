import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import CommandsContent, { frontmatter } from '../content/docs/commands.mdx'
import { pageTree } from '../source'

export default function CommandsPage() {
  const fm = frontmatter as { title?: string; description?: string }
  return (
    <DocsLayout tree={pageTree} nav={{ title: 'VX SDK' }} githubUrl="https://github.com/nk4dev/vx">
      <DocsPage toc={[]}>
        {fm.title && <DocsTitle>{fm.title}</DocsTitle>}
        {fm.description && <DocsDescription>{fm.description}</DocsDescription>}
        <DocsBody>
          <CommandsContent />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  )
}
