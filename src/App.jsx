import SmoothScrollWrapper from './components/layout/SmoothScrollWrapper'
import CustomCursor from './components/common/CustomCursor'
import DeveloperBackground from './components/layout/DeveloperBackground'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/sections/HeroSection'
import WorkSection from './components/sections/WorkSection'
import PlaygroundCanvas from './components/interactive/PlaygroundCanvas'
import ExperienceSection from './components/sections/ExperienceSection'
import Footer from './components/layout/Footer'

function App() {
  return (
    <SmoothScrollWrapper>
      <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#d9f99d] selection:text-black font-sans overflow-hidden">
        {/* Dynamic Contextual Cursor */}
        <CustomCursor />

        {/* Ambient IT Developer Cybernetic Background */}
        <DeveloperBackground />

        {/* Top Sticky Minimalist Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Main Content Sections */}
        <main className="relative z-10">
          {/* Editorial Hero Section */}
          <HeroSection />

          {/* Selected Works Showcase with Case Studies */}
          <WorkSection />

          {/* Interactive Physics & Mini-Game Playground Canvas */}
          <PlaygroundCanvas />

          {/* Experience, Trajectory & Core Pillars */}
          <ExperienceSection />
        </main>

        {/* Colophon & Contact Footer */}
        <Footer />
      </div>
    </SmoothScrollWrapper>
  )
}

export default App
