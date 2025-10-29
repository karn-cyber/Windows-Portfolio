'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function BootScreen() {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show everything together after a brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    // Start progress bar immediately
    const progressTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          // Faster progress increments like original XP
          return prev + Math.random() * 3 + 2
        })
      }, 60)
      
      return () => clearInterval(interval)
    }, 800)

    return () => {
      clearTimeout(contentTimer)
      clearTimeout(progressTimer)
    }
  }, [])

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Classic XP Boot Background - Pure black initially */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Windows Logo and Branding */}
      <div className={`transition-all duration-1000 mb-16 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col items-center space-y-6">
          {/* Authentic Windows XP Logo - Centered */}
          <div className="flex flex-col items-center space-y-3">
            <Image 
              src="/images/XPLOGO.png"
              alt="Windows XP Logo"
              width={200}
              height={200}
              className="w-38 h-38"
            />
            <div className="text-white text-center">
              {/* <div className="text-2xl font-light tracking-wider opacity-90 mb-2">Microsoft</div> */}
              <div className="text-6xl font-bold tracking-wide relative inline-block">
              <span className="text-white italic">Neelanshu</span>
<span className="text-orange-400 text-3xl font-bold italic absolute -top-4 ml-2">XP</span>

              </div>
              <div className="text-sm font-light tracking-widest text-gray-300 mt-3">
                Professional
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar - Show with content */}
      <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} w-80`}>
        {/* Progress Bar Container - Authentic XP style */}
        <div className="relative">
            {/* Outer rounded border - like real XP */}
            <div className="border-2 border-gray-500 h-6 overflow-hidden bg-black" style={{ borderRadius: '12px' }}>
              {/* Inner dark area */}
              <div className="h-full relative overflow-hidden bg-black">
                {/* Authentic XP moving blocks - single set looping */}
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="flex space-x-1 items-center h-full"
                    style={{
                      animation: `slideLoop 2s linear infinite`,
                    }}
                  >
                    <div className="w-3 h-4 bg-gradient-to-b from-blue-400 to-blue-600"></div>
                    <div className="w-3 h-4 bg-gradient-to-b from-blue-400 to-blue-600"></div>
                    <div className="w-3 h-4 bg-gradient-to-b from-blue-400 to-blue-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center text-white text-base mt-8 font-light tracking-wide">
            Please wait while Windows starts up...
          </div>
        </div>

      <style jsx>{`
        @keyframes slideLoop {
          0% {
            transform: translateX(-20px);
          }
          100% {
            transform: translateX(340px);
          }
        }
      `}</style>

      {/* Copyright - Classic XP position */}
      <div className="absolute bottom-16 left-8 text-gray-400 text-xs font-light">
        For better Visual Experience
      </div>
      <div className="absolute bottom-12 left-8 text-gray-400 text-xs font-light">
        Press F11 to enter Fullscreen
      </div>
      
      {/* Build info - Portfolio branding */}
      <div className="absolute bottom-12 right-20 text-white text-4xl font-bold  italic tracking-wide">
        Portfolio
      </div>
    </div>
  )
}
