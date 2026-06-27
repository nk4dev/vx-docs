import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RootProvider } from 'fumadocs-ui/provider'
import App from './app'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootProvider theme={{ defaultTheme: 'dark', enableSystem: true }}>
        <App />
      </RootProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
