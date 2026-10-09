import type { PageTree } from 'fumadocs-core/server'
import { localizePath, type Locale } from './i18n'

type Label = Record<Locale, string>

interface PageDef {
  name: Label
  url: string
}

interface FolderDef extends PageDef {
  children: PageDef[]
}

// Command and API names are identifiers, so most labels are the same in every locale.
const same = (name: string): Label => ({ en: name, ja: name })

const rootName: Label = { en: 'VX SDK Docs', ja: 'VX SDK ドキュメント' }

const tree: (PageDef | FolderDef)[] = [
  { name: { en: 'Introduction', ja: 'はじめに' }, url: '/docs' },
  {
    name: { en: 'Commands', ja: 'コマンド' },
    url: '/docs/commands',
    children: [
      { name: same('init & create'), url: '/docs/commands/project' },
      { name: same('api'), url: '/docs/commands/api-server' },
      { name: same('dash'), url: '/docs/commands/dashboard' },
      { name: same('rpc'), url: '/docs/commands/rpc' },
      { name: same('pay'), url: '/docs/commands/pay' },
      { name: same('gas'), url: '/docs/commands/gas' },
      { name: same('ipfs'), url: '/docs/commands/ipfs' },
      { name: same('setup'), url: '/docs/commands/setup' },
      { name: same('generate'), url: '/docs/commands/generate' },
      { name: same('compile'), url: '/docs/commands/compile' },
      { name: same('nft mint'), url: '/docs/commands/nft' },
      { name: same('sol, info & help'), url: '/docs/commands/misc' },
    ],
  },
  {
    name: same('API'),
    url: '/docs/api',
    children: [
      { name: { en: 'SDK basics', ja: 'SDK の基本' }, url: '/docs/api/sdk-basics' },
      { name: { en: 'Payments', ja: '支払い' }, url: '/docs/api/payments' },
      { name: { en: 'NFT minting', ja: 'NFT のミント' }, url: '/docs/api/nft-minting' },
      { name: { en: 'React components & hooks', ja: 'React コンポーネントとフック' }, url: '/docs/api/react-components' },
    ],
  },
]

function buildPageTree(locale: Locale): PageTree.Root {
  const page = (def: PageDef): PageTree.Item => ({
    type: 'page',
    name: def.name[locale],
    url: localizePath(def.url, locale),
  })

  return {
    name: rootName[locale],
    children: tree.map((def) =>
      'children' in def
        ? {
            type: 'folder',
            name: def.name[locale],
            defaultOpen: true,
            index: page(def),
            children: def.children.map(page),
          }
        : page(def),
    ),
  }
}

const pageTrees: Record<Locale, PageTree.Root> = {
  en: buildPageTree('en'),
  ja: buildPageTree('ja'),
}

export function getPageTree(locale: Locale): PageTree.Root {
  return pageTrees[locale]
}
