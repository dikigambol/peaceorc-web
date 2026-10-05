/**
 * Unified Web Audio Manager
 * - Reuses a single AudioContext to prevent exceeding browser hardware context limits (which causes dropped sounds and delay).
 * - Pre-warms / resumes on initial user interaction for instantaneous playback.
 * - Handles smooth micro-fades to eliminate speaker pops and clicks.
 */

let sharedAudioCtx = null
let lastToneTime = 0

export function getAudioContext() {
  if (typeof window === 'undefined') return null

  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return null

  if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
    sharedAudioCtx = new AudioCtx()
  }

  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {})
  }

  return sharedAudioCtx
}

// Pre-warm the shared audio context on first user gesture
if (typeof window !== 'undefined') {
  const resumeAudio = () => {
    try {
      const ctx = getAudioContext()
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
    } catch {
      // Audio optional
    }
  }

  const events = ['pointerdown', 'pointermove', 'keydown', 'touchstart']
  events.forEach((evt) => {
    window.addEventListener(evt, resumeAudio, { once: true, passive: true })
  })
}

/**
 * Play a light, crisp procedural tone for interactive text hover
 * Zero external audio assets, zero latency, no browser context saturation.
 */
export function playTextTone(freq = 600) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    // Minimum 20ms gap to avoid sound buffer congestion during rapid mouse sweeps
    const nowMs = performance.now()
    if (nowMs - lastToneTime < 20) return
    lastToneTime = nowMs

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    // Smooth envelope: 3ms attack to avoid clicks, quick decay for snappy feel
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.038, now + 0.003)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.05)

    osc.onended = () => {
      try {
        osc.disconnect()
        gain.disconnect()
      } catch {
        // Disconnect safe
      }
    }
  } catch {
    // Audio optional
  }
}

/**
 * Sound synthesis for slider and navigation interactions
 */
export function playSliderSound(type = 'glitch') {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime

    if (type === 'glitch') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(750, now)
      osc.frequency.setValueAtTime(320, now + 0.03)
      osc.frequency.setValueAtTime(1100, now + 0.06)
      osc.frequency.setValueAtTime(450, now + 0.09)

      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.14)

      osc.onended = () => {
        try {
          osc.disconnect()
          gain.disconnect()
        } catch {}
      }
    } else {
      // Subtle sleek navigation tick
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.05)

      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.06)

      osc.onended = () => {
        try {
          osc.disconnect()
          gain.disconnect()
        } catch {}
      }
    }
  } catch {
    // Audio optional
  }
}

/**
 * Procedural audio synth for interactive clicks
 */
export function playAudioSynth(freq = 600) {
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.09)
    gain.gain.setValueAtTime(0.07, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.095)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.1)

    osc.onended = () => {
      try {
        osc.disconnect()
        gain.disconnect()
      } catch {}
    }
  } catch {
    // Audio optional
  }
}
