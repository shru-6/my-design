import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

if (import.meta.env.DEV) {
  import('./utils/themeRegistrySanityCheck').then(({ runThemeRegistrySanityCheck }) => {
    runThemeRegistrySanityCheck()
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

