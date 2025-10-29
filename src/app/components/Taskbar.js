'use client'

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
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-blue-500 to-blue-700 border-t-2 border-blue-300 flex items-center px-1 z-50">
      {/* Start Button */}
      <button
        onClick={onStartMenuToggle}
        className={`h-6 px-3 mr-2 rounded-sm flex items-center space-x-2 text-white font-bold text-sm transition-all ${
          showStartMenu 
            ? 'bg-blue-800 border border-blue-900 shadow-inset' 
            : 'bg-green-500 hover:bg-green-400 border border-green-600 shadow-sm'
        }`}
      >
        {/* Windows Logo */}
        <div className="w-4 h-4 grid grid-cols-2 gap-px">
          <div className="bg-red-500 rounded-tl-sm"></div>
          <div className="bg-green-400 rounded-tr-sm"></div>
          <div className="bg-blue-400 rounded-bl-sm"></div>
          <div className="bg-yellow-400 rounded-br-sm"></div>
        </div>
        <span>start</span>
      </button>

      {/* Quick Launch Icons */}
      <div className="flex items-center space-x-1 mr-2 border-r border-blue-600 pr-2">
        <button className="w-6 h-6 bg-blue-600 hover:bg-blue-500 rounded border border-blue-700 flex items-center justify-center">
          <span className="text-white text-xs">🌐</span>
        </button>
        <button className="w-6 h-6 bg-blue-600 hover:bg-blue-500 rounded border border-blue-700 flex items-center justify-center">
          <span className="text-white text-xs">📧</span>
        </button>
      </div>

      {/* Open Windows */}
      <div className="flex-1 flex items-center space-x-1">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className="h-6 px-3 bg-blue-600 hover:bg-blue-500 border border-blue-700 rounded-sm text-white text-xs font-medium max-w-32 truncate"
          >
            <span className="mr-1">{window.icon}</span>
            {window.title}
          </button>
        ))}
        
        {minimizedWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowRestore(window.id)}
            className="h-6 px-3 bg-blue-800 hover:bg-blue-700 border border-blue-900 rounded-sm text-white text-xs font-medium max-w-32 truncate"
          >
            <span className="mr-1">{window.icon}</span>
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-2 border-l border-blue-600 pl-2">
        {/* Network Icon */}
        <div className="w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xs">📶</span>
        </div>
        
        {/* Volume Icon */}
        <div className="w-4 h-4 flex items-center justify-center">
          <span className="text-white text-xs">🔊</span>
        </div>
        
        {/* Time */}
        <div className="text-white text-xs font-medium px-2 min-w-16 text-center">
          {formatTime(time)}
        </div>
      </div>
    </div>
  )
}
