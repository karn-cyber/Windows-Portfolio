'use client'

import { useState } from 'react'

export default function XPWindow({ title, children, onClose, projectCount = 0 }) {
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <div
      style={{
        width: isMaximized ? '100vw' : '92vw',
        height: isMaximized ? '100vh' : '88vh',
        maxWidth: isMaximized ? '100vw' : '1400px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: isMaximized ? '0' : '8px 8px 4px 4px',
        overflow: 'hidden',
        /* XP Luna window border: thin bright inner edge + outer dark border */
        border: '3px solid #0a246a',
        outline: '1px solid #4a8af4',
        boxShadow: '0 0 0 1px #2060c8, 8px 8px 32px rgba(0,0,0,0.75)',
        transition: 'width 0.2s ease, height 0.2s ease, border-radius 0.2s ease',
        position: 'relative',
      }}
    >
      {/* ── Title Bar ───────────────────────────────────────── */}
      <div
        style={{
          background:
            'linear-gradient(180deg, #2a7ce8 0%, #1a5cd0 35%, #0e42b0 65%, #0a3aa8 100%)',
          padding: '3px 4px 3px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '30px',
          userSelect: 'none',
          borderBottom: '1px solid #082890',
        }}
      >
        {/* Left: icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '16px' }}>🧪</span>
          <span
            style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              fontFamily: 'Segoe UI, Tahoma, sans-serif',
              textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
              letterSpacing: '0.2px',
            }}
          >
            {title}
          </span>
        </div>

        {/* Right: window control buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginRight: '2px' }}>
          {/* Minimize */}
          <button
            title="Minimize"
            style={{
              width: '22px',
              height: '20px',
              background: 'linear-gradient(180deg, #f8f4f0 0%, #d8d0c8 100%)',
              border: '1px solid #8090a0',
              borderRadius: '3px',
              fontSize: '13px',
              fontWeight: '900',
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#405060',
              lineHeight: 1,
              paddingBottom: '3px',
            }}
          >
            _
          </button>
          {/* Maximize / Restore */}
          <button
            title={isMaximized ? 'Restore' : 'Maximize'}
            onClick={() => setIsMaximized(!isMaximized)}
            style={{
              width: '22px',
              height: '20px',
              background: 'linear-gradient(180deg, #f8f4f0 0%, #d8d0c8 100%)',
              border: '1px solid #8090a0',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#405060',
            }}
          >
            {isMaximized ? '❐' : '□'}
          </button>
          {/* Close */}
          <button
            title="Close"
            onClick={onClose}
            style={{
              width: '22px',
              height: '20px',
              background: 'linear-gradient(180deg, #f06040 0%, #c02000 100%)',
              border: '1px solid #801000',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textShadow: '0 1px 1px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(180deg, #ff7755 0%, #e03010 100%)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(180deg, #f06040 0%, #c02000 100%)')}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── XP Menu Bar ─────────────────────────────────────── */}
      <div
        style={{
          background: '#ece9d8',
          borderBottom: '1px solid #aca899',
          padding: '1px 4px',
          display: 'flex',
          alignItems: 'center',
          gap: '1px',
          fontFamily: 'Segoe UI, Tahoma, sans-serif',
        }}
      >
        {['File', 'View', 'Projects', 'Help'].map(item => (
          <button
            key={item}
            style={{
              fontSize: '11px',
              padding: '2px 7px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              color: '#000',
              borderRadius: '2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#316ac5'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#000'
            }}
          >
            {item}
          </button>
        ))}
        <div
          style={{
            marginLeft: 'auto',
            fontSize: '10px',
            color: '#888',
            fontFamily: 'inherit',
            paddingRight: '6px',
          }}
        >
          Design Garden — hover cards to explore
        </div>
      </div>

      {/* ── 3D Scene Content ────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#0d1117' }}>
        {children}
      </div>

      {/* ── XP Status Bar ───────────────────────────────────── */}
      <div
        style={{
          background: '#ece9d8',
          borderTop: '1px solid #aca899',
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontFamily: 'Segoe UI, Tahoma, sans-serif',
          color: '#555',
          gap: '6px',
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <span>{projectCount} design projects loaded</span>
          <span style={{ color: '#bbb' }}>|</span>
          <span style={{ color: '#777' }}>Drag to orbit · Scroll to zoom · Click cards to open</span>
        </div>
        <span style={{ color: '#999', flexShrink: 0 }}>Neelanshu Design Lab v1.0</span>
      </div>
    </div>
  )
}
