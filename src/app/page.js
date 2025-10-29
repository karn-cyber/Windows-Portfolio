'use client'

import { useState, useEffect } from 'react'
import BootScreen from './components/BootScreen'
import LoginScreen from './components/LoginScreen'
import Desktop from './components/Desktop'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('boot')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Boot sequence timing - stay for 8 seconds for longer loading
    const bootTimer = setTimeout(() => {
      setCurrentScreen('login')
    }, 8000) // 8 seconds for boot screen

    return () => clearTimeout(bootTimer)
  }, [])

  const handleLogin = () => {
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
