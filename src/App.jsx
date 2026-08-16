import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import ProblemSection from './components/ProblemSection.jsx'
import ProcessSection from './components/ProcessSection.jsx'
import Footer from './components/Footer.jsx'
import SmoothScroll from './lib/SmoothScroll.jsx'
import FeaturesSection from './components/FeaturesSection.jsx'
import BenefitsSection from './components/BenefitsSection.jsx'
import WhoItsFor from './components/WhoItsFor.jsx'
import FAQSection from './components/FAQSection.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-void overflow-hidden">
        {/* base ambient background glow, sits behind everything */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,92,255,0.15),_transparent_60%)]" />

        <Navbar />
        <main className="relative">
          <Hero />
          <ProblemSection />
          <ProcessSection />
          <FeaturesSection/>
          <BenefitsSection/>
          <WhoItsFor/>
          <FAQSection/>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
