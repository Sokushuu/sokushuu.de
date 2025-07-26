import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { SurveyPage } from './components'
import { LandingPage } from './pages'
import ExploreLessonsPage from './pages/ExploreLessonsPage'
import { ThemeProvider } from './contexts/ThemeContext'

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
    <ThemeProvider>
      <Router>
        <PageViewTracker />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExploreLessonsPage />} />
          <Route path="/survey/pengguna-airdrop" element={<SurveyPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
