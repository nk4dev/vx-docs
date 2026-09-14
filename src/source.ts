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
      name: 'Commands',
      url: '/docs/commands',
    },
    {
      type: 'page',
      name: 'API',
      url: '/docs/api',
    },
  ],
}
