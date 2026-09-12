import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { personalInfo } from '../../data/portfolioData'

export default function Navbar({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-2.5 sm:py-3.5 shadow-2xl shadow-black/60'
          : 'bg-transparent py-3 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo - Compact on mobile */}
        <a
          href="#"
          className="group flex items-center gap-2 sm:gap-2.5 font-display text-sm sm:text-lg tracking-tight font-extrabold text-white"
        >
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#d9f99d] shadow-[0_0_12px_#d9f99d] group-hover:scale-125 transition-transform shrink-0" />
          <span className="tracking-widest">{personalInfo.name}</span>
        </a>

        {/* Let's Talk CTA Button - Compact on mobile */}
        <a
          href="#contact"
          onClick={onOpenContact}
          className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider text-black bg-[#d9f99d] hover:bg-white transition-all shadow-[0_0_20px_rgba(217,249,157,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 shrink-0"
        >
          <span>LET&apos;S TALK</span>
          <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </a>
      </div>
    </header>
  )
}
