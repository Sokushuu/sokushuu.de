import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { SurveyPage } from './components'
import { LandingPage } from './pages'

// Component to track page views
function PageViewTracker() {
  const location = useLocation()
  const posthog = usePostHog()

  useEffect(() => {
    // Track pageview with PostHog when route changes
    posthog?.capture('$pageview')
  }, [location, posthog])

  return null
}

function App() {
  return (
    <Router>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey/pengguna-airdrop" element={<SurveyPage />} />
      </Routes>
    </Router>
  )
}

export default App
