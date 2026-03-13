'use client'

import { Sky } from '@react-three/drei'

/**
 * SkyEnvironment — wraps the Three.js sky dome + scene lighting.
 * Must be used inside a <Canvas> context.
 */
export default function SkyEnvironment() {
  return (
    <>
      {/* Realistic atmospheric sky dome */}
      <Sky
        distance={450000}
        sunPosition={[100, 40, 100]}
        inclination={0.55}
        azimuth={0.25}
        turbidity={2}
        rayleigh={0.4}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Warm ambient fill */}
      <ambientLight intensity={0.75} color="#fff8f0" />

      {/* Main sun directional light with shadows */}
      <directionalLight
        position={[10, 20, 8]}
        intensity={1.5}
        castShadow
        color="#fff5e0"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={100}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Hemisphere light: sky blue from above, soft green from below */}
      <hemisphereLight skyColor="#87ceeb" groundColor="#4aad52" intensity={0.45} />
    </>
  )
}
