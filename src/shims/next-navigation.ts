import { useLocation, useNavigate, useParams as useRRParams } from 'react-router-dom'

export function usePathname() {
  return useLocation().pathname
}

export function useRouter() {
  const navigate = useNavigate()
  return {
    push: (path: string) => navigate(path),
    replace: (path: string) => navigate(path, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => window.location.reload(),
    prefetch: (_url: string) => {},
  }
}

export function useSearchParams() {
  const location = useLocation()
  return new URLSearchParams(location.search)
}

export function useParams() {
  return useRRParams()
}
