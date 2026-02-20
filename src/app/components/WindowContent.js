'use client'

import { useState, useRef, useEffect } from 'react'
import { WindowsIcon } from './WindowsIcons'
import SpotifyPlayer from './SpotifyPlayer'
import ChatBot from './ChatBot'

export default function WindowContent({ window }) {
  const renderContent = () => {
    switch (window.type) {
      case 'paint':
        return <PaintApp />
      case 'notepad':
        return <NotepadApp />
      case 'calculator':
        return <CalculatorApp />
      case 'spotify':
        return <SpotifyPlayer />
      case 'chatbot':
        return <ChatBot />
      case 'application':
        return renderApplicationContent()
      case 'folder':
        return renderFolderContent()
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
                Hi! I&apos;m a passionate Visual Designer and Full-Stack Developer with a love for creating 
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
              <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded cursor-pointer transition" onClick={() => window.location.href = 'mailto:neelanshu.2024@nst.rishihood.edu.in'}>
                <WindowsIcon type="mail" size={24} />
                <span className="text-sm font-semibold text-blue-700 hover:underline">neelanshu.2024@nst.rishihood.edu.in</span>
              </div>
              <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded cursor-pointer transition" onClick={() => window.open('https://www.linkedin.com/in/neelanshu-karn-05146130a/', '_blank')}>
                <WindowsIcon type="link" size={24} />
                <span className="text-sm font-semibold text-blue-700 hover:underline">LinkedIn Profile</span>
              </div>
              <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded cursor-pointer transition" onClick={() => window.open('https://github.com/karn-cyber', '_blank')}>
                <WindowsIcon type="github" size={24} />
                <span className="text-sm font-semibold text-blue-700 hover:underline">GitHub Repository</span>
              </div>
              <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded cursor-pointer transition" onClick={() => window.open('https://start-it-app.vercel.app/', '_blank')}>
                <WindowsIcon type="globe" size={24} />
                <span className="text-sm font-semibold text-blue-700 hover:underline">Start-It App</span>
              </div>
              <div className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded cursor-pointer transition" onClick={() => window.open('https://notion-beta-neel.vercel.app/', '_blank')}>
                <WindowsIcon type="globe" size={24} />
                <span className="text-sm font-semibold text-blue-700 hover:underline">Notion Beta</span>
              </div>
            </div>
          </div>
        )
      
      case 'Resume':
        return (
          <div className="p-4 h-full overflow-auto">
            <h2 className="text-lg font-bold mb-4 text-blue-800">Resume</h2>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <WindowsIcon type="document" size={96} />
              </div>
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
    const handleItemClick = (item) => {
      if (item.url) {
        window.open(item.url, '_blank')
      }
    }

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
            C:\Users\Neelanshu\{window.title}
          </div>
        </div>
        
        {/* File listing */}
        <div className="p-4 space-y-3">
          {window.contents && window.contents.map((item) => (
            <div 
              key={item.id} 
              className={`border border-gray-300 rounded p-3 bg-white ${item.url ? 'cursor-pointer hover:bg-blue-50' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <WindowsIcon type={item.icon} size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-700 text-sm">{item.name}</h3>
                  {item.description && (
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                  )}
                  {item.url && (
                    <p className="text-xs text-blue-500 mt-1 hover:underline">{item.url}</p>
                  )}
                </div>
              </div>
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
          <div className="mb-4 flex justify-center">
            <WindowsIcon type="document" size={96} />
          </div>
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

// Paint Application Component
function PaintApp() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(3)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  const startDrawing = (e) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF']

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center space-x-4">
        <button onClick={clearCanvas} className="px-3 py-1 text-xs bg-white border border-gray-400 hover:bg-gray-50">
          Clear
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xs">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-xs w-8">{brushSize}px</span>
        </div>
        <div className="flex items-center space-x-1">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 border-2 ${color === c ? 'border-black' : 'border-gray-400'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
      {/* Canvas */}
      <div className="flex-1 p-2 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={760}
          height={500}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border border-gray-400 cursor-crosshair bg-white"
        />
      </div>
    </div>
  )
}

// Notepad Application Component
function NotepadApp() {
  const [text, setText] = useState('Welcome to my portfolio!\n\nThis is a Windows XP inspired website showcasing my work and skills.\n\nFeel free to explore!')

  return (
    <div className="h-full bg-white flex flex-col">
      <div className="bg-gray-100 border-b border-gray-300 p-1 flex items-center space-x-2">
        <button className="px-2 py-1 text-xs hover:bg-gray-200">File</button>
        <button className="px-2 py-1 text-xs hover:bg-gray-200">Edit</button>
        <button className="px-2 py-1 text-xs hover:bg-gray-200">Format</button>
        <button className="px-2 py-1 text-xs hover:bg-gray-200">View</button>
        <button className="px-2 py-1 text-xs hover:bg-gray-200">Help</button>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 text-sm resize-none border-none outline-none font-mono"
        placeholder="Type your text here..."
      />
    </div>
  )
}

// Calculator Application Component
function CalculatorApp() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [newNumber, setNewNumber] = useState(true)

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num.toString())
      setNewNumber(false)
    } else {
      setDisplay(display === '0' ? num.toString() : display + num)
    }
  }

  const handleOperation = (op) => {
    const current = parseFloat(display)
    if (previousValue === null) {
      setPreviousValue(current)
    } else if (operation) {
      const result = calculate(previousValue, current, operation)
      setDisplay(result.toString())
      setPreviousValue(result)
    }
    setOperation(op)
    setNewNumber(true)
  }

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b
      case '-': return a - b
      case '×': return a * b
      case '/': return a / b
      default: return b
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation)
      setDisplay(result.toString())
      setPreviousValue(null)
      setOperation(null)
      setNewNumber(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setNewNumber(true)
  }

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
      setNewNumber(false)
    }
  }

  return (
    <div className="h-full bg-gray-100 p-3 flex flex-col">
      <div className="bg-white border-2 border-gray-400 p-3 mb-3 text-right text-2xl font-mono h-12 flex items-center justify-end">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2 flex-1">
        <button onClick={handleClear} className="bg-red-200 hover:bg-red-300 border-2 border-gray-400 text-sm font-semibold">C</button>
        <button onClick={() => setDisplay((parseFloat(display) * -1).toString())} className="bg-gray-200 hover:bg-gray-300 border-2 border-gray-400 text-sm font-semibold">±</button>
        <button onClick={() => handleOperation('/')} className="bg-blue-200 hover:bg-blue-300 border-2 border-gray-400 text-sm font-semibold">/</button>
        <button onClick={() => handleOperation('×')} className="bg-blue-200 hover:bg-blue-300 border-2 border-gray-400 text-sm font-semibold">×</button>
        
        <button onClick={() => handleNumber(7)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">7</button>
        <button onClick={() => handleNumber(8)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">8</button>
        <button onClick={() => handleNumber(9)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">9</button>
        <button onClick={() => handleOperation('-')} className="bg-blue-200 hover:bg-blue-300 border-2 border-gray-400 text-sm font-semibold">-</button>
        
        <button onClick={() => handleNumber(4)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">4</button>
        <button onClick={() => handleNumber(5)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">5</button>
        <button onClick={() => handleNumber(6)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">6</button>
        <button onClick={() => handleOperation('+')} className="bg-blue-200 hover:bg-blue-300 border-2 border-gray-400 text-sm font-semibold">+</button>
        
        <button onClick={() => handleNumber(1)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">1</button>
        <button onClick={() => handleNumber(2)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">2</button>
        <button onClick={() => handleNumber(3)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">3</button>
        <button onClick={handleEquals} className="bg-green-200 hover:bg-green-300 border-2 border-gray-400 text-sm font-semibold row-span-2">=</button>
        
        <button onClick={() => handleNumber(0)} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold col-span-2">0</button>
        <button onClick={handleDecimal} className="bg-white hover:bg-gray-50 border-2 border-gray-400 text-sm font-semibold">.</button>
      </div>
    </div>
  )
}
