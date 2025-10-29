'use client'

export default function StartMenu({ onClose, onOpenWindow }) {
  const menuItems = [
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '👨‍💻',
      type: 'application',
      description: 'View my work and projects'
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: '📄',
      type: 'application',
      description: 'Download my CV'
    },
    {
      id: 'about',
      name: 'About Me',
      icon: '👤',
      type: 'application',
      description: 'Learn more about me'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '📧',
      type: 'application',
      description: 'Get in touch'
    },
    {
      id: 'projects',
      name: 'My Projects',
      icon: '⚡',
      type: 'folder',
      description: 'Browse my work'
    },
    { type: 'separator' },
    {
      id: 'notepad',
      name: 'Notepad',
      icon: '📝',
      type: 'system',
      description: 'Text editor'
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: '🧮',
      type: 'system',
      description: 'Windows calculator'
    },
    {
      id: 'paint',
      name: 'Paint',
      icon: '🎨',
      type: 'system',
      description: 'Image editor'
    }
  ]

  const handleItemClick = (item) => {
    if (item.type === 'separator') return
    
    const windowData = {
      title: item.name,
      type: item.type,
      icon: item.icon,
      width: 600,
      height: 400,
      isMinimized: false,
      isMaximized: false
    }
    
    onOpenWindow(windowData)
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="absolute bottom-8 left-1 w-80 bg-white border-2 border-gray-400 shadow-2xl z-50 rounded-tr-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 flex items-center">
          <div className="w-8 h-8 bg-white rounded-full mr-3 flex items-center justify-center">
            <span className="text-blue-600 font-bold">👤</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Mitch Ivin</div>
            <div className="text-xs opacity-90">Visual Designer</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white">
          {menuItems.map((item, index) => {
            if (item.type === 'separator') {
              return (
                <div key={index} className="border-t border-gray-300 my-1" />
              )
            }

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex items-center px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors group"
              >
                <div className="w-8 h-8 flex items-center justify-center mr-3 text-lg">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800 group-hover:text-blue-800">
                    {item.name}
                  </div>
                  {item.description && (
                    <div className="text-xs text-gray-600 group-hover:text-blue-600">
                      {item.description}
                    </div>
                  )}
                </div>
                <div className="w-4 h-4 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">▶</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 border-t border-gray-300 p-2 flex items-center justify-between">
          <button className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-200 rounded text-sm">
            <span>🔒</span>
            <span>Log Off</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-200 rounded text-sm">
            <span>⏻</span>
            <span>Turn Off</span>
          </button>
        </div>
      </div>
    </>
  )
}
