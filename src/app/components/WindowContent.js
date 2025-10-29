'use client'

export default function WindowContent({ window }) {
  const renderContent = () => {
    switch (window.type) {
      case 'application':
        return renderApplicationContent()
      case 'folder':
        return renderFolderContent()
      case 'system':
        return renderSystemContent()
      case 'file':
        return renderFileContent()
      default:
        return renderDefaultContent()
    }
  }

  const renderApplicationContent = () => {
    switch (window.title) {
      case 'Portfolio':
        return (
          <div className="p-4 h-full overflow-auto">
            <h2 className="text-lg font-bold mb-4 text-blue-800">My Portfolio</h2>
            <div className="space-y-4">
              <div className="border border-gray-300 rounded p-3 bg-white">
                <h3 className="font-semibold text-blue-700">Web Development</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Modern web applications using React, Next.js, and Node.js
                </p>
              </div>
              <div className="border border-gray-300 rounded p-3 bg-white">
                <h3 className="font-semibold text-blue-700">UI/UX Design</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Creating intuitive and beautiful user interfaces
                </p>
              </div>
              <div className="border border-gray-300 rounded p-3 bg-white">
                <h3 className="font-semibold text-blue-700">Mobile Apps</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Cross-platform mobile development with React Native
                </p>
              </div>
            </div>
          </div>
        )
      
      case 'About Me':
        return (
          <div className="p-4 h-full overflow-auto">
            <h2 className="text-lg font-bold mb-4 text-blue-800">About Me</h2>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                Hi! I'm a passionate Visual Designer and Full-Stack Developer with a love for creating 
                beautiful and functional digital experiences.
              </p>
              <p className="text-sm text-gray-700">
                I specialize in modern web technologies and have a keen eye for design details 
                that make applications both powerful and delightful to use.
              </p>
              <div className="mt-4">
                <h3 className="font-semibold text-blue-700 mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Design Systems'].map((skill) => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      
      case 'Contact':
        return (
          <div className="p-4 h-full overflow-auto">
            <h2 className="text-lg font-bold mb-4 text-blue-800">Contact Me</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">📧</span>
                <span className="text-sm">email@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔗</span>
                <span className="text-sm">linkedin.com/in/yourprofile</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🐙</span>
                <span className="text-sm">github.com/yourusername</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🌐</span>
                <span className="text-sm">yourwebsite.com</span>
              </div>
            </div>
          </div>
        )
      
      case 'Resume':
        return (
          <div className="p-4 h-full overflow-auto">
            <h2 className="text-lg font-bold mb-4 text-blue-800">Resume</h2>
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-sm text-gray-600 mb-4">
                Click the button below to download my resume
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                Download PDF
              </button>
            </div>
          </div>
        )
      
      default:
        return renderDefaultContent()
    }
  }

  const renderFolderContent = () => {
    return (
      <div className="h-full bg-white">
        {/* Toolbar */}
        <div className="bg-gray-100 border-b border-gray-300 p-1 flex items-center space-x-2">
          <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">File</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">Edit</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">View</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">Tools</button>
        </div>
        
        {/* Navigation */}
        <div className="bg-gray-50 border-b border-gray-300 p-1 flex items-center space-x-2">
          <button className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded">← Back</button>
          <button className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded">→ Forward</button>
          <div className="flex-1 bg-white border border-gray-300 px-2 py-1 text-xs">
            C:\Users\Mitch\{window.title}
          </div>
        </div>
        
        {/* File listing */}
        <div className="p-4 space-y-2">
          {['Project 1.zip', 'Project 2.zip', 'Screenshots', 'Documentation'].map((item) => (
            <div key={item} className="flex items-center space-x-3 hover:bg-blue-50 p-1 rounded">
              <span className="text-lg">{item.includes('.') ? '📄' : '📁'}</span>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSystemContent = () => {
    switch (window.title) {
      case 'Notepad':
        return (
          <div className="h-full bg-white">
            <div className="bg-gray-100 border-b border-gray-300 p-1 flex items-center space-x-2">
              <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">File</button>
              <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">Edit</button>
              <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">Format</button>
              <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">View</button>
              <button className="px-2 py-1 text-xs hover:bg-gray-200 rounded">Help</button>
            </div>
            <textarea 
              className="w-full h-full p-2 text-sm resize-none border-none outline-none font-mono"
              placeholder="Type your text here..."
              defaultValue="Welcome to my portfolio!\n\nThis is a Windows XP inspired website showcasing my work and skills."
            />
          </div>
        )
      
      case 'Calculator':
        return (
          <div className="h-full bg-gray-100 p-2">
            <div className="bg-white border border-gray-400 p-2 mb-2 text-right text-lg font-mono">
              0
            </div>
            <div className="grid grid-cols-4 gap-1">
              {['C', '±', '/', '×', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'].map((btn) => (
                <button 
                  key={btn} 
                  className={`h-8 text-xs font-semibold border border-gray-400 hover:bg-gray-200 ${
                    btn === '=' ? 'col-span-1 row-span-2' : ''
                  } ${btn === '0' ? 'col-span-2' : ''}`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        )
      
      default:
        return renderDefaultContent()
    }
  }

  const renderFileContent = () => {
    return (
      <div className="p-4 h-full overflow-auto bg-white">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="font-semibold text-gray-800 mb-2">{window.title}</h3>
          <p className="text-sm text-gray-600">
            This file can be opened with an associated application.
          </p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
            Open with...
          </button>
        </div>
      </div>
    )
  }

  const renderDefaultContent = () => {
    return (
      <div className="p-4 h-full overflow-auto bg-white">
        <h2 className="text-lg font-bold mb-4">{window.title}</h2>
        <p className="text-sm text-gray-600">
          This is a Windows XP style application window. Content will be loaded here.
        </p>
      </div>
    )
  }

  return (
    <div className="h-full">
      {renderContent()}
    </div>
  )
}
