'use client'

import Image from 'next/image'

export default function StartMenu({ onClose, onOpenWindow }) {
  const menuItems = [
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: '👨‍💻',
      type: 'application',
      description: 'View my work'
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: '📄',
      type: 'pdf',
      file: '/Resume-Neelanshu Karn (4).pdf',
      description: 'Download my CV'
    },
    {
      id: 'notion-beta',
      name: 'Notion Beta',
      icon: '🌐',
      type: 'link',
      url: 'https://notion-beta-neel.vercel.app/',
      description: 'My Notion project'
    },
    {
      id: 'start-it',
      name: 'Start-It App',
      icon: '🚀',
      type: 'link',
      url: 'https://start-it-app.vercel.app/',
      description: 'Startup platform'
    },
    {
      id: 'about',
      name: 'About Me',
      icon: '�',
      type: 'application',
      description: 'Learn more'
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: '✉️',
      type: 'application',
      description: 'Get in touch'
    },
    { type: 'separator' },
    {
      id: 'paint',
      name: 'Paint',
      icon: '🎨',
      type: 'paint',
      description: 'Image editor'
    },
    {
      id: 'notepad',
      name: 'Notepad',
      icon: '📝',
      type: 'notepad',
      description: 'Text editor'
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: '🔢',
      type: 'calculator',
      description: 'Calculator'
    }
  ]

  const handleItemClick = (item) => {
    if (item.type === 'separator') return
    
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
      width: item.type === 'paint' ? 800 : 600,
      height: item.type === 'paint' ? 600 : 400,
      isMinimized: false,
      isMaximized: false
    }
    
    onOpenWindow(windowData)
  }

  const handleLogout = () => {
    window.location.reload()
  }

  const handleShutdown = () => {
    if (confirm('Are you sure you want to shut down?')) {
      window.close()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Start Menu */}
      <div className="absolute bottom-8 left-1 w-96 bg-white shadow-2xl z-50 overflow-hidden"
        style={{
          borderRadius: '8px 8px 0 0',
          border: '2px solid',
          borderColor: '#0054E3',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)'
        }}
      >
        {/* Header with XP Logo */}
        <div className="relative h-20"
          style={{
            background: 'linear-gradient(to right, #245EDC 0%, #3985FD 100%)'
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

        {/* Menu Items */}
        <div className="bg-white max-h-96 overflow-y-auto">
          {menuItems.map((item, index) => {
            if (item.type === 'separator') {
              return (
                <div key={index} className="border-t-2 border-gray-300 my-1 mx-2" />
              )
            }

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="flex items-center px-6 py-2 hover:bg-blue-50 cursor-pointer transition-colors group border-l-4 border-transparent hover:border-blue-500"
              >
                <div className="w-8 h-8 flex items-center justify-center mr-4 text-xl">
                  {item.icon}
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
            )
          })}
        </div>

        {/* Footer */}
        <div className="bg-blue-50 border-t-2 border-blue-200 p-3 flex items-center justify-end gap-2">
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
