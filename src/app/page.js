'use client'

import { useState, useEffect } from 'react'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'

export default function Home() {
  // Always start with 'boot' — server + client render the same HTML (no hydration mismatch)
  const [currentScreen, setCurrentScreen] = useState('boot')

  useEffect(() => {
    // After hydration, immediately skip to desktop if already booted this session
    if (sessionStorage.getItem('xp-booted') === 'true') {
      setCurrentScreen('desktop')
      return
    }
    // Normal boot timer
    const bootTimer = setTimeout(() => setCurrentScreen('login'), 8000)
    return () => clearTimeout(bootTimer)
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem('xp-booted', 'true')
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
