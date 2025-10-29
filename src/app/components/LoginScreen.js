'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function LoginScreen({ onLogin }) {
  const [selectedUser, setSelectedUser] = useState(null)

  const handleUserClick = () => {
    setSelectedUser(true)
    // Auto-login after selection
    setTimeout(() => {
      onLogin()
    }, 800)
  }

  const handleRestart = () => {
    // Reload the page to restart the program
    window.location.reload()
  }

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      {/* Top Blue Bar */}
      <div className="h-24 bg-gradient-to-b from-[#0054E3] to-[#0D4DB5]"></div>

      {/* Center Light Background with Cross Pattern */}
      <div 
        className="flex-1 relative bg-[#5A7ECC]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0, 0, 0, 0.05) 10px, rgba(0, 0, 0, 0.05) 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0, 0, 0, 0.05) 10px, rgba(0, 0, 0, 0.05) 11px)',
          backgroundSize: '20px 20px'
        }}
      >
        {/* Content Container */}
        <div className="flex items-center justify-center h-full gap-0">
          {/* Left Section - Logo and Text */}
          <div className="flex flex-col items-center justify-center w-1/2 px-10">
            <div className="flex flex-col items-center">
              <Image
                src="/images/XPLOGO.png"
                alt="XP Logo"
                width={150}
                height={150}
                className="w-36 h-36 mb-6"
              />
              <h1 className="text-white text-7xl font-semibold tracking-tight mb-2">
                Neelanshu
                <span className="text-orange-400 text-5xl font-bold italic ml-2">XP</span>
              </h1>
              <p className="text-white/90 text-xl italic text-center mt-4">
                To begin, click on Neelanshu to log in
              </p>
            </div>
          </div>

          {/* Vertical Divider Line */}
          <div className="h-96 w-px bg-white/30"></div>

          {/* Right Section - User Card */}
          <div className="flex items-center justify-center w-1/2 px-10">
            <div 
              onClick={handleUserClick}
              className={`flex items-center gap-6 cursor-pointer transition-transform duration-300 ${
                selectedUser ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              <div className="bg-[#7398c9] p-5 rounded-xl shadow-lg">
                <Image
                  src="/images/boy.png"
                  alt="User Avatar"
                  width={140}
                  height={140}
                  className="w-32 h-32 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-white font-semibold text-4xl mb-2">Neelanshu</h2>
                <p className="text-blue-/90 text-bold-xl italic">Visual Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Blue Bar */}
      <div className="h-24 bg-gradient-to-b from-[#0D4DB5] to-[#0054E3]"></div>

      {/* Restart Button - Bottom Left */}
      <div className="absolute bottom-8 left-8">
        <button
          onClick={handleRestart}
          className="flex items-center gap-4 px-12 py-2"
          style={{
            // background: 'linear-gradient(to bottom, #73D216 0%, #5BA512 100%)',
            // border: '1px solid #4A8A0E',
          }}
        >
          <Image
            src="/images/Restart.png"
            alt="Restart"
            width={36}
            height={36}
            className="w-10 h-10"
          />
          <span className="text-white font-xl text-base">
            Restart Neelanshu XP
          </span>
        </button>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 right-8 text-right text-white text-sm italic max-w-md">
        After you log in, the system&apos;s yours to explore. <br />
        Every detail has been designed with a purpose.
      </div>
    </div>
  )
}
