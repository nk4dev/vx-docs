import { Link as RouterLink } from 'react-router-dom'
import type { ComponentProps } from 'react'

type Props = Omit<ComponentProps<'a'>, 'href'> & {
  href: string
  prefetch?: boolean
}

export default function Link({ href, prefetch: _prefetch, children, ...props }: Props) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('//')
  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  }
  return <RouterLink to={href} {...props}>{children}</RouterLink>
}
