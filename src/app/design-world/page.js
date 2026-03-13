'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import XPWindow from '../components/XPWindow'
import { DESIGN_PROJECTS } from '../components/GrassScene'

// Load the Three.js scene client-side only (avoids SSR canvas issues)
const GrassScene = dynamic(() => import('../components/GrassScene'), { ssr: false })

// ── Boot dialog shown before the XP window opens ─────────────────────────────
function BootDialog({ progress }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.72)',
      }}
    >
      <div
        style={{
          width: '380px',
          background: '#ece9d8',
          border: '3px solid #0a246a',
          outline: '1px solid #4a8af4',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '6px 6px 24px rgba(0,0,0,0.65)',
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        }}
      >
        {/* XP title bar */}
        <div
          style={{
            background: 'linear-gradient(180deg, #2a7ce8 0%, #1a5cd0 35%, #0a3aa8 100%)',
            padding: '5px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px' }}>🧪</span>
          <span
            style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            Running Program...
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '22px 24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <span style={{ fontSize: '36px' }}>🧪</span>
            <div>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#0a246a', marginBottom: '3px' }}>
                Neelanshu Design Lab.exe
              </div>
              <div style={{ fontSize: '11px', color: '#555' }}>
                Loading design garden environment...
              </div>
            </div>
          </div>

          {/* XP-style progress bar */}
          <div
            style={{
              background: '#c8c4bc',
              height: '22px',
              border: '2px inset #888',
              borderRadius: '2px',
              overflow: 'hidden',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(180deg, #4a9cff 0%, #0058e8 100%)',
                transition: 'width 0.12s linear',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '10px', color: 'white', fontWeight: '700', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {progress}%
              </span>
            </div>
          </div>

          <div style={{ fontSize: '10.5px', color: '#777' }}>
            {progress < 30
              ? 'Initializing design environment...'
              : progress < 60
              ? 'Loading 3D grass scene...'
              : progress < 90
              ? 'Placing 10 product design trees...'
              : 'Almost ready — entering Design Garden...'}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Project detail modal ──────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const [imgIdx, setImgIdx] = useState(0)
  const images = project.images || []

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.78)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '520px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          background: '#ece9d8',
          border: '3px solid #0a246a',
          outline: '1px solid #4a8af4',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '6px 8px 32px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* XP title bar */}
        <div
          style={{
            background: 'linear-gradient(180deg, #2a7ce8 0%, #1a5cd0 35%, #0a3aa8 100%)',
            padding: '5px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span>{project.emoji}</span>
            <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
              {project.shortTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ width: '22px', height: '20px', background: 'linear-gradient(180deg, #f06040 0%, #c02000 100%)', border: '1px solid #801000', borderRadius: '3px', color: 'white', fontSize: '11px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{ overflowY: 'auto', padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Image gallery */}
          {images.length > 0 && (
            <div>
              {/* Main image */}
              <div style={{ position: 'relative', width: '100%', paddingTop: '56%', background: '#1a1a1a', borderRadius: '4px', overflow: 'hidden', border: '2px inset #888', marginBottom: '8px' }}>
                <img
                  src={images[imgIdx]}
                  alt={project.shortTitle}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                />
                {/* Prev / Next arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
                      style={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', color: 'white', width: 28, height: 28, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >‹</button>
                    <button
                      onClick={() => setImgIdx(i => (i + 1) % images.length)}
                      style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '3px', color: 'white', width: 28, height: 28, cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >›</button>
                  </>
                )}
                {/* Image counter */}
                <div style={{ position: 'absolute', bottom: 6, right: 8, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 10, padding: '2px 7px', borderRadius: 10 }}>
                  {imgIdx + 1} / {images.length}
                </div>
              </div>
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
                  {images.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setImgIdx(i)}
                      style={{ flexShrink: 0, width: 54, height: 40, border: i === imgIdx ? `2px solid ${project.color}` : '2px solid #aaa', borderRadius: 3, overflow: 'hidden', cursor: 'pointer', opacity: i === imgIdx ? 1 : 0.6, transition: 'opacity 0.15s' }}
                    >
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Title + description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{project.emoji}</span>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#0a246a', margin: 0 }}>
                {project.shortTitle}
              </h2>
            </div>
            <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.65', margin: 0 }}>
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map(tag => (
              <span
                key={tag}
                style={{ padding: '3px 11px', borderRadius: '12px', background: `${project.color}22`, border: `1px solid ${project.color}55`, color: project.color, fontSize: '11px', fontWeight: '600' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 20px', fontSize: '12px', background: 'linear-gradient(180deg, #f8f4f0 0%, #d0ccc8 100%)', border: '2px outset #a0a0a0', borderRadius: '3px', color: '#000', textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >View Project</a>
            ) : (
              <button
                disabled
                style={{ padding: '6px 20px', fontSize: '12px', background: '#d8d4cc', border: '2px outset #a0a0a0', borderRadius: '3px', color: '#888', cursor: 'not-allowed', fontFamily: 'inherit' }}
              >Coming Soon</button>
            )}
            <button
              onClick={onClose}
              style={{ padding: '6px 20px', fontSize: '12px', background: 'linear-gradient(180deg, #f8f4f0 0%, #d0ccc8 100%)', border: '2px outset #a0a0a0', borderRadius: '3px', color: '#000', cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(180deg, #ffffff 0%, #e0dcd8 100%)'}
              onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(180deg, #f8f4f0 0%, #d0ccc8 100%)'}
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DesignWorld() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState(null)
  const [bootProgress, setBootProgress] = useState(0)
  const [isBooting, setIsBooting] = useState(true)

  // Simulate program-loading progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsBooting(false), 350)
          return 100
        }
        // Speed up at the end for snappiness
        return prev + (prev > 85 ? 4 : prev > 60 ? 2.5 : 1.8)
      })
    }, 55)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: "url('/images/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Boot loading dialog */}
      {isBooting && <BootDialog progress={Math.min(100, Math.floor(bootProgress))} />}

      {/* XP Window with 3D scene — fade in after boot */}
      <div
        style={{
          opacity: isBooting ? 0 : 1,
          transform: isBooting ? 'scale(0.97)' : 'scale(1)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <XPWindow
          title="Neelanshu Design Lab.exe"
          onClose={() => router.push('/')}
          projectCount={DESIGN_PROJECTS.length}
        >
          {!isBooting && (
            <GrassScene onSelectProject={setSelectedProject} />
          )}
        </XPWindow>
      </div>

      {/* Project detail modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
