import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  EcosystemOverview,
  HeroSection,
  Navbar,
  FlashcardSpotlight,
  NFTSpotlight,
  EduChainSection,
  Footer,
  SurveyPage,
} from './components'

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EcosystemOverview />
      <FlashcardSpotlight />
      <NFTSpotlight />
      <EduChainSection />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey/pengguna-airdrop" element={<SurveyPage />} />
      </Routes>
    </Router>
  )
}

export default App
