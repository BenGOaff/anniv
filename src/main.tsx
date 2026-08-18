import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles/base.css'
import './styles/ui.css'
import './styles/scenes.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/* PWA minimaliste : une fois le jeu charge, il fonctionne meme si le
   reseau du restaurant est mauvais. Enregistrement non bloquant. */
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      /* pas de service worker : le jeu fonctionne quand meme */
    })
  })
}
