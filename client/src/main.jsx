import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import LoadingSpinner from './components/LoadingSpinner'
import './index.css'

// Lazy load the main App component
const App = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <App />
    </Suspense>
  </StrictMode>,
)