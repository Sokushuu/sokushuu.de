import {
  EcosystemOverview,
  HeroSection,
  Navbar,
  HowItWorksSection,
  CreatorSection,
  FAQSection,
  Footer,
  CountdownSection,
} from '../components'

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CountdownSection />
      <EcosystemOverview />
      <HowItWorksSection />
      <CreatorSection />
      <FAQSection />
      <Footer />
    </>
  )
}

export default LandingPage
