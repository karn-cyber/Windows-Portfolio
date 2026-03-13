'use client'

import { useState, useEffect } from 'react'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'

export default function Home() {
  // If the user has already booted+logged in this session, jump straight to desktop
  const [currentScreen, setCurrentScreen] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('xp-booted') === 'true') {
      return 'desktop'
    }
    return 'boot'
  })

  useEffect(() => {
    // Only run the boot timer when we're actually on the boot screen
    if (currentScreen !== 'boot') return
    const bootTimer = setTimeout(() => {
      setCurrentScreen('login')
    }, 8000)
    return () => clearTimeout(bootTimer)
  }, [currentScreen])

  const handleLogin = () => {
    sessionStorage.setItem('xp-booted', 'true')
    // xp-sound-played is intentionally NOT set here — Desktop sets it on first mount
    setCurrentScreen('desktop')
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'boot':
        return <BootScreen />
      case 'login':
        return <LoginScreen onLogin={handleLogin} />
      case 'desktop':
        return <Desktop />
      default:
        return <BootScreen />
    }
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      {renderCurrentScreen()}
    </main>
  )
}
