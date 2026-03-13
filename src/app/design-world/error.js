'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DesignWorldError({ error, reset }) {
  const router = useRouter()

  useEffect(() => {
    console.error('Design World error:', error)
  }, [error])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        fontFamily: 'Segoe UI, Tahoma, sans-serif',
      }}
    >
      <div
        style={{
          width: 380,
          background: '#ece9d8',
          border: '3px solid #0a246a',
          outline: '1px solid #4a8af4',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '6px 6px 24px rgba(0,0,0,0.65)',
        }}
      >
        {/* XP title bar */}
        <div
          style={{
            background: 'linear-gradient(180deg, #2a7ce8 0%, #1a5cd0 35%, #0a3aa8 100%)',
            padding: '5px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ color: 'white', fontSize: 12, fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Design Lab — Error
          </span>
        </div>
        <div style={{ padding: '22px 24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <span style={{ fontSize: 36 }}>🧪</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#0a246a', marginBottom: 4 }}>
                An error occurred in the Design Garden
              </div>
              <div style={{ fontSize: 11, color: '#555' }}>
                The 3D scene encountered a problem.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={reset}
              style={{
                padding: '5px 18px',
                fontSize: 12,
                background: 'linear-gradient(180deg, #f8f4f0 0%, #d0ccc8 100%)',
                border: '2px outset #a0a0a0',
                borderRadius: 3,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              style={{
                padding: '5px 18px',
                fontSize: 12,
                background: 'linear-gradient(180deg, #f8f4f0 0%, #d0ccc8 100%)',
                border: '2px outset #a0a0a0',
                borderRadius: 3,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Back to Desktop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
