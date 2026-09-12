import { useEffect, useRef } from 'react'

export default function DeveloperBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // IT Developer Code Glyphs & Symbols
    const codeTokens = [
      '{ }', '</>', '01', 'fn()', 'git:main', 'const', '=>',
      'async', '0x1F', 'null', '&&', '||', '::init', '404',
      '200_OK', 'λ', 'void', 'npm:run', 'try{ }', 'ptr*', 'UTF-8'
    ]

    // Floating Cyber Particles / Code Glyphs
    const particles = []
    const count = Math.min(45, Math.floor(width / 35))

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.15, // gentle upward drift
        text: codeTokens[Math.floor(Math.random() * codeTokens.length)],
        fontSize: Math.floor(Math.random() * 5) + 11,
        opacity: Math.random() * 0.12 + 0.04,
        baseOpacity: Math.random() * 0.12 + 0.04,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? '#d9f99d' : '#38bdf8', // Acid lime & cyan
      })
    }

    // Mouse tracking for subtle cybernetic glow interaction
    let mouseX = -1000
    let mouseY = -1000
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw subtle terminal developer nodes and connecting data bus
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.pulsePhase += p.pulseSpeed

        // Wrap around borders seamlessly
        if (p.x < -60) p.x = width + 60
        if (p.x > width + 60) p.x = -60
        if (p.y < -40) p.y = height + 40
        if (p.y > height + 40) p.y = -40

        // Interactive mouse proximity glow
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.hypot(dx, dy)
        let alpha = p.baseOpacity + Math.sin(p.pulsePhase) * 0.03
        if (dist < 180) {
          alpha = Math.min(0.38, alpha + (1 - dist / 180) * 0.25)
        }

        // Connect nearby code tokens with faint data rays
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (pdist < 110) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(217, 249, 157, ${(1 - pdist / 110) * 0.04})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }

        // Render Developer Code Token
        ctx.save()
        ctx.font = `600 ${p.fontSize}px "Space Grotesk", monospace`
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0.02, alpha)
        ctx.fillText(p.text, p.x, p.y)
        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Deep Cyber Ambient Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[650px] h-[650px] bg-gradient-to-br from-[#d9f99d]/6 via-emerald-950/10 to-transparent blur-[140px] rounded-full" />
      <div className="absolute top-[40%] right-[-12%] w-[700px] h-[700px] bg-gradient-to-bl from-cyan-500/6 via-blue-950/8 to-transparent blur-[160px] rounded-full" />
      <div className="absolute bottom-[-15%] left-[20%] w-[800px] h-[600px] bg-gradient-to-tr from-purple-900/8 via-[#a855f7]/5 to-transparent blur-[180px] rounded-full" />

      {/* Floating Code Glyph Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-85" />

      {/* Ultra-subtle scanline terminal effect */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 50%, transparent 50%)',
          backgroundSize: '100% 4px',
        }}
      />
    </div>
  )
}
