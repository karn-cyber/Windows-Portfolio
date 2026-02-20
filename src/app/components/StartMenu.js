'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WindowsIcon } from './WindowsIcons'

export default function StartMenu({ onClose, onOpenWindow }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Core menu items (left panel)
  const coreMenuItems = [
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: 'computer',
      type: 'application',
      description: 'View my work'
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: 'document',
      type: 'pdf',
      file: '/Resume-Neelanshu Karn (4).pdf',
      description: 'Download my CV'
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: 'briefcase',
      type: 'category',
      description: 'My projects',
      items: [
        { id: 'notion-beta', name: 'Notion Beta', icon: 'globe', type: 'link', url: 'https://notion-beta-neel.vercel.app/', description: 'My Notion project' },
        { id: 'start-it', name: 'Start-It App', icon: 'rocket', type: 'link', url: 'https://start-it-app.vercel.app/', description: 'Startup platform' },
        { id: 'nebula', name: 'Nebula', icon: 'globe', type: 'link', url: 'https://nebula-last.vercel.app/', description: 'Nebula project' },
        { id: 'repo-recommendation', name: 'Repo Recommendation', icon: 'globe', type: 'link', url: 'https://repo-recommendation.vercel.app/', description: 'Repository recommendation' },
        { id: 'evolver-app', name: 'Evolver App', icon: 'globe', type: 'link', url: 'https://evolver-app-sand.vercel.app/', description: 'Evolution application' }
      ]
    },
    {
      id: 'about',
      name: 'About Me',
      icon: 'user',
      type: 'application',
      description: 'Learn more'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: 'mail',
      type: 'application',
      description: 'Get in touch'
    },
    {
      id: 'github',
      name: 'My GitHub',
      icon: 'github',
      type: 'link',
      url: 'https://github.com/karn-cyber',
      description: 'Check my repos'
    },
    { type: 'separator' },
    {
      id: 'paint',
      name: 'Paint',
      icon: 'palette',
      type: 'paint',
      description: 'Image editor'
    },
    {
      id: 'notepad',
      name: 'Notepad',
      icon: 'notepad',
      type: 'notepad',
      description: 'Text editor'
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: 'calculator',
      type: 'calculator',
      description: 'Calculator'
    },
    {
      id: 'spotify',
      name: 'Music Player',
      icon: 'computer',
      type: 'spotify',
      description: 'Windows Media Player'
    },
    {
      id: 'chatbot',
      name: "Neel's Bot",
      icon: 'chat',
      type: 'chatbot',
      description: 'Chat with my AI',
      width: 680,
      height: 520
    }
  ]

  const handleItemClick = (item) => {
    if (item.type === 'separator') return
    
    if (item.type === 'category') {
      setSelectedCategory(item)
      return
    }
    
    // Handle external links
    if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank')
      onClose()
      return
    }
    
    // Handle PDF
    if (item.type === 'pdf' && item.file) {
      window.open(item.file, '_blank')
      onClose()
      return
    }

    const windowData = {
      title: item.name,
      type: item.type,
      icon: item.icon,
      width: item.width || (item.type === 'paint' ? 800 : 600),
      height: item.height || (item.type === 'paint' ? 600 : 400),
      isMinimized: false,
      isMaximized: false
    }
    
    onOpenWindow(windowData)
    onClose()
  }

  const handleLogout = () => {
    window.location.reload()
  }

  const handleShutdown = () => {
    if (confirm('Are you sure you want to shut down?')) {
      window.close()
    }
  }

  const currentCategory = selectedCategory

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="absolute bottom-8 left-1 bg-white shadow-2xl z-50 overflow-hidden"
        style={{
          width: '550px',
          height: '580px',
          borderRadius: '8px 8px 0 0',
          border: '2px solid',
          borderColor: '#0054E3',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header with XP Logo */}
        <div className="relative h-20"
          style={{
            background: 'linear-gradient(to right, #245EDC 0%, #3985FD 100%)',
            flexShrink: 0
          }}
        >
          <div className="absolute inset-0 flex items-center px-4">
            <Image 
              src="/images/XPLOGO.png"
              alt="Windows XP"
              width={48}
              height={48}
              className="w-12 h-12 mr-3"
            />
            <div className="text-white">
              <div className="text-2xl font-semibold italic">
                Neelanshu
                <span className="text-orange-400 text-lg ml-1">XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Core Menu Items */}
          <div className="w-48 bg-gradient-to-b from-blue-50 to-blue-100 border-r border-gray-300 overflow-y-auto">
            {coreMenuItems.map((item, index) => {
              if (item.type === 'separator') {
                return (
                  <div key={index} className="border-t-2 border-gray-300 my-1 mx-2" />
                )
              }

              const isSelected = currentCategory?.id === item.id

              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center px-4 py-3 cursor-pointer transition-colors border-l-4 ${
                    isSelected 
                      ? 'bg-blue-200 border-blue-600 text-blue-900' 
                      : 'hover:bg-blue-100 border-transparent text-gray-900 hover:text-blue-700'
                  }`}
                >
                  <div className="w-7 h-7 flex items-center justify-center mr-3 flex-shrink-0">
                    <WindowsIcon type={item.icon} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">
                      {item.name}
                    </div>
                  </div>
                  {item.type === 'category' && (
                    <span className="text-xs ml-2">▶</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Panel - Category Contents or Description */}
          <div className="flex-1 bg-white overflow-y-auto">
            {currentCategory ? (
              <div className="p-4">
                <div className="flex items-center mb-4 pb-3 border-b-2 border-gray-300">
                  <WindowsIcon type={currentCategory.icon} size={32} />
                  <h2 className="ml-3 text-lg font-bold text-blue-800">{currentCategory.name}</h2>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="ml-auto text-gray-500 hover:text-gray-700 text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
                <div className="space-y-2">
                  {currentCategory.items && currentCategory.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="flex items-center p-3 hover:bg-blue-50 rounded cursor-pointer transition-colors border-l-4 border-transparent hover:border-blue-500 group"
                    >
                      <div className="w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        <WindowsIcon type={item.icon} size={28} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-700">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 italic">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col items-center justify-center h-full text-gray-600">
                <WindowsIcon type="computer" size={64} />
                <p className="text-sm mt-4 text-center">
                  Select a category on the left to view more options
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-blue-50 border-t-2 border-blue-200 p-3 flex items-center justify-end gap-2 flex-shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-orange-100 rounded transition-colors border-2 border-orange-300 bg-orange-50"
          >
            <Image
              src="/images/Logout.png"
              alt="Log off"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-sm font-semibold text-gray-700">Log Off</span>
          </button>
          <button 
            onClick={handleShutdown}
            className="flex items-center space-x-2 px-4 py-2 hover:bg-red-100 rounded transition-colors border-2 border-red-300 bg-red-50"
          >
            <Image
              src="/images/Shutdown.png"
              alt="Turn off"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-sm font-semibold text-gray-700">Turn Off</span>
          </button>
        </div>
      </div>
    </>
  )
}
