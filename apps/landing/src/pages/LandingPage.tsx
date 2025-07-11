import {
  EcosystemOverview,
  HeroSection,
  Navbar,
  HowItWorksSection,
  CreatorSection,
  FAQSection,
  Footer,
} from '../components'

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EcosystemOverview />
      <HowItWorksSection />
      <CreatorSection />
      <FAQSection />
      <Footer />
    </>
  )
}

export default LandingPage
