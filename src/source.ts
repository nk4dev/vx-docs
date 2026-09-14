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
      type: 'folder',
      name: 'Commands',
      defaultOpen: true,
      index: { type: 'page', name: 'Commands', url: '/docs/commands' },
      children: [
        { type: 'page', name: 'init & create', url: '/docs/commands/project' },
        { type: 'page', name: 'api', url: '/docs/commands/api-server' },
        { type: 'page', name: 'dash', url: '/docs/commands/dashboard' },
        { type: 'page', name: 'rpc', url: '/docs/commands/rpc' },
        { type: 'page', name: 'pay', url: '/docs/commands/pay' },
        { type: 'page', name: 'gas', url: '/docs/commands/gas' },
        { type: 'page', name: 'ipfs', url: '/docs/commands/ipfs' },
        { type: 'page', name: 'setup', url: '/docs/commands/setup' },
        { type: 'page', name: 'generate', url: '/docs/commands/generate' },
        { type: 'page', name: 'compile', url: '/docs/commands/compile' },
        { type: 'page', name: 'nft mint', url: '/docs/commands/nft' },
        { type: 'page', name: 'sol, info & help', url: '/docs/commands/misc' },
      ],
    },
    {
      type: 'folder',
      name: 'API',
      defaultOpen: true,
      index: { type: 'page', name: 'API', url: '/docs/api' },
      children: [
        { type: 'page', name: 'SDK basics', url: '/docs/api/sdk-basics' },
        { type: 'page', name: 'Payments', url: '/docs/api/payments' },
        { type: 'page', name: 'NFT minting', url: '/docs/api/nft-minting' },
        { type: 'page', name: 'React components & hooks', url: '/docs/api/react-components' },
      ],
    },
  ],
}
