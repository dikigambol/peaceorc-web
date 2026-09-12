import { useState } from 'react'
import { Copy, Check, ArrowUp, Mail } from 'lucide-react'
import { personalInfo } from '../../data/portfolioData'



export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.contactEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Editorial Contact Statement */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d9f99d] tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d9f99d]" />
            <span>04 // Transmission &amp; Collaboration</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
            Have an ambitious vision? <br />
            <span className="text-zinc-500 hover:text-white transition-colors">
              Let&apos;s engineer it.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-400 font-sans max-w-xl">
            Currently accepting select engineering and creative technology commissions for Q2/Q3 2026. Reach out to discuss web applications, 3D/physics prototypes, or full-scale digital systems.
          </p>
        </div>

        {/* Email Copy CTA Card */}
        <div className="flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-[#111115] border border-white/10 flex flex-col gap-3 min-w-[280px]">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Direct Contact
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm font-semibold text-white selection:bg-[#d9f99d]">
                {personalInfo.contactEmail}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/5 hover:bg-[#d9f99d] hover:text-black text-zinc-300 transition-all cursor-pointer"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 hover:text-black" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] font-mono text-[#d9f99d] animate-in fade-in">
                ✓ Copied to clipboard!
              </span>
            )}
          </div>

          <a
            href={`mailto:${personalInfo.contactEmail}`}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#d9f99d] hover:bg-white text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(217,249,157,0.25)] hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Send Direct Message</span>
          </a>
        </div>
      </div>

      {/* Social Links & Colophon Bottom Row */}
      <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
        {/* Social Dock */}
        <div className="flex flex-wrap items-center gap-6">
          {personalInfo.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-[#d9f99d] transition-colors"
            >
              {s.name}
            </a>
          ))}
        </div>

        {/* Back to top & credits */}
        <div className="flex items-center gap-6">
          <span>© 2026 {personalInfo.name} — ALL RIGHTS RESERVED</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#d9f99d]" />
          </button>
        </div>
      </div>
    </footer>
  )
}
