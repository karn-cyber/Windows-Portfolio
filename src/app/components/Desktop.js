'use client'

import { useState, useEffect } from 'react'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import WindowManager from './WindowManager'

export default function Desktop() {
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [openWindows, setOpenWindows] = useState([])
  const [selectedIcons, setSelectedIcons] = useState([])
  const [time, setTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const desktopIcons = [
    {
      id: 'my-computer',
      name: 'My Computer',
      icon: '💻',
      type: 'system'
    },
    {
      id: 'my-documents',
      name: 'My Documents',
      icon: '📁',
      type: 'folder'
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      icon: '🗑️',
      type: 'system'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '👨‍💻',
      type: 'application'
    },
    {
      id: 'resume',
      name: 'Resume.pdf',
      icon: '📄',
      type: 'file'
    },
    {
      id: 'projects',
      name: 'My Projects',
      icon: '⚡',
      type: 'folder'
    },
    {
      id: 'contact',
      name: 'Contact Me',
      icon: '📧',
      type: 'application'
    }
  ]

  const handleStartMenuToggle = () => {
    setShowStartMenu(!showStartMenu)
  }

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowStartMenu(false)
      setSelectedIcons([])
    }
  }

  const handleIconClick = (icon, e) => {
    e.stopPropagation()
    
    if (e.detail === 2) { // Double click
      handleIconDoubleClick(icon)
    } else { // Single click
      setSelectedIcons([icon.id])
    }
  }

  const handleIconDoubleClick = (icon) => {
    // Open window based on icon type
    const newWindow = {
      id: `window-${Date.now()}`,
      title: icon.name,
      type: icon.type,
      icon: icon.icon,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 100,
      width: 600,
      height: 400,
      isMinimized: false,
      isMaximized: false,
      zIndex: openWindows.length + 1
    }
    
    setOpenWindows([...openWindows, newWindow])
    setShowStartMenu(false)
  }

  const handleWindowClose = (windowId) => {
    setOpenWindows(openWindows.filter(window => window.id !== windowId))
  }

  const handleWindowMinimize = (windowId) => {
    setOpenWindows(openWindows.map(window => 
      window.id === windowId 
        ? { ...window, isMinimized: true }
        : window
    ))
  }

  const handleWindowRestore = (windowId) => {
    setOpenWindows(openWindows.map(window => 
      window.id === windowId 
        ? { ...window, isMinimized: false, zIndex: Math.max(...openWindows.map(w => w.zIndex)) + 1 }
        : window
    ))
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Desktop Background - Windows XP Bliss */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat cursor-default"
        style={{
          backgroundImage: `linear-gradient(135deg, #5A9FD4 0%, #306998 25%, #3E7CB8 50%, #5A9FD4 75%, #7BB8E3 100%)`
        }}
        onClick={handleDesktopClick}
      >
        {/* Desktop pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-repeat" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`
             }}>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute inset-0 p-4">
        <div className="flex flex-col space-y-2">
          {desktopIcons.map((icon, index) => (
            <div
              key={icon.id}
              className={`desktop-icon ${selectedIcons.includes(icon.id) ? 'selected' : ''}`}
              onClick={(e) => handleIconClick(icon, e)}
              style={{ 
                position: 'absolute',
                left: '20px',
                top: `${20 + index * 80}px`
              }}
            >
              <div className="text-2xl mb-1">{icon.icon}</div>
              <div className="text-white text-xs text-center font-medium drop-shadow-lg leading-tight">
                {icon.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Windows */}
      <WindowManager 
        windows={openWindows}
        onClose={handleWindowClose}
        onMinimize={handleWindowMinimize}
        onRestore={handleWindowRestore}
        setWindows={setOpenWindows}
      />

      {/* Start Menu */}
      {showStartMenu && (
        <StartMenu 
          onClose={() => setShowStartMenu(false)}
          onOpenWindow={(windowData) => {
            const newWindow = {
              ...windowData,
              id: `window-${Date.now()}`,
              x: Math.random() * 200 + 100,
              y: Math.random() * 100 + 100,
              zIndex: openWindows.length + 1
            }
            setOpenWindows([...openWindows, newWindow])
            setShowStartMenu(false)
          }}
        />
      )}

      {/* Taskbar */}
      <Taskbar 
        onStartMenuToggle={handleStartMenuToggle}
        showStartMenu={showStartMenu}
        openWindows={openWindows.filter(w => !w.isMinimized)}
        minimizedWindows={openWindows.filter(w => w.isMinimized)}
        onWindowRestore={handleWindowRestore}
        time={time}
      />
    </div>
  )
}
