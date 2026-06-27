import type { ComponentProps } from 'react'

type Props = ComponentProps<'img'> & {
  fill?: boolean
  priority?: boolean
  quality?: number
  placeholder?: string
  blurDataURL?: string
  loader?: unknown
  sizes?: string
}

export default function Image({ fill: _fill, priority: _priority, quality: _quality, placeholder: _placeholder, blurDataURL: _blurDataURL, loader: _loader, ...props }: Props) {
  return <img {...props} />
}
