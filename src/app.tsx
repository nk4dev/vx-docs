import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home'
import DocPage from './pages/doc'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs" element={<DocPage />} />
      <Route path="/docs/*" element={<DocPage />} />
    </Routes>
  )
}
