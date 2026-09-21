import { useState } from 'react'
import { Terminal, Sparkles, ExternalLink, Cpu, Palette, Code2, Heart, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { teamMembers } from '../../data/portfolioData'

// Procedural audio synth for interactive clicks
function playAudioSynth(freq = 600) {
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
  const member = teamMembers[0] || {
    id: "diki",
    tag: "01 // CREATIVE DEVELOPER & ARCHITECT",
    name: "Diki",
    avatar: "/devs/diki.jpg",
    title: "Design Engineer & Systems Architect",
    role: "Creative Code, 3D Physics & UI/UX Architecture",
    accentColor: "#d9f99d",
    status: "Designing & Coding in Real-Time",
    bio: "Fluidly bridges Figma prototypes with production code. Obsessed with 60 FPS physics engines, spatial interaction design, and resilient backend micro-architectures.",
    quote: "Design without code is just a still picture; code without design is just machine logic. I fuse both without compromise.",
    terminalPrompt: "peaceorc@core:~$ figma-tokens sync && cargo build --release",
    designStack: ["Figma Systems", "3D / Spatial UI", "Interaction Specs", "Design Tokens"],
    codeStack: ["React 19", "Three.js / WebGL", "Rust & Go", "Docker", "Tailwind CSS"],
    social: { github: "https://github.com/peaceorc", x: "https://x.com/peaceorc" },
    initialHighFives: 218,
  }

  const [highFives, setHighFives] = useState(member.initialHighFives || 218)
  const [pipelineActive, setPipelineActive] = useState(false)

  const triggerPipelineBlast = () => {
    setPipelineActive(true)
    playAudioSynth(880)
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#d9f99d', '#38bdf8', '#ffffff', '#a855f7'],
    })
    setTimeout(() => setPipelineActive(false), 2000)
  }

  const handleHighFive = () => {
    setHighFives((prev) => prev + 1)
    playAudioSynth(750)
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7, x: 0.8 },
      colors: ['#d9f99d', '#ffffff'],
    })
  }

  const workflowSteps = [
    {
      num: "01",
      title: "Zero-Friction Prototyping",
      spec: "Tokenized Figma Sync + Live Interactive Canvas",
      detail: "Direct translation from architectural wireframes into functional canvas prototypes without static handover lag.",
    },
    {
      num: "02",
      title: "End-to-End Full-Stack Build",
      spec: "Direct Velocity Without Handover Silos",
      detail: "Tactile React/WebGL frontend and resilient micro-services engineered simultaneously by the same hands.",
    },
    {
      num: "03",
      title: "Turnkey Production Ship",
      spec: "Zero-Crash Resiliency + Pixel-Perfect Polish",
      detail: "Automated CI/CD pipelines, strict 60 FPS performance audits, and WCAG AAA accessibility standards.",
    },
  ]

  return (
    <section id="experience" className="py-14 sm:py-16 lg:py-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header: Bold & Editorial */}
      <div className="pb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase mb-4">
            <Cpu className="w-4 h-4 text-[#d9f99d]" />
            <span>03 // Meet The Dev</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
            Meet The Dev
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-sans leading-relaxed">
            I design. I code. Zero lost-in-translation handover, zero bloated agency overhead—just one direct, full-cycle creative technologist shipping high-impact products from sketch to scale.
          </p>
        </div>
      </div>

      {/* Main Profile Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Core Identity & Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Tag & Live Indicator */}
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-mono tracking-widest text-[#d9f99d] uppercase">
              {member.tag}
            </span>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{member.status}</span>
            </div>
          </div>

          {/* Huge Editorial Name & Title with Small Photo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative shrink-0 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-[#d9f99d] transition-all duration-300 shadow-xl shadow-black/50 bg-[#18181b]">
                <img
                  src={member.avatar || "/devs/diki.jpg"}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#09090b] shadow-[0_0_8px_#10b981]" title="Online" />
            </div>

            <div>
              <h3 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white hover:text-[#d9f99d] transition-colors select-none leading-none">
                {member.name}
              </h3>
              <p className="font-mono text-sm sm:text-base text-zinc-400 mt-2">
                {member.title} <span className="text-zinc-600">•</span> {member.role}
              </p>
            </div>
          </div>

          {/* Interactive Terminal Command Line Snippet */}
          <div 
            onClick={triggerPipelineBlast}
            className="p-4 rounded-xl bg-[#09090b] border border-white/10 hover:border-[#d9f99d]/40 transition-all font-mono text-xs text-zinc-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group shadow-lg shadow-black/40"
            title="Click to execute build pipeline ⚡"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Terminal className="w-4 h-4 text-[#d9f99d] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-zinc-300 truncate">{member.terminalPrompt}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono transition-colors ${pipelineActive ? 'bg-[#d9f99d] text-black font-bold' : 'text-emerald-400 bg-emerald-500/10'}`}>
                {pipelineActive ? 'EXECUTION COMPLETE ⚡' : '[60 FPS ACTIVE]'}
              </span>
            </div>
          </div>

          {/* Bio & Narrative */}
          <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed font-light">
            {member.bio}
          </p>

          {/* Direct Quote */}
          <div className="border-l-2 border-[#d9f99d] pl-4 py-2 italic font-sans text-sm sm:text-base text-zinc-400 bg-white/[0.01] rounded-r-lg">
            &ldquo;{member.quote}&rdquo;
          </div>

          {/* Minimal Profile Link & High-Five Counter */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href={member.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#d9f99d] transition-colors"
              >
                <span>GitHub / {member.name.toLowerCase()}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              {member.social.x && (
                <a
                  href={member.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-[#d9f99d] transition-colors"
                >
                  <span>X (Twitter)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={handleHighFive}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#d9f99d] hover:text-black border border-white/10 hover:border-[#d9f99d] text-xs font-mono text-zinc-300 transition-all cursor-pointer group active:scale-95"
              title="Give high-five"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 group-hover:text-black transition-colors" />
              <span>High-Fives ({highFives})</span>
            </button>
          </div>
        </div>

        {/* Right Column: Dual-Craft Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Design Discipline */}
          <div className="p-6 rounded-2xl bg-[#111115] border border-white/10 hover:border-[#d9f99d]/30 transition-all group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#d9f99d] uppercase">
                <Palette className="w-4 h-4 text-[#d9f99d]" />
                <span>Craft 01 // Spatial & Visual UI</span>
              </div>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mb-4">
              Designing tokenized systems in Figma, ergonomic user journeys, spatial 3D interfaces, and frictionless interaction micro-states.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {member.designStack?.map((skill, i) => (
                <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card: Code Discipline */}
          <div className="p-6 rounded-2xl bg-[#111115] border border-white/10 hover:border-sky-400/30 transition-all group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-sky-400 uppercase">
                <Code2 className="w-4 h-4 text-sky-400" />
                <span>Craft 02 // Production Systems</span>
              </div>
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans mb-4">
              Building 60 FPS React/WebGL frontends, low-latency microservices, real-time WebSocket pipelines, and resilient Dockerized architectures.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {member.codeStack?.map((skill, i) => (
                <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Value Metric Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#d9f99d]/10 via-sky-500/5 to-transparent border border-[#d9f99d]/20 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-[#d9f99d] font-bold">100% UNBROKEN VISION</p>
              <p className="text-[11px] text-zinc-400 font-sans mt-0.5">What is designed is precisely what gets compiled into production.</p>
            </div>
            <button
              onClick={triggerPipelineBlast}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-[#d9f99d] text-black font-mono text-[10px] font-bold uppercase hover:bg-white transition-all cursor-pointer shadow-[0_0_15px_rgba(217,249,157,0.3)]"
            >
              RUN DEMO ⚡
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Solo Collaborative Blueprint */}
      <div className="mt-16 pt-8 border-t border-white/5">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-[#d9f99d]" />
            <span>How I Build With You</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            From Concept Blueprint to Launch in 2-4 Weeks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="space-y-3 group cursor-pointer p-4 rounded-xl hover:bg-white/[0.02] transition-colors"
              onClick={() => playAudioSynth(500 + idx * 150)}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-[#d9f99d]">
                  {step.num} //
                </span>
                <h4 className="font-display text-xl font-bold text-white group-hover:text-[#d9f99d] transition-colors">
                  {step.title}
                </h4>
              </div>

              <p className="text-xs font-mono text-[#d9f99d]/80 tracking-wider">
                {step.spec}
              </p>

              <p className="text-xs font-sans text-zinc-400 leading-relaxed pt-1">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
