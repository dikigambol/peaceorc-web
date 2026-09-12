import { useEffect, useRef, useState, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { RotateCcw, Volume2, VolumeX, Sparkles, Crosshair, Move, Zap } from 'lucide-react'
import { playgroundPhysicsBadges } from '../../data/portfolioData'

// Web Audio API procedural sound generator (Zero external MP3 dependencies)
class SoundEngine {
  constructor() {
    this.ctx = null
    this.enabled = true
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  playPop(freq = 440) {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.08)
  }

  playBreak() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(880, this.ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.15)

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start()
    osc.stop(this.ctx.currentTime + 0.15)
  }
}

const sounds = new SoundEngine()

export default function PlaygroundCanvas() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  const [mode, setMode] = useState('badges') // 'badges' | 'breakdown'
  const [gravityEnabled, setGravityEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [score, setScore] = useState(0)
  const [fps, setFps] = useState(60)

  // References for physics loop
  const stateRef = useRef({
    width: 800,
    height: 480,
    dpr: 1,
    mouse: { x: -1000, y: -1000, isDown: false, prevX: 0, prevY: 0, vx: 0, vy: 0 },
    draggedBadge: null,
    badges: [],
    targets: [],
    balls: [],
    particles: [],
    gravity: 0,
    score: 0,
    frameCount: 0,
    lastFpsUpdate: 0,
  })

  // Initialize Badges for Mode 1
  const initBadges = useCallback((w, h) => {
    return playgroundPhysicsBadges.map((badge, idx) => {
      const radius = 32 + (badge.label.length * 3.5)
      const angle = (idx / playgroundPhysicsBadges.length) * Math.PI * 2
      const cx = w / 2 + Math.cos(angle) * (w * 0.35)
      const cy = h / 2 + Math.sin(angle) * (h * 0.28)

      return {
        id: `badge-${idx}`,
        label: badge.label,
        category: badge.category,
        color: badge.color,
        x: Math.max(radius, Math.min(w - radius, cx)),
        y: Math.max(radius, Math.min(h - radius, cy)),
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        radius: radius,
        mass: radius * 0.8,
        isHovered: false,
      }
    })
  }, [])

  // Initialize Targets for Mode 2 (Target Breakdown)
  const initTargets = useCallback((w) => {
    const targets = []
    const cols = Math.min(12, Math.max(5, Math.floor(w / 120)))

    const rows = 4
    const blockWidth = (w - (cols + 1) * 16) / cols
    const blockHeight = 36
    const colors = ['#d9f99d', '#38bdf8', '#a855f7', '#f43f5e', '#fbbf24']

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 16 + c * (blockWidth + 16)
        const y = 30 + r * (blockHeight + 14)
        targets.push({
          id: `target-${r}-${c}`,
          x,
          y,
          width: blockWidth,
          height: blockHeight,
          color: colors[(r + c) % colors.length],
          points: (rows - r) * 100,
          label: ['PERF', '60FPS', 'LENIS', 'REACT', 'GLSL', 'VITE', 'MOTION', 'CANVAS', 'DESIGN', 'SYSTEMS', 'EDGE', 'TOKENS'][c % 12],
          alive: true,
        })
      }
    }
    return targets
  }, [])

  // Sound toggle
  const toggleSound = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    sounds.enabled = next
  }

  // Reset current playground
  const handleReset = () => {
    const s = stateRef.current
    s.score = 0
    setScore(0)
    s.particles = []
    s.balls = []
    if (mode === 'badges') {
      s.badges = initBadges(s.width, s.height)
    } else {
      s.targets = initTargets(s.width, s.height)
    }
    sounds.playPop(520)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const container = containerRef.current

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.floor(rect.width) || window.innerWidth
      const h = Math.floor(rect.height) || 540

      stateRef.current.width = w
      stateRef.current.height = h
      stateRef.current.dpr = dpr

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)

      // Re-populate objects
      stateRef.current.badges = initBadges(w, h)
      stateRef.current.targets = initTargets(w, h)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    let animationFrameId
    const s = stateRef.current

    // Physics & Render Loop
    const loop = (timestamp) => {
      // Calculate FPS
      s.frameCount++
      if (timestamp - s.lastFpsUpdate >= 500) {
        setFps(Math.round((s.frameCount * 1000) / (timestamp - s.lastFpsUpdate)))
        s.frameCount = 0
        s.lastFpsUpdate = timestamp
      }

      const w = s.width
      const h = s.height

      ctx.clearRect(0, 0, w, h)


      // ----------------------------------------------------
      // MODE 1: FLOATING BADGES PHYSICS
      // ----------------------------------------------------
      if (mode === 'badges') {
        const gravity = gravityEnabled ? 0.35 : 0
        const badges = s.badges

        // Mouse repulsion / drag physics
        badges.forEach((b) => {
          if (b === s.draggedBadge) {
            // Dragged by mouse
            b.x = s.mouse.x
            b.y = s.mouse.y
            b.vx = s.mouse.vx * 0.8
            b.vy = s.mouse.vy * 0.8
          } else {
            // Natural inertia & gravity
            b.vy += gravity
            b.x += b.vx
            b.y += b.vy

            // Damping / air friction
            b.vx *= 0.985
            b.vy *= 0.985

            // Mouse repulsion field (gentle push on hover)
            const dx = b.x - s.mouse.x
            const dy = b.y - s.mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < b.radius + 60 && dist > 0) {
              const force = (1 - dist / (b.radius + 60)) * 2.2
              b.vx += (dx / dist) * force
              b.vy += (dy / dist) * force
            }

            // Wall collisions with rebound restitution
            const bounce = 0.75
            if (b.x - b.radius < 0) {
              b.x = b.radius
              b.vx = -b.vx * bounce
            } else if (b.x + b.radius > w) {
              b.x = w - b.radius
              b.vx = -b.vx * bounce
            }
            if (b.y - b.radius < 0) {
              b.y = b.radius
              b.vy = -b.vy * bounce
            } else if (b.y + b.radius > h) {
              b.y = h - b.radius
              b.vy = -b.vy * bounce
            }
          }
        })

        // Badge-to-Badge Collisions
        for (let i = 0; i < badges.length; i++) {
          for (let j = i + 1; j < badges.length; j++) {
            const b1 = badges[i]
            const b2 = badges[j]
            const dx = b2.x - b1.x
            const dy = b2.y - b1.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const minDist = b1.radius + b2.radius

            if (dist < minDist && dist > 0) {
              // Normal and tangent
              const nx = dx / dist
              const ny = dy / dist
              const overlap = minDist - dist

              // Separate bodies
              if (b1 !== s.draggedBadge && b2 !== s.draggedBadge) {
                b1.x -= nx * overlap * 0.5
                b1.y -= ny * overlap * 0.5
                b2.x += nx * overlap * 0.5
                b2.y += ny * overlap * 0.5
              }

              // Elastic impulse response
              const kx = b1.vx - b2.vx
              const ky = b1.vy - b2.vy
              const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass)

              if (b1 !== s.draggedBadge) {
                b1.vx -= p * b2.mass * nx * 0.8
                b1.vy -= p * b2.mass * ny * 0.8
              }
              if (b2 !== s.draggedBadge) {
                b2.vx += p * b1.mass * nx * 0.8
                b2.vy += p * b1.mass * ny * 0.8
              }

              if (Math.abs(p) > 0.8) {
                sounds.playPop(300 + Math.min(400, Math.floor(dist * 2)))
              }
            }
          }
        }

        // Render Badges
        badges.forEach((b) => {
          const isHovered = Math.hypot(b.x - s.mouse.x, b.y - s.mouse.y) < b.radius

          ctx.save()
          ctx.translate(b.x, b.y)

          // Outer Glow
          if (isHovered || b === s.draggedBadge) {
            ctx.shadowColor = b.color
            ctx.shadowBlur = 18
          }

          // Badge pill container
          ctx.beginPath()
          ctx.arc(0, 0, b.radius, 0, Math.PI * 2)
          ctx.fillStyle = isHovered ? 'rgba(255, 255, 255, 0.12)' : 'rgba(17, 17, 21, 0.85)'
          ctx.fill()

          ctx.lineWidth = isHovered ? 2 : 1
          ctx.strokeStyle = isHovered ? b.color : 'rgba(255, 255, 255, 0.15)'
          ctx.stroke()

          // Inner accent circle
          ctx.beginPath()
          ctx.arc(0, 0, b.radius - 4, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
          ctx.stroke()

          // Text Label
          ctx.shadowBlur = 0
          ctx.font = '600 12px "Space Grotesk", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = isHovered ? '#ffffff' : '#e4e4e7'
          ctx.fillText(b.label, 0, -2)

          // Category mini label
          ctx.font = '500 8px monospace'
          ctx.fillStyle = b.color
          ctx.fillText(b.category.toUpperCase(), 0, 12)

          ctx.restore()
        })
      }

      // ----------------------------------------------------
      // MODE 2: TARGET BREAKDOWN MINI-GAME
      // ----------------------------------------------------
      if (mode === 'breakdown') {
        // Draw Targets
        let activeTargetsCount = 0
        s.targets.forEach((t) => {
          if (!t.alive) return
          activeTargetsCount++

          ctx.save()
          ctx.beginPath()
          ctx.roundRect(t.x, t.y, t.width, t.height, 8)
          ctx.fillStyle = 'rgba(17, 17, 21, 0.9)'
          ctx.fill()
          ctx.lineWidth = 1
          ctx.strokeStyle = t.color
          ctx.stroke()

          // Corner accent
          ctx.fillStyle = t.color
          ctx.fillRect(t.x + 3, t.y + 3, 4, 4)

          // Target Label
          ctx.font = '700 11px "Space Grotesk", monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#ffffff'
          ctx.fillText(t.label, t.x + t.width / 2, t.y + t.height / 2)

          ctx.restore()
        })

        // Check if all targets cleared!
        if (activeTargetsCount === 0 && s.targets.length > 0) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          })
          sounds.playBreak()
          s.targets = initTargets(w, h)
        }

        // Aim Line from Bottom Center to Mouse
        const cannonX = w / 2
        const cannonY = h - 20
        ctx.save()
        ctx.setLineDash([4, 6])
        ctx.strokeStyle = 'rgba(217, 249, 157, 0.4)'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(cannonX, cannonY)
        ctx.lineTo(s.mouse.x, s.mouse.y)
        ctx.stroke()
        ctx.restore()

        // Cannon Launcher Base
        ctx.save()
        ctx.beginPath()
        ctx.arc(cannonX, cannonY, 16, Math.PI, 0)
        ctx.fillStyle = '#d9f99d'
        ctx.fill()
        ctx.restore()

        // Physics Balls
        for (let i = s.balls.length - 1; i >= 0; i--) {
          const ball = s.balls[i]
          ball.x += ball.vx
          ball.y += ball.vy
          ball.vy += 0.04 // Lightweight agile gravity so it reaches bricks effortlessly
          ball.life--

          // Ball Bounce on Walls
          if (ball.x - ball.radius < 0) {
            ball.x = ball.radius
            ball.vx = -ball.vx * 0.85
            sounds.playPop(480)
          } else if (ball.x + ball.radius > w) {
            ball.x = w - ball.radius
            ball.vx = -ball.vx * 0.85
            sounds.playPop(480)
          }
          if (ball.y - ball.radius < 0) {
            ball.y = ball.radius
            ball.vy = -ball.vy * 0.85
            sounds.playPop(480)
          }

          // Ball Collision with Targets
          s.targets.forEach((t) => {
            if (!t.alive) return
            if (
              ball.x + ball.radius > t.x &&
              ball.x - ball.radius < t.x + t.width &&
              ball.y + ball.radius > t.y &&
              ball.y - ball.radius < t.y + t.height
            ) {
              t.alive = false
              ball.vy = -ball.vy * 0.9
              s.score += t.points
              setScore(s.score)
              sounds.playBreak()

              // Spawn particles on explosion
              for (let p = 0; p < 12; p++) {
                s.particles.push({
                  x: t.x + t.width / 2,
                  y: t.y + t.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  color: t.color,
                  radius: Math.random() * 3 + 1,
                  life: 30,
                })
              }
            }
          })

          // Draw Ball
          ctx.save()
          ctx.beginPath()
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = '#d9f99d'
          ctx.shadowBlur = 10
          ctx.fill()
          ctx.restore()

          // Remove dead balls
          if (ball.life <= 0 || ball.y > h + 50) {
            s.balls.splice(i, 1)
          }
        }
      }

      // Render & Update Particles (Explosion fragments)
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.life--

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life / 30
        ctx.fill()
        ctx.restore()

        if (p.life <= 0) {
          s.particles.splice(i, 1)
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    // Pointer Event Listeners
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

      const mx = clientX - rect.left
      const my = clientY - rect.top

      s.mouse.vx = mx - s.mouse.prevX
      s.mouse.vy = my - s.mouse.prevY
      s.mouse.prevX = mx
      s.mouse.prevY = my
      s.mouse.x = mx
      s.mouse.y = my
    }

    const handlePointerDown = (e) => {
      handlePointerMove(e)
      s.mouse.isDown = true

      if (mode === 'badges') {
        // Check if a badge was clicked
        const clicked = s.badges.find(
          (b) => Math.hypot(b.x - s.mouse.x, b.y - s.mouse.y) < b.radius
        )
        if (clicked) {
          s.draggedBadge = clicked
          sounds.playPop(600)
        }
      } else if (mode === 'breakdown') {
        // Fire Cannon projectile toward mouse cursor!
        const cannonX = s.width / 2
        const cannonY = s.height - 20
        const dx = s.mouse.x - cannonX
        const dy = s.mouse.y - cannonY
        const dist = Math.hypot(dx, dy) || 1
        const speed = 22 // High-velocity responsive blaster

        s.balls.push({
          x: cannonX,
          y: cannonY,
          vx: (dx / dist) * speed,
          vy: (dy / dist) * speed,
          radius: 7,
          life: 260,
        })
        sounds.playPop(750)
      }
    }

    const handlePointerUp = () => {
      s.mouse.isDown = false
      if (s.draggedBadge) {
        s.draggedBadge.vx = s.mouse.vx * 0.9
        s.draggedBadge.vy = s.mouse.vy * 0.9
        s.draggedBadge = null
      }
    }

    const handlePointerLeave = () => {
      s.mouse.x = -1000
      s.mouse.y = -1000
      s.draggedBadge = null
    }

    canvas.addEventListener('mousemove', handlePointerMove)
    canvas.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)
    canvas.addEventListener('mouseleave', handlePointerLeave)

    // Touch Support
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true })
    canvas.addEventListener('touchstart', handlePointerDown, { passive: true })
    canvas.addEventListener('touchend', handlePointerUp)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('mousemove', handlePointerMove)
      canvas.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      canvas.removeEventListener('mouseleave', handlePointerLeave)
      canvas.removeEventListener('touchmove', handlePointerMove)
      canvas.removeEventListener('touchstart', handlePointerDown)
      canvas.removeEventListener('touchend', handlePointerUp)
    }
  }, [mode, gravityEnabled, initBadges, initTargets])

  return (
    <section id="playground" className="py-24 w-full relative overflow-hidden">
      {/* Section Header & Minimal HUD Controls */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase mb-3">
              <Sparkles className="w-4 h-4 text-[#d9f99d]" />
              <span>02 // Interactive Laboratory</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white">
              Physics &amp; Canvas
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans max-w-xl">
              Real-time spring physics, boundary collisions, and tactile canvas rendering built directly from browser primitives.
            </p>
          </div>

          {/* Quick HUD Toolbar Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => {
                  setMode('badges')
                  handleReset()
                }}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  mode === 'badges'
                    ? 'bg-[#d9f99d] text-black font-bold shadow-[0_0_15px_rgba(217,249,157,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Move className="w-3.5 h-3.5" />
                <span>Floating Badges</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('breakdown')
                  handleReset()
                }}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  mode === 'breakdown'
                    ? 'bg-[#d9f99d] text-black font-bold shadow-[0_0_15px_rgba(217,249,157,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>Target Breakdown</span>
              </button>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-mono text-[#d9f99d] bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
                <Zap className="w-3.5 h-3.5" />
                <span>{fps} FPS</span>
              </span>

              {mode === 'breakdown' && (
                <span className="text-xs font-mono text-white bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
                  SCORE: <span className="text-[#d9f99d] font-bold">{score}</span>
                </span>
              )}

              {mode === 'badges' && (
                <button
                  type="button"
                  onClick={() => setGravityEnabled(!gravityEnabled)}
                  className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-colors cursor-pointer ${
                    gravityEnabled
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {gravityEnabled ? 'EARTH 9.8m/s²' : 'ZERO-G'}
                </button>
              )}

              <button
                type="button"
                onClick={toggleSound}
                className="p-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#d9f99d]" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-white/25 text-xs font-mono transition-colors cursor-pointer"
                title="Reset state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Bleed Borderless Canvas (Completely Unboxed, Spanning Full Screen) */}
      <div
        ref={containerRef}
        className="relative w-full h-[520px] md:h-[620px] select-none touch-none overflow-hidden"
        data-cursor-drag={mode === 'badges' ? 'true' : undefined}
        data-cursor-break={mode === 'breakdown' ? 'true' : undefined}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* Ambient Hint Badge (Positioned Cleanly Below Canvas - Never Overlaps Content) */}
      <div className="mt-4 flex justify-center px-6">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-white/[0.03] px-4 py-1.5 rounded-full border border-white/5 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d9f99d] animate-pulse" />
          <span>
            {mode === 'badges'
              ? 'Drag or toss badges anywhere across the screen • Repulsion force active'
              : 'Click anywhere across the canvas to aim and shoot projectiles!'}
          </span>
        </div>
      </div>
    </section>
  )
}
