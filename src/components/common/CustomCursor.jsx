import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useMousePos } from '../../hooks/useMousePos'

export default function CustomCursor() {
  const { x, y, cursorVariant, cursorText, isMouseDown, isTouchDevice } = useMousePos()

  // Ultra-responsive agile spring for snappy, native-like cursor feel
  const springConfig = { damping: 45, stiffness: 1200, mass: 0.04 }
  const cursorX = useSpring(x, springConfig)
  const cursorY = useSpring(y, springConfig)

  useEffect(() => {
    cursorX.set(x)
    cursorY.set(y)
  }, [x, y, cursorX, cursorY])

  useEffect(() => {
    if (!isTouchDevice) {
      document.body.classList.add('has-custom-cursor')
    }
    return () => {
      document.body.classList.remove('has-custom-cursor')
    }
  }, [isTouchDevice])

  if (isTouchDevice || x < 0 || y < 0) {
    return null
  }

  // Size and styling based on variant
  let size = 28
  let bgColor = 'rgba(255, 255, 255, 0.06)'
  let borderColor = 'rgba(255, 255, 255, 0.45)'
  let textColor = '#ffffff'
  let mixBlend = 'difference'

  if (cursorVariant === 'pointer') {
    size = 44
    bgColor = 'rgba(217, 249, 157, 0.18)'
    borderColor = '#d9f99d'
  } else if (cursorVariant === 'view') {
    size = 78
    bgColor = '#d9f99d'
    borderColor = '#d9f99d'
    textColor = '#09090b'
    mixBlend = 'normal'
  } else if (cursorVariant === 'drag') {
    size = 72
    bgColor = '#38bdf8'
    borderColor = '#38bdf8'
    textColor = '#09090b'
    mixBlend = 'normal'
  } else if (cursorVariant === 'break') {
    size = 74
    bgColor = '#f43f5e'
    borderColor = '#f43f5e'
    textColor = '#ffffff'
    mixBlend = 'normal'
  }

  if (isMouseDown) {
    size = Math.max(18, size * 0.85)
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      {/* Precision Follower with Centered Dot Locked Inside */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: size,
          height: size,
          backgroundColor: bgColor,
          borderColor: borderColor,
          mixBlendMode: mixBlend,
        }}
        className="rounded-full border backdrop-blur-[1px] transition-colors duration-150 flex items-center justify-center font-mono text-[10px] font-bold tracking-widest uppercase select-none relative"
      >
        {cursorText ? (
          <span style={{ color: textColor }} className="animate-in fade-in zoom-in-75 duration-100">
            {cursorText}
          </span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-95 block pointer-events-none" />
        )}
      </motion.div>
    </div>
  )
}
