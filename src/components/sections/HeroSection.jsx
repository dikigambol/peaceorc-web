import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Terminal, CheckCircle2, ArrowUpRight } from 'lucide-react'
import confetti from 'canvas-confetti'


const GLYPHS = '01#@!&<>~*$_%+/[]'

const ROLES = [
  'Web Apps',
  'Mobile Apps',
  'Web3 Apps',
  'AI Systems',
  'UI/UX Design'
]

const LUCKY_JOKES = [
  {
    tag: "BUDGET VS REALITY",
    joke: "Client: 'Can you build an app like Amazon meets Uber for $500, and launch it by tomorrow morning?'",
    solution: "At Peaceorc, we avoid false promises. We engineer realistic MVP roadmaps, resilient architectures, and precise delivery timelines without runaway budgets.",
  },
  {
    tag: "BUGS & COFFEE",
    joke: "Why do programmers love coffee? Because it turns caffeine into code, and bugs into 'undocumented premium features'.",
    solution: "Tired of hidden bugs and production headaches? Peaceorc delivers clean code, automated testing, and zero runtime crashes. Drink your coffee to relax, not to panic.",
  },
  {
    tag: "WORKS ON MY MACHINE",
    joke: "'Relax, it works perfectly on my laptop!' said the developer with a proud smile, right as the production server exploded.",
    solution: "Peaceorc systems are fully containerized & cloud-ready. Guaranteed to run seamlessly on localhost or at scale serving millions worldwide.",
  },
  {
    tag: "GIT COMMIT DRAMA",
    joke: "git commit -m 'final_fix_i_swear_this_time_v4_final_real_one.js'.",
    solution: "Peaceorc implements battle-tested Git workflows and automated CI/CD pipelines. Consistent zero-downtime releases and instant rollbacks, without Friday deployment dread.",
  },
  {
    tag: "HARDWARE VS SOFTWARE",
    joke: "Q: How many software engineers does it take to change a blown lightbulb? A: None, that's clearly a hardware issue.",
    solution: "Looking for a tech partner that doesn't play the blame game? Peaceorc delivers end-to-end solutions: UI/UX, Frontend, API backends, databases, and cloud infrastructure.",
  },
  {
    tag: "BINARY REALITY",
    joke: "There are 10 types of people in the world: those who understand binary, and those who get a headache from tech jargon.",
    solution: "No need to stress over complex jargon. Tell us your business goals, and Peaceorc will engineer high-impact, user-friendly software that drives real revenue.",
  },
  {
    tag: "STACKOVERFLOW HERITAGE",
    joke: "Ctrl+C and Ctrl+V: The unsung backbone of global software engineering civilizations since 1995.",
    solution: "We don't do cookie-cutter templates. Every system is custom-crafted for 60 FPS native performance, 98+ Lighthouse scores, and unique brand impact.",
  },
]


// Playful procedural audio click synthesizer
function playTextTone(freq = 600) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  } catch {
    // Audio optional
  }
}

// Interactive Scrambling Letter
function InteractiveLetter({ char }) {
  const [displayChar, setDisplayChar] = useState(char)
  const isHovered = useRef(false)

  const handleHover = () => {
    if (char === ' ' || isHovered.current) return
    isHovered.current = true
    playTextTone(500 + Math.random() * 600)

    let count = 0
    const interval = setInterval(() => {
      setDisplayChar(GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
      count++
      if (count > 5) {
        clearInterval(interval)
        setDisplayChar(char)
        isHovered.current = false
      }
    }, 35)
  }

  if (char === ' ') {
    return <span className="inline-block w-2 sm:w-3">&nbsp;</span>
  }

  return (
    <span
      onMouseEnter={handleHover}
      className="inline-block transition-all duration-150 hover:-translate-y-2 hover:scale-110 hover:text-[#d9f99d] hover:drop-shadow-[0_0_15px_rgba(217,249,157,0.8)] cursor-pointer select-none"
    >
      {displayChar}
    </span>
  )
}

// Phrase or word consisting of interactive letters with responsive word wrapping
function InteractivePhrase({ text, className = '', suffix = null }) {
  const words = text.split(' ')
  return (
    <span className={`inline-flex flex-wrap items-center gap-x-2 sm:gap-x-4 ${className}`}>
      {words.map((word, wIdx) => {
        const isLast = wIdx === words.length - 1
        return (
          <span key={`${word}-${wIdx}`} className="inline-flex items-center flex-nowrap whitespace-nowrap">
            {word.split('').map((c, cIdx) => (
              <InteractiveLetter key={`${word}-${cIdx}`} char={c} />
            ))}
            {isLast && suffix}
          </span>
        )
      })}
    </span>
  )
}

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [scramblingRole, setScramblingRole] = useState(ROLES[0])
  const [activeJoke, setActiveJoke] = useState(null)
  const roleIntervalRef = useRef(null)

  const triggerRoleCycle = useCallback(() => {
    const nextIndex = (roleIndex + 1) % ROLES.length
    setRoleIndex(nextIndex)
    const targetWord = ROLES[nextIndex]

    playTextTone(800)
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.35, x: 0.5 },
      colors: ['#d9f99d', '#38bdf8', '#ffffff'],
    })

    let step = 0
    clearInterval(roleIntervalRef.current)
    roleIntervalRef.current = setInterval(() => {
      setScramblingRole(
        targetWord
          .split('')
          .map((c, i) => {
            if (i < step) return targetWord[i]
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )
      playTextTone(400 + step * 60)
      step += 0.7
      if (step >= targetWord.length) {
        clearInterval(roleIntervalRef.current)
        setScramblingRole(targetWord)
      }
    }, 40)
  }, [roleIndex])

  const handleLuckyJokeClick = () => {
    playTextTone(900)
    confetti({
      particleCount: 35,
      spread: 65,
      origin: { y: 0.45, x: 0.5 },
      colors: ['#d9f99d', '#38bdf8', '#f43f5e', '#ffffff'],
    })

    // Pick random joke different from current
    let nextJoke = LUCKY_JOKES[Math.floor(Math.random() * LUCKY_JOKES.length)]
    if (activeJoke && LUCKY_JOKES.length > 1) {
      const remaining = LUCKY_JOKES.filter(j => j.joke !== activeJoke.joke)
      nextJoke = remaining[Math.floor(Math.random() * remaining.length)]
    }
    setActiveJoke(nextJoke)

    // Also cycle the role dynamically
    triggerRoleCycle()
  }

  useEffect(() => {
    return () => clearInterval(roleIntervalRef.current)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] lg:h-[100dvh] flex flex-col justify-center items-center pt-14 sm:pt-16 pb-6 px-6 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#d9f99d]/10 via-[#a855f7]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Content Lockup - Overall centered in screen with wide horizontal breathing room */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl flex flex-col items-start my-auto z-10"
      >
        {/* Headline Group */}
        <div className="space-y-1 w-full">
          {/* Row 1: DEVELOP */}
          <div className="overflow-hidden">
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight text-white leading-[0.96]"
            >
              <InteractivePhrase text="Develop" />
            </motion.h1>
          </div>

          {/* Row 2: DYNAMIC RECOMPILABLE ROLE */}
          <div className="overflow-hidden">
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold uppercase tracking-tight text-zinc-400 hover:text-white transition-colors leading-[0.96] flex flex-wrap items-center"
            >
              <span
                onClick={triggerRoleCycle}
                className="cursor-pointer group inline-flex items-center hover:text-[#d9f99d] transition-colors"
                title="Click to cycle role!"
              >
                <InteractivePhrase
                  text={scramblingRole}
                  suffix={
                    <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ml-2 sm:ml-3 rounded-full bg-[#d9f99d] inline-block group-hover:scale-150 transition-transform animate-pulse shrink-0 self-center" />
                  }
                />
              </span>
            </motion.h1>
          </div>

          {/* BADGE "I'M LUCKY PLEASE" POSITIONED CLEANLY BELOW ROLE TEXT */}
          <motion.div variants={itemVariants} className="pt-2 pb-1 flex items-center">
            <button
              type="button"
              onClick={handleLuckyJokeClick}
              className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d9f99d]/30 hover:border-[#d9f99d] bg-[#d9f99d]/10 hover:bg-[#d9f99d] text-xs font-mono font-semibold text-[#d9f99d] hover:text-black tracking-wider cursor-pointer transition-all active:scale-95 shadow-[0_0_15px_rgba(217,249,157,0.15)] hover:shadow-[0_0_25px_rgba(217,249,157,0.4)]"
              title="Just click me buddy!"
            >
              <span>Roll Dice Please 🎲</span>
            </button>
          </motion.div>

          {/* Row 3: & ANYTHING */}
          <div className="overflow-hidden pt-1">
            <motion.h1
              variants={itemVariants}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-[#d9f99d] leading-[1.02]"
            >
              <InteractivePhrase text="& anything" />
            </motion.h1>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-4 sm:mt-6 max-w-3xl lg:max-w-4xl overflow-hidden">
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 font-sans leading-relaxed font-light"
          >
            Designing <span className="text-white font-medium">brands with high-performance software</span>, <span className="text-white font-medium">robust systems</span>, and strategic technology consulting.
          </motion.p>
        </div>

        {/* Action CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <a
            href="#works"
            className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-mono text-xs font-bold uppercase tracking-widest text-black bg-[#d9f99d] hover:bg-white transition-all shadow-[0_0_30px_rgba(217,249,157,0.3)] hover:scale-105 active:scale-95"
          >
            <span>Explore Works</span>
            <span className="w-2 h-2 rounded-full bg-black group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-mono text-xs font-semibold uppercase tracking-widest text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#d9f99d]/50 transition-all hover:scale-105 active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#d9f99d]" />
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Indicator at Bottom Center */}
      <motion.a
        href="#works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-xs font-mono text-zinc-500 hover:text-[#d9f99d] transition-colors group cursor-pointer select-none z-10"
      >
        <span className="uppercase tracking-widest text-[10px] sm:text-[11px]">Scroll To Discover</span>
        <div className="w-4 h-6 sm:w-5 sm:h-7 rounded-full border border-white/20 group-hover:border-[#d9f99d] flex items-start justify-center p-1 transition-colors">
          <span className="w-1 h-1.5 rounded-full bg-[#d9f99d] animate-bounce" />
        </div>
      </motion.a>

      {/* INTERACTIVE "I'M LUCKY" IT JOKE & PEACEORC SOLUTION MODAL */}
      <AnimatePresence>
        {activeJoke && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJoke(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg glass-panel rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveJoke(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tag Header */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase mb-4">
                <Terminal className="w-4 h-4 text-[#d9f99d]" />
                <span>DEV REAL TALK // {activeJoke.tag}</span>
              </div>

              {/* The Funny IT Joke */}
              <div className="p-4 rounded-xl bg-[#0e0e12] border border-white/10 mb-5 relative">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  <span className="text-[10px] font-mono text-zinc-500 ml-2">joke_output.log</span>
                </div>
                <p className="font-mono text-sm sm:text-base text-zinc-200 leading-relaxed italic">
                  &ldquo;{activeJoke.joke}&rdquo;
                </p>
              </div>

              {/* The Peaceorc IT Solution */}
              <div className="p-4 rounded-xl bg-[#d9f99d]/10 border border-[#d9f99d]/30 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#d9f99d] tracking-wider uppercase">
                    Peaceorc Engineering Solution:
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {activeJoke.solution}
                </p>
              </div>

              {/* Dialog Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleLuckyJokeClick}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d9f99d] text-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(217,249,157,0.3)]"
                >
                  <span>Roll Again 🎲</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => setActiveJoke(null)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d9f99d]" />
                  <span>Consult Project &rarr;</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
