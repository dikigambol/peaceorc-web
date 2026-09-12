import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Code2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { projects, projectCategories } from '../../data/portfolioData'
import TagBadge from '../common/TagBadge'

// Procedural futuristic Web Audio sound synthesizer
function playSliderSound(type = 'glitch') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') ctx.resume()
    const now = ctx.currentTime

    if (type === 'glitch') {
      // Rapid stutter frequency glitch burst
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(750, now)
      osc.frequency.setValueAtTime(320, now + 0.03)
      osc.frequency.setValueAtTime(1100, now + 0.06)
      osc.frequency.setValueAtTime(450, now + 0.09)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.15)
    } else {
      // Crisp UI navigation tick
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(900, now)
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.04)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.04)
    }
  } catch {
    // Audio optional
  }
}

export default function WorkSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [slideDirection, setSlideDirection] = useState(1) // 1 = next, -1 = prev
  const glitchTimeoutRef = useRef(null)

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  const handleCategoryChange = (cat) => {
    playSliderSound('nav')
    setActiveCategory(cat)
    setCurrentIndex(0)
  }

  const triggerGlitchTransition = useCallback((nextIndex, direction = 1) => {
    playSliderSound('glitch')
    setSlideDirection(direction)
    setIsGlitching(true)
    setCurrentIndex(nextIndex)

    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current)
    glitchTimeoutRef.current = setTimeout(() => {
      setIsGlitching(false)
    }, 220)
  }, [])

  const nextSlide = useCallback(() => {
    if (filteredProjects.length <= 1) return
    const nextIdx = (currentIndex + 1) % filteredProjects.length
    triggerGlitchTransition(nextIdx, 1)
  }, [currentIndex, filteredProjects.length, triggerGlitchTransition])

  const prevSlide = useCallback(() => {
    if (filteredProjects.length <= 1) return
    const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length
    triggerGlitchTransition(prevIdx, -1)
  }, [currentIndex, filteredProjects.length, triggerGlitchTransition])

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only react if section is in viewport
      const section = document.getElementById('works')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return

      if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current)
    }
  }, [nextSlide, prevSlide])

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0]

  // Slide animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 120 : -120,
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -120 : 120,
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 },
      },
    }),
  }

  return (
    <section id="works" className="py-14 sm:py-16 lg:py-18 px-6 sm:px-8 max-w-7xl mx-auto select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 sm:pb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d9f99d] animate-pulse" />
            <span>01 // Selected Archives</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
            Works & Systems
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-2">
          {projectCategories.map((cat) => {
            const count = cat === 'All'
              ? projects.length
              : projects.filter(p => p.category === cat).length

            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-200 border cursor-pointer ${activeCategory === cat
                    ? 'bg-[#d9f99d] text-black border-[#d9f99d] font-bold shadow-[0_0_20px_rgba(217,249,157,0.3)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                  }`}
              >
                {cat} <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Interactive Slider Container */}
      <div className="relative">
        {/* Top Controls Bar: Counter & Navigation Arrows */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-white font-bold text-base sm:text-lg tracking-tight">
              #{String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500">
              {String(filteredProjects.length).padStart(2, '0')}
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-400 hidden sm:inline">{currentProject?.client}</span>
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={prevSlide}
              onMouseEnter={() => playSliderSound('nav')}
              aria-label="Previous project"
              className="group p-2.5 sm:p-3 rounded-full border border-white/15 bg-white/5 hover:bg-[#d9f99d] hover:border-[#d9f99d] text-zinc-300 hover:text-black transition-all active:scale-90 shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              onMouseEnter={() => playSliderSound('nav')}
              aria-label="Next project"
              className="group p-2.5 sm:p-3 rounded-full border border-white/15 bg-white/5 hover:bg-[#d9f99d] hover:border-[#d9f99d] text-zinc-300 hover:text-black transition-all active:scale-90 shadow-md cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Main Slider Card Stage */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#0d0d12] p-6 sm:p-10 lg:p-14 shadow-2xl min-h-[400px] sm:min-h-[460px] flex flex-col justify-between">
          {/* Project Screenshot Background with Cyber Dark Gradients */}
          {currentProject?.image && (
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                key={currentProject.image}
                className="w-full h-full object-cover object-center opacity-25 sm:opacity-30 group-hover:opacity-40 scale-100 group-hover:scale-105 transition-all duration-700 filter brightness-90 contrast-110"
              />
              {/* Layered vignette and readability gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/85 to-[#0d0d12]/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d12] via-[#0d0d12]/80 to-transparent" />
            </div>
          )}

          {/* Ambient Accent Glow */}
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700 z-0"
            style={{ backgroundColor: currentProject?.accentColor || '#d9f99d' }}
          />

          {/* Slide Content with Directional Animation & Clean Glitch Distortion */}
          <AnimatePresence mode="wait" custom={slideDirection}>
            {currentProject && (
              <motion.div
                key={currentProject.id}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -40) nextSlide()
                  else if (offset.x > 40) prevSlide()
                }}
                className={`relative z-10 flex flex-col justify-between flex-1 transition-all duration-150 ${isGlitching
                    ? 'drop-shadow-[-4px_0_0_rgba(255,0,85,0.8)] drop-shadow-[4px_0_0_rgba(0,240,255,0.8)] translate-x-1.5'
                    : ''
                  }`}
              >
                <div>
                  {/* Top Metadata: Label & Year */}
                  <div className="flex flex-wrap items-center gap-3 pb-4 sm:pb-6 text-xs font-mono">
                    <span
                      className="px-3 py-1 rounded-full border text-xs font-semibold tracking-wider"
                      style={{
                        borderColor: `${currentProject.accentColor}50`,
                        color: currentProject.accentColor,
                        backgroundColor: `${currentProject.accentColor}15`,
                      }}
                    >
                      {currentProject.category}
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400">{currentProject.year}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400">{currentProject.client}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.05] transition-all duration-150 ${isGlitching ? 'text-[#d9f99d] translate-x-2' : ''
                      }`}
                  >
                    {currentProject.title}
                  </h3>

                  {/* Deskripsi Singkat */}
                  <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-zinc-300 font-sans leading-relaxed max-w-3xl font-light">
                    {currentProject.tagline}
                  </p>

                  {/* Stack */}
                  <div className="mt-6 sm:mt-8">
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                      <span>Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.techStack.map((tech) => (
                        <TagBadge key={tech} label={tech} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Optional Action Links: Live Preview & Repository */}
                <div className="mt-8 sm:mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3.5 sm:gap-4">
                  {currentProject.liveUrl && (
                    <a
                      href={currentProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => playSliderSound('nav')}
                      className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#d9f99d] hover:bg-white transition-all shadow-[0_0_20px_rgba(217,249,157,0.3)] hover:scale-105 active:scale-95"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}

                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => playSliderSound('nav')}
                      className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-mono text-xs font-semibold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#d9f99d]/50 transition-all hover:scale-105 active:scale-95"
                    >
                      <Code2 className="w-4 h-4 text-[#d9f99d]" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Dots / Progress Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Clickable Slide Indicators */}
          <div className="flex items-center gap-2">
            {filteredProjects.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => {
                  if (idx !== currentIndex) {
                    triggerGlitchTransition(idx, idx > currentIndex ? 1 : -1)
                  }
                }}
                onMouseEnter={() => playSliderSound('nav')}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === idx
                    ? 'w-8 sm:w-10 bg-[#d9f99d] shadow-[0_0_12px_#d9f99d]'
                    : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/50'
                  }`}
              />
            ))}
          </div>

          {/* Interactive Navigation Hint */}
          <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-2">
            <span>Use</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/15 text-[10px]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/15 text-[10px]">→</kbd>
            <span>or swipe to explore</span>
          </div>
        </div>
      </div>
    </section>
  )
}
