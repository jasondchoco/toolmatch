import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import App from './App.jsx'
import './index.css'

inject()

// Material Web components
import '@material/web/button/filled-button.js'
import '@material/web/button/outlined-button.js'
import '@material/web/button/text-button.js'
import '@material/web/progress/linear-progress.js'
import '@material/web/divider/divider.js'
import '@material/web/textfield/outlined-text-field.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/chips/filter-chip.js'
import '@material/web/chips/chip-set.js'
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js'

document.adoptedStyleSheets.push(typescaleStyles.styleSheet)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
