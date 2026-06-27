import { Navigate, Route, Routes } from 'react-router-dom'
import IntroPage from './pages/intro'
import VxUsagePage from './pages/vx-usage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/docs" replace />} />
      <Route path="/docs" element={<IntroPage />} />
      <Route path="/docs/vx-usage" element={<VxUsagePage />} />
    </Routes>
  )
}
