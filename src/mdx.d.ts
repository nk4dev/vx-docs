declare module '*.mdx' {
  import type { FC } from 'react'
  export const frontmatter: Record<string, unknown>
  const Component: FC
  export default Component
}
