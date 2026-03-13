'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

/**
 * FloatingGlassCard — renders a glassmorphism HTML card anchored to
 * a 3D position via @react-three/drei's <Html> component.
 * Floats with a sine-wave animation and glows on hover.
 */
export default function FloatingGlassCard({ project, onSelect }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const baseY = project.position[1]

  // Gentle float + sway per-frame
  useFrame(state => {
    if (!groupRef.current) return
    groupRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 0.75 + project.position[0]) * 0.18
    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.22 + project.id) * 0.045
  })

  return (
    <group
      ref={groupRef}
      position={[project.position[0], project.position[1], project.position[2]]}
    >
      {/* ── Glassmorphism card rendered as DOM ── */}
      <Html
        center
        distanceFactor={7}
        occlude={false}
        style={{ pointerEvents: 'auto' }}
        zIndexRange={[50, 0]}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onSelect(project)}
          style={{
            width: '160px',
            padding: '14px 12px 12px',
            borderRadius: '16px',
            cursor: 'pointer',
            background: hovered
              ? 'rgba(255,255,255,0.30)'
              : 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            border: `1px solid rgba(255,255,255,${hovered ? 0.78 : 0.38})`,
            boxShadow: hovered
              ? `0 12px 40px rgba(31,38,135,0.38), 0 0 30px ${project.color}55, inset 0 1px 0 rgba(255,255,255,0.5)`
              : `0 6px 20px rgba(31,38,135,0.20), inset 0 1px 0 rgba(255,255,255,0.3)`,
            transform: hovered ? 'scale(1.12) translateY(-6px)' : 'scale(1) translateY(0)',
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            color: 'white',
            textAlign: 'center',
            userSelect: 'none',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          }}
        >
          {/* Emoji icon */}
          <div style={{ fontSize: '32px', marginBottom: '8px', lineHeight: 1 }}>
            {project.emoji}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '10.5px',
              fontWeight: '700',
              letterSpacing: '0.15px',
              marginBottom: '7px',
              textShadow: '0 1px 4px rgba(0,0,0,0.65)',
              lineHeight: '1.35',
            }}
          >
            {project.title}
          </div>

          {/* Tag chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '3px',
              justifyContent: 'center',
            }}
          >
            {project.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: '8px',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  background: `${project.color}2a`,
                  border: `1px solid ${project.color}65`,
                  color: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover CTA */}
          {hovered && (
            <div
              style={{
                marginTop: '10px',
                fontSize: '9px',
                color: 'rgba(255,255,255,0.88)',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                letterSpacing: '0.4px',
                fontWeight: '600',
              }}
            >
              Click to explore →
            </div>
          )}
        </div>
      </Html>

      {/* ── Glowing anchor orb ── */}
      <mesh position={[0, -0.32, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={hovered ? 4 : 1.2}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* ── Light beam to ground ── */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 2.6, 4]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={0.8}
          transparent
          opacity={hovered ? 0.55 : 0.25}
        />
      </mesh>
    </group>
  )
}
