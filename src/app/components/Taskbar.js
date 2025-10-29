'use client'

import Image from 'next/image'

export default function Taskbar({ 
  onStartMenuToggle, 
  showStartMenu, 
  openWindows, 
  minimizedWindows,
  onWindowRestore,
  time 
}) {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-10 flex items-center px-1 z-50"
      style={{
        background: 'linear-gradient(to bottom, #245EDC 0%, #1941A5 100%)',
        borderTop: '2px solid #2B6AE8'
      }}
    >
      {/* Start Button */}
      <button
        onClick={onStartMenuToggle}
        className={`h-8 px-3 mr-2 flex items-center space-x-2 text-white font-bold text-sm transition-all ${
          showStartMenu 
            ? 'shadow-inner' 
            : 'hover:brightness-110'
        }`}
        style={{
          background: showStartMenu 
            ? 'linear-gradient(to bottom, #1B4FA1 0%, #2A62C4 100%)'
            : 'linear-gradient(to bottom, #3DAF3D 0%, #2D8B2D 100%)',
          borderRadius: '8px',
          border: '2px solid',
          borderColor: showStartMenu ? '#0D3B7A' : '#52C752',
          borderTopColor: showStartMenu ? '#1B4FA1' : '#73D973',
          borderLeftColor: showStartMenu ? '#1B4FA1' : '#73D973',
          boxShadow: showStartMenu 
            ? 'inset 1px 1px 3px rgba(0,0,0,0.3)'
            : '1px 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        {/* Windows Logo */}
        <Image 
          src="/images/XPLOGO.png"
          alt="Start"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="italic" style={{ fontFamily: 'Franklin Gothic Medium, sans-serif' }}>start</span>
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-blue-700 mr-2"></div>

      {/* Quick Launch Icons */}
      <div className="flex items-center space-x-1 mr-2 pr-2">
        <button className="w-7 h-7 hover:bg-blue-600/50 rounded flex items-center justify-center transition-colors">
          <span className="text-white text-base">🌐</span>
        </button>
        <button className="w-7 h-7 hover:bg-blue-600/50 rounded flex items-center justify-center transition-colors">
          <span className="text-white text-base">✉️</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-blue-700 mr-2"></div>

      {/* Open Windows */}
      <div className="flex-1 flex items-center space-x-1 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className="h-7 px-3 text-white text-xs font-medium max-w-40 truncate flex items-center space-x-1 transition-all"
            style={{
              background: 'linear-gradient(to bottom, #3A7EDB 0%, #1E5BB8 100%)',
              border: '1px solid #4A8EEB',
              borderRadius: '3px',
              boxShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            <span>{window.icon}</span>
            <span>{window.title}</span>
          </button>
        ))}
        
        {minimizedWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowRestore(window.id)}
            className="h-7 px-3 text-white text-xs font-medium max-w-40 truncate flex items-center space-x-1 transition-all hover:brightness-110"
            style={{
              background: 'linear-gradient(to bottom, #2A6EDB 0%, #1E4BA8 100%)',
              border: '1px solid #3A7EEB',
              borderRadius: '3px',
              boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            <span>{window.icon}</span>
            <span>{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div 
        className="flex items-center space-x-2 pl-2 pr-1 h-full"
        style={{
          borderLeft: '2px solid #1941A5'
        }}
      >
        {/* Network Icon */}
        <div className="w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xs">📶</span>
        </div>
        
        {/* Volume Icon */}
        <div className="w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xs">🔊</span>
        </div>
        
        {/* Time */}
        <div 
          className="text-white text-xs font-medium px-2 py-1 min-w-20 text-center"
          style={{
            background: 'linear-gradient(to bottom, #19AAE9 0%, #0F87C9 100%)',
            border: '1px solid #2BB9F9',
            borderRadius: '3px'
          }}
        >
          {formatTime(time)}
        </div>
      </div>
    </div>
  )
}
