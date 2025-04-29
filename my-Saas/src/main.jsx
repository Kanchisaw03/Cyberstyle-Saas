import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
import { MotionConfig } from 'framer-motion'
import './index.css'
import './cyberpunk-styles.css'
import './performance-optimizations.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </ReactLenis>
  </StrictMode>,
)
