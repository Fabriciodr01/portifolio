import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/share-tech-mono/latin-400.css'
import '@fontsource/big-shoulders-display/latin-800'
import '@/styles/theme.css'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
