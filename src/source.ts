import type { PageTree } from 'fumadocs-core/server'

export const pageTree: PageTree.Root = {
  name: 'VX SDK Docs',
  children: [
    {
      type: 'page',
      name: 'Introduction',
      url: '/docs',
    },
    {
      type: 'page',
      name: 'vx3 User Guide',
      url: '/docs/vx-usage',
    },
  ],
}
