import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import IntroPage from './pages/intro'
import VxUsagePage from './pages/vx-usage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs" element={<IntroPage />} />
      <Route path="/docs/vx-usage" element={<VxUsagePage />} />
    </Routes>
  )
}
