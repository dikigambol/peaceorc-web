import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    // Check for user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Handle anchor links for Lenis
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const targetId = anchor.getAttribute('href')
      if (targetId === '#') {
        e.preventDefault()
        lenis.scrollTo(0, { duration: 1.2 })
      } else if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId)
        if (targetEl) {
          e.preventDefault()
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.2 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
