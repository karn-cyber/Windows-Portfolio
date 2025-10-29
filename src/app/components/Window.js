'use client'

import { useState, useRef, useEffect } from 'react'
import WindowContent from './WindowContent'

export default function Window({ 
  window, 
  onClose, 
  onMinimize, 
  onFocus, 
  onDragStart, 
  onDrag, 
  onDragEnd 
}) {
  const [isDragging, setIsDragging] = useState(false)
  const windowRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && onDrag) {
        onDrag({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        onDragEnd?.()
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
    }
  }, [isDragging, onDrag, onDragEnd])

  const handleMouseDown = (e) => {
    if (e.target === headerRef.current || headerRef.current?.contains(e.target)) {
      setIsDragging(true)
      onFocus?.()
      onDragStart?.({ x: e.clientX, y: e.clientY })
    }
  }

  const handleWindowClick = () => {
    onFocus?.()
  }

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-100 border-2 border-gray-400 shadow-lg pointer-events-auto"
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
        borderTopColor: '#0054e3',
        borderLeftColor: '#0054e3',
        borderRightColor: '#808080',
        borderBottomColor: '#808080'
      }}
      onClick={handleWindowClick}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
        style={{
          background: 'linear-gradient(to right, #0058e8 0%, #1e4cc9 100%)'
        }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm">{window.icon}</span>
          <span className="text-sm font-medium">{window.title}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="w-5 h-4 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex items-center justify-center text-xs"
            style={{
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080'
            }}
          >
            <span className="text-black font-bold leading-none">−</span>
          </button>
          
          {/* Maximize Button */}
          <button
            className="w-5 h-4 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex items-center justify-center text-xs"
            style={{
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080'
            }}
          >
            <span className="text-black font-bold leading-none">□</span>
          </button>
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="w-5 h-4 bg-gray-300 hover:bg-red-400 border border-gray-500 flex items-center justify-center text-xs"
            style={{
              borderTopColor: '#ffffff',
              borderLeftColor: '#ffffff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080'
            }}
          >
            <span className="text-black font-bold leading-none">×</span>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden">
        <WindowContent window={window} />
      </div>
    </div>
  )
}
