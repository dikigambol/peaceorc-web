export default function TagBadge({ label, variant = 'default', active = false, onClick }) {
  const isInteractive = Boolean(onClick)

  let baseStyles = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs tracking-wider transition-all duration-200 border select-none "

  if (active) {
    baseStyles += "bg-[#d9f99d] text-[#09090b] border-[#d9f99d] font-semibold shadow-[0_0_15px_rgba(217,249,157,0.3)] "
  } else if (variant === 'accent') {
    baseStyles += "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:border-emerald-400/60 "
  } else if (variant === 'violet') {
    baseStyles += "bg-purple-500/10 text-purple-300 border-purple-500/30 hover:border-purple-400/60 "
  } else {
    baseStyles += "bg-white/5 text-zinc-300 border-white/10 hover:border-white/25 hover:text-white "
  }

  if (isInteractive) {
    baseStyles += "cursor-pointer active:scale-95"
  }

  return (
    <span onClick={onClick} className={baseStyles}>
      {label}
    </span>
  )
}
