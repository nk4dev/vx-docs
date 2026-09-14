import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import IntroPage from './pages/intro'
import CommandsPage from './pages/commands'
import ApiPage from './pages/api'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs" element={<IntroPage />} />
      <Route path="/docs/commands" element={<CommandsPage />} />
      <Route path="/docs/api" element={<ApiPage />} />
    </Routes>
  )
}
