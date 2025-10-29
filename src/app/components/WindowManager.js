'use client'

import { useState } from 'react'
import Window from './Window'

export default function WindowManager({ windows, onClose, onMinimize, onRestore, setWindows }) {
  const [dragData, setDragData] = useState(null)

  const handleWindowFocus = (windowId) => {
    const maxZ = Math.max(...windows.map(w => w.zIndex))
    setWindows(windows.map(window => 
      window.id === windowId 
        ? { ...window, zIndex: maxZ + 1 }
        : window
    ))
  }

  const handleDragStart = (windowId, startPos) => {
    setDragData({
      windowId,
      startPos,
      startWindowPos: windows.find(w => w.id === windowId)
    })
  }

  const handleDrag = (currentPos) => {
    if (!dragData) return

    const deltaX = currentPos.x - dragData.startPos.x
    const deltaY = currentPos.y - dragData.startPos.y

    setWindows(windows.map(window => 
      window.id === dragData.windowId
        ? {
            ...window,
            x: Math.max(0, Math.min(window.screen?.width - window.width || window.x, dragData.startWindowPos.x + deltaX)),
            y: Math.max(0, Math.min(window.screen?.height - window.height || window.y, dragData.startWindowPos.y + deltaY))
          }
        : window
    ))
  }

  const handleDragEnd = () => {
    setDragData(null)
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {windows
        .filter(window => !window.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((window) => (
          <Window
            key={window.id}
            window={window}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            onFocus={() => handleWindowFocus(window.id)}
            onDragStart={(startPos) => handleDragStart(window.id, startPos)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}
    </div>
  )
}
