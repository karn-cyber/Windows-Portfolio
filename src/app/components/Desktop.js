'use client'

import { useState, useEffect } from 'react'
import Taskbar from './Taskbar'
import StartMenu from './StartMenu'
import WindowManager from './WindowManager'
import { WindowsIcon } from './WindowsIcons'

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
      id: 'about-me',
      name: 'About Me',
      icon: 'user',
      type: 'application'
    },
    {
      id: 'my-resume',
      name: 'My Resume',
      icon: 'folder',
      type: 'folder',
      contents: [
        {
          id: 'resume-pdf',
          name: 'Neelanshu Karn - Resume.pdf',
          icon: 'document',
          type: 'pdf',
          file: '/Resume-Neelanshu Karn (4).pdf'
        }
      ]
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: 'briefcase',
      type: 'folder',
      contents: [
        {
          id: 'notion-beta',
          name: 'Notion Beta',
          icon: 'globe',
          type: 'link',
          url: 'https://notion-beta-neel.vercel.app/',
          description: 'A modern note-taking and collaboration platform'
        },
        {
          id: 'start-it',
          name: 'Start-It App',
          icon: 'rocket',
          type: 'link',
          url: 'https://start-it-app.vercel.app/',
          description: 'Startup project management and tracking application'
        },
        {
          id: 'nebula',
          name: 'Nebula',
          icon: 'globe',
          type: 'link',
          url: 'https://nebula-last.vercel.app/',
          description: 'Nebula project application'
        },
        {
          id: 'repo-recommendation',
          name: 'Repo Recommendation',
          icon: 'globe',
          type: 'link',
          url: 'https://repo-recommendation.vercel.app/',
          description: 'Repository recommendation engine'
        },
        {
          id: 'evolver-app',
          name: 'Evolver App',
          icon: 'globe',
          type: 'link',
          url: 'https://evolver-app-sand.vercel.app/',
          description: 'Evolver application'
        }
      ]
    },
    {
      id: 'contact',
      name: 'Contact Me',
      icon: 'mail',
      type: 'application'
    },
    {
      id: 'spotify',
      name: 'Music Player',
      icon: 'computer',
      type: 'spotify'
    },
    {
      id: 'chatbot',
      name: "Neel's Bot",
      icon: 'chat',
      type: 'chatbot',
      width: 680,
      height: 520
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
      contents: icon.contents, // Pass folder contents to window
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 100,
      width: icon.width || 600,
      height: icon.height || 400,
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
              <div className="mb-1 flex justify-center">
                <WindowsIcon type={icon.icon} size={48} />
              </div>
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
