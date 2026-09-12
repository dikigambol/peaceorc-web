import { useState, useEffect, useRef } from 'react'

export function useMousePos() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHoveringClickable, setIsHoveringClickable] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default') // 'default' | 'pointer' | 'view' | 'drag' | 'break' | 'hidden'
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isTouchDevice] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )

  const posRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (isTouchDevice) return

    const handleMouseMove = (e) => {

      posRef.current = { x: e.clientX, y: e.clientY }
      setPos({ x: e.clientX, y: e.clientY })

      // Detect hover target attributes or role
      const target = e.target
      if (!target) return

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-interactive')
      const viewCard = target.closest('[data-cursor-view]')
      const dragArea = target.closest('[data-cursor-drag]')
      const breakArea = target.closest('[data-cursor-break]')

      if (breakArea) {
        setCursorVariant('break')
        setCursorText('BREAK')
        setIsHoveringClickable(true)
      } else if (dragArea) {
        setCursorVariant('drag')
        setCursorText('DRAG')
        setIsHoveringClickable(true)
      } else if (viewCard) {
        setCursorVariant('view')
        setCursorText('EXPLORE')
        setIsHoveringClickable(true)
      } else if (interactive) {
        setCursorVariant('pointer')
        setCursorText('')
        setIsHoveringClickable(true)
      } else {
        setCursorVariant('default')
        setCursorText('')
        setIsHoveringClickable(false)
      }
    }

    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)
    const handleMouseLeave = () => {
      setPos({ x: -100, y: -100 })
      setCursorVariant('hidden')
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTouchDevice])


  return {
    ...pos,
    isHoveringClickable,
    cursorText,
    cursorVariant,
    isMouseDown,
    isTouchDevice,
  }
}
