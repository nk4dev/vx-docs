import { Link } from 'react-router-dom'
import { HomeLayout } from 'fumadocs-ui/layouts/home'

const features = [
  {
    title: 'Multi-chain Support',
    description: 'Built on ethers.js v6. Connect to any EVM-compatible network with a unified API.',
  },
  {
    title: 'Wallet Management',
    description: 'Create, import, and manage wallets. Send payments programmatically with a single call.',
  },
  {
    title: 'Local Dev Server',
    description: 'Spin up a local blockchain environment instantly for rapid iteration.',
  },
  {
    title: 'Hardhat Integration',
    description: 'One-command Hardhat project scaffolding with sensible defaults.',
  },
  {
    title: 'Gas & RPC Tools',
    description: 'Query live gas fees and manage RPC endpoints across networks.',
  },
  {
    title: 'React Components',
    description: 'Generate ready-to-use React/Next.js payment components via CLI.',
  },
]

export default function HomePage() {
  return (
    <HomeLayout
      nav={{ title: 'VX SDK' }}
      githubUrl="https://github.com/nk4dev/vx"
    >
      {/* Hero */}
      <section className="flex flex-col items-center text-center px-4 pt-24 pb-16 gap-6">
        <span className="inline-block rounded-full border border-fd-border px-3 py-1 text-xs text-fd-muted-foreground">
          Web3 Development Toolkit
        </span>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-fd-foreground">
          Build Web3 apps faster with{' '}
          <span className="text-fd-primary">vx3</span>
        </h1>
        <p className="max-w-xl text-lg text-fd-muted-foreground">
          A toolkit for Web3 development — multi-chain support, wallet management,
          local dev server, and more. Works as a CLI or SDK.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <Link
            to="/docs"
            className="inline-flex items-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            Get Started →
          </Link>
          <Link
            to="/docs/vx-usage"
            className="inline-flex items-center rounded-md border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            User Guide
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
          Everything you need for Web3 development
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
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
