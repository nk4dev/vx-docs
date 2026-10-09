import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { RootProvider } from 'fumadocs-ui/provider'
import HomePage from './pages/home'
import DocPage from './pages/doc'
import { localeFromPath, localizePath, locales, uiTranslations, type Locale } from './i18n'

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const locale = localeFromPath(pathname)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <RootProvider
      theme={{ defaultTheme: 'dark', enableSystem: true }}
      i18n={{
        locale,
        locales,
        translations: uiTranslations[locale],
        onLocaleChange: (next) => navigate(localizePath(pathname, next as Locale)),
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocPage />} />
        <Route path="/docs/*" element={<DocPage />} />
        <Route path="/ja" element={<HomePage />} />
        <Route path="/ja/docs" element={<DocPage />} />
        <Route path="/ja/docs/*" element={<DocPage />} />
      </Routes>
    </RootProvider>
  )
}
