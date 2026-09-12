import { useState } from 'react'
import { Terminal, Sparkles, ExternalLink, Cpu, Compass } from 'lucide-react'
import confetti from 'canvas-confetti'
import { teamMembers } from '../../data/portfolioData'

// Procedural audio synth for interactive clicks
function playDuoTone(freq = 600) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.1)
  } catch {
    // Audio optional
  }
}

export default function ExperienceSection() {
  const [hoveredMember, setHoveredMember] = useState(null)
  const [synergyActive, setSynergyActive] = useState(false)

  const member1 = teamMembers[0]
  const member2 = teamMembers[1]

  const triggerSynergyBlast = () => {
    setSynergyActive(true)
    playDuoTone(900)
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#d9f99d', '#a855f7', '#38bdf8', '#ffffff'],
    })
    setTimeout(() => setSynergyActive(false), 2000)
  }

  const workflowSteps = [
    {
      num: "01",
      title: "Zero-Friction Prototyping",
      spec: "Tokenized Figma Sync + Live Interactive Canvas",
      role1: `${member1?.name || 'Diki'}: Spatial Layout & Physics Engine`,
      role2: `${member2?.name || 'Ridho'}: Core UX Architecture & Atomic Tokens`,
    },
    {
      num: "02",
      title: "Symmetric Full-Stack Build",
      spec: "Double Velocity Without Handover Silos",
      role1: `${member1?.name || 'Diki'}: Systems Scalability & Real-Time Sync`,
      role2: `${member2?.name || 'Ridho'}: High-Conversion UI & Edge API Logic`,
    },
    {
      num: "03",
      title: "Turnkey Production Ship",
      spec: "Zero-Crash Resiliency + Pixel-Perfect Polish",
      role1: `${member1?.name || 'Diki'}: Automated CI/CD & Performance Auditing`,
      role2: `${member2?.name || 'Ridho'}: WCAG AAA Accessibility & Conversion QA`,
    },
  ]

  return (
    <section id="experience" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header: Bold & Editorial */}
      <div className="pb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase mb-4">
            <Cpu className="w-4 h-4 text-[#d9f99d]" />
            <span>03 // Dual Hybrid Engineers</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
            The Hybrid Duo
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
            Both of us code. Both of us design. Zero lost-in-translation handover, zero bloated agency overhead—just two hybrid creative technologists shipping high-impact products from sketch to scale.
          </p>
        </div>
      </div>

      {/* Non-Card Editorial Split: Two Symmetrical Intellectual Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative">
        {/* Interactive Clickable Central Data Ray Connector (Desktop) */}
        <div
          onClick={triggerSynergyBlast}
          className="hidden lg:flex items-center justify-center absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-10 cursor-pointer group/line z-10"
          title="Click to ignite duo synergy ⚡"
        >
          <div
            className={`w-[1.5px] h-full transition-all duration-500 rounded-full ${
              synergyActive
                ? 'bg-gradient-to-b from-[#d9f99d] via-white to-[#a855f7] shadow-[0_0_20px_#d9f99d,0_0_35px_#a855f7]'
                : 'bg-white/10 group-hover/line:bg-white/40 group-hover/line:shadow-[0_0_10px_rgba(255,255,255,0.3)]'
            }`}
          />
        </div>

        {/* PILLAR 1: (HYBRID DESIGN ENGINEER) */}
        <div
          onMouseEnter={() => setHoveredMember(member1.id)}
          onMouseLeave={() => setHoveredMember(null)}
          className={`space-y-6 transition-opacity duration-300 ${hoveredMember === member2.id ? 'opacity-60' : 'opacity-100'}`}
        >
          {/* Top Tag & Live Indicator */}
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-mono tracking-widest text-[#d9f99d] uppercase">
              {member1.tag}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{member1.status}</span>
            </div>
          </div>

          {/* Huge Editorial Name & Title */}
          <div>
            <h3 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white hover:text-[#d9f99d] transition-colors cursor-pointer select-none">
              {member1.name}
            </h3>
            <p className="font-mono text-sm sm:text-base text-zinc-400 mt-1">
              {member1.title} <span className="text-zinc-600">•</span> {member1.role}
            </p>
          </div>

          {/* Terminal Command Line Snippet */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-white/5 font-mono text-xs text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#d9f99d]" />
              <span className="text-zinc-300">{member1.terminalPrompt}</span>
            </div>
            <span className="text-[10px] text-emerald-400 hidden sm:inline">[60 FPS ACTIVE]</span>
          </div>

          {/* Bio & Narrative */}
          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed font-light">
            {member1.bio}
          </p>

          {/* Direct Quote */}
          <div className="border-l-2 border-[#d9f99d] pl-4 py-1 italic font-sans text-sm text-zinc-400">
            &ldquo;{member1.quote}&rdquo;
          </div>

          {/* Minimal Profile Link */}
          <div className="pt-2">
            <a
              href={member1.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#d9f99d] transition-colors"
            >
              <span>GitHub / {member1.name.toLowerCase()}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* PILLAR 2: (HYBRID DESIGN ENGINEER) */}
        <div
          onMouseEnter={() => setHoveredMember(member2.id)}
          onMouseLeave={() => setHoveredMember(null)}
          className={`space-y-6 transition-opacity duration-300 ${hoveredMember === member1.id ? 'opacity-60' : 'opacity-100'}`}
        >
          {/* Top Tag & Live Indicator */}
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-mono tracking-widest text-[#a855f7] uppercase">
              {member2.tag}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>{member2.status}</span>
            </div>
          </div>

          {/* Huge Editorial Name & Title */}
          <div>
            <h3 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white hover:text-[#a855f7] transition-colors cursor-pointer select-none">
              {member2.name}
            </h3>
            <p className="font-mono text-sm sm:text-base text-zinc-400 mt-1">
              {member2.title} <span className="text-zinc-600">•</span> {member2.role}
            </p>
          </div>

          {/* Terminal Command Line Snippet */}
          <div className="p-4 rounded-xl bg-[#09090b] border border-white/5 font-mono text-xs text-zinc-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#a855f7]" />
              <span className="text-zinc-300">{member2.terminalPrompt}</span>
            </div>
            <span className="text-[10px] text-purple-400 hidden sm:inline">[WCAG AAA]</span>
          </div>

          {/* Bio & Narrative */}
          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed font-light">
            {member2.bio}
          </p>

          {/* Direct Quote */}
          <div className="border-l-2 border-[#a855f7] pl-4 py-1 italic font-sans text-sm text-zinc-400">
            &ldquo;{member2.quote}&rdquo;
          </div>

          {/* Minimal Profile Link */}
          <div className="pt-2">
            <a
              href={member2.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#a855f7] transition-colors"
            >
              <span>GitHub / {member2.name.toLowerCase()}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Duo Collaborative Blueprint (Timeline Without Cards) */}
      <div className="mt-12 pt-6">

        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-[#d9f99d]" />
            <span>How The Duo Builds With You</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            From Blueprint to Launch in 2-4 Weeks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="space-y-4 group cursor-pointer"
              onClick={() => playDuoTone(500 + idx * 150)}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-[#d9f99d]">
                  {step.num} //
                </span>
                <h4 className="font-display text-xl font-bold text-white group-hover:text-[#d9f99d] transition-colors">
                  {step.title}
                </h4>
              </div>

              <p className="text-xs font-mono text-zinc-400 tracking-wider">
                {step.spec}
              </p>

              <div className="space-y-1.5 text-xs font-sans text-zinc-400 pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d9f99d]" />
                  <span>{step.role1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                  <span>{step.role2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
