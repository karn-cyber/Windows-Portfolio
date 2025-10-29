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

  // Play Windows XP startup sound
  useEffect(() => {
    const audio = new Audio('/sounds/startup.mp3')
    audio.volume = 0.5 // Set volume to 50%
    audio.play().catch(error => {
      console.log('Audio playback failed:', error)
    })
  }, [])

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
      icon: '�️',
      type: 'system'
    },
    {
      id: 'my-documents',
      name: 'My Documents',
      icon: '�',
      type: 'folder'
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      icon: '🗑️',
      type: 'system'
    },
    {
      id: 'notion-beta',
      name: 'Notion Beta',
      icon: '🌐',
      type: 'link',
      url: 'https://notion-beta-neel.vercel.app/'
    },
    {
      id: 'start-it',
      name: 'Start-It App',
      icon: '🚀',
      type: 'link',
      url: 'https://start-it-app.vercel.app/'
    },
    {
      id: 'resume',
      name: 'Resume.pdf',
      icon: '📄',
      type: 'pdf',
      file: '/Resume-Neelanshu Karn (4).pdf'
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '👨‍💻',
      type: 'application'
    },
    {
      id: 'contact',
      name: 'Contact Me',
      icon: '✉️',
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
    // Handle external links
    if (icon.type === 'link' && icon.url) {
      window.open(icon.url, '_blank')
      return
    }
    
    // Handle PDF
    if (icon.type === 'pdf' && icon.file) {
      window.open(icon.file, '_blank')
      return
    }
    
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
          backgroundImage: `url('/images/background.png')`
        }}
        onClick={handleDesktopClick}
      >
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
