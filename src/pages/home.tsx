import { Link, useLocation } from 'react-router-dom'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { localeFromPath, localizePath, type Locale } from '../i18n'

interface HomeContent {
  badge: string
  heroPrefix: string
  heroSuffix: string
  tagline: string
  getStarted: string
  commands: string
  api: string
  featuresTitle: string
  features: { title: string; description: string }[]
}

const content: Record<Locale, HomeContent> = {
  en: {
    badge: 'Web3 Development Toolkit',
    heroPrefix: 'Build Web3 apps faster with ',
    heroSuffix: '',
    tagline:
      'A toolkit for Web3 development — multi-chain support, a real-time dev dashboard, the VXC Solidity compiler, and more. Works as a CLI or SDK.',
    getStarted: 'Get Started →',
    commands: 'Commands',
    api: 'API',
    featuresTitle: 'Everything you need for Web3 development',
    features: [
      {
        title: 'Multi-chain Support',
        description: 'Built on ethers.js v6. Connect to any EVM-compatible network with a unified API.',
      },
      {
        title: 'Payments & NFTs',
        description: 'Send transactions and mint NFTs from the CLI, the SDK, or a bundled React component.',
      },
      {
        title: 'Real-time Dashboard',
        description: 'vx3 dash opens a live dev dashboard with block number, gas fees, RPC status, and an SSE activity log.',
      },
      {
        title: 'VXC Compiler',
        description: 'An in-house custom Solidity compiler with optimizer, EVM version targeting, and import remapping.',
      },
      {
        title: 'Hardhat, React & Vue',
        description: 'One-command scaffolding for a Hardhat toolchain or a React/Vue frontend.',
      },
      {
        title: 'Gas, RPC & IPFS Tools',
        description: 'Query live gas fees, manage RPC endpoints, and pin/fetch content via IPFS.',
      },
    ],
  },
  ja: {
    badge: 'Web3 開発ツールキット',
    heroPrefix: '',
    heroSuffix: ' で Web3 アプリをもっと速く',
    tagline:
      'Web3 開発のためのツールキット。マルチチェーン対応、リアルタイム開発ダッシュボード、Solidity コンパイラ VXC などを備え、CLI としても SDK としても使えます。',
    getStarted: 'はじめる →',
    commands: 'コマンド',
    api: 'API',
    featuresTitle: 'Web3 開発に必要なものをひとつに',
    features: [
      {
        title: 'マルチチェーン対応',
        description: 'ethers.js v6 ベース。統一された API で、あらゆる EVM 互換ネットワークに接続できます。',
      },
      {
        title: '支払いと NFT',
        description: 'CLI、SDK、同梱の React コンポーネントから、トランザクションの送信や NFT のミントができます。',
      },
      {
        title: 'リアルタイムダッシュボード',
        description: 'vx3 dash で、ブロック番号・ガス代・RPC の状態・SSE アクティビティログを表示する開発ダッシュボードを開きます。',
      },
      {
        title: 'VXC コンパイラ',
        description: 'オプティマイザ、EVM バージョン指定、import リマッピングに対応した独自の Solidity コンパイラです。',
      },
      {
        title: 'Hardhat・React・Vue',
        description: 'Hardhat ツールチェーンや React / Vue フロントエンドを、コマンドひとつでセットアップできます。',
      },
      {
        title: 'ガス・RPC・IPFS ツール',
        description: '現在のガス代の取得、RPC エンドポイントの管理、IPFS 経由のコンテンツのピン留め・取得ができます。',
      },
    ],
  },
}

export default function HomePage() {
  const locale = localeFromPath(useLocation().pathname)
  const t = content[locale]

  return (
    <HomeLayout
      nav={{ title: 'VX SDK', url: localizePath('/', locale) }}
      githubUrl="https://github.com/nk4dev/vx"
      i18n
    >
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16 gap-6">
        <span className="inline-block rounded-full border border-fd-border px-3 py-1 text-xs text-fd-muted-foreground">
          {t.badge}
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-fd-foreground">
          {t.heroPrefix}
          <span className="text-fd-primary">vx3</span>
          {t.heroSuffix}
        </h1>
        <p className="max-w-xl text-lg text-fd-muted-foreground">
          {t.tagline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Link
            to={localizePath('/docs', locale)}
            className="inline-flex items-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            {t.getStarted}
          </Link>
          <Link
            to={localizePath('/docs/commands', locale)}
            className="inline-flex items-center rounded-md border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            {t.commands}
          </Link>
          <Link
            to={localizePath('/docs/api', locale)}
            className="inline-flex items-center rounded-md border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            {t.api}
          </Link>
        </div>
      </section>

      {/* Quick install */}
      <section className="flex justify-center px-4 pb-16">
        <div className="rounded-lg border border-fd-border bg-fd-card px-6 py-4 font-mono text-sm text-fd-muted-foreground">
          <span className="select-none mr-2 text-fd-primary">$</span>
          npm install -g vx3
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <h2 className="text-center text-2xl font-bold text-fd-foreground mb-10">
          {t.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-fd-border bg-fd-card p-6 hover:border-fd-primary/50 transition-colors"
            >
              <h3 className="mb-2 font-semibold text-fd-foreground">{f.title}</h3>
              <p className="text-sm text-fd-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </HomeLayout>
  )
}
