import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/styles/main.scss"
import App from './App.jsx'
import { TimelineProvider } from './components/TimelineContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TimelineProvider>
      <App />
    </TimelineProvider>
  </StrictMode>,
)
