'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sky, Html, Text } from '@react-three/drei'
import * as THREE from 'three'

// ── Project data ──────────────────────────────────────────────────────────────
export const DESIGN_PROJECTS = [
  {
    id: 1,
    title: 'SENSAI',
    shortTitle: 'SENSAI',
    description: 'SENSAI is a next-gen AI-powered wearable that monitors biometrics, detects health anomalies in real time, and delivers discreet haptic + audio feedback — designed for athletes, patients, and everyday wellness.',
    emoji: '🤖',
    tags: ['Wearable Tech', 'AI', 'Health', 'Hardware Design'],
    color: '#4facfe',
    treePos: [-9, 0, -9],
    images: [
      '/ProductDesigns/SENSAI/img1.png',
      '/ProductDesigns/SENSAI/img2.png',
      '/ProductDesigns/SENSAI/img3.png',
      '/ProductDesigns/SENSAI/img4.png',
      '/ProductDesigns/SENSAI/img5.png',
    ],
    link: null,
  },
  {
    id: 2,
    title: 'CookSense',
    shortTitle: 'CookSense',
    description: 'CookSense is a smart kitchen safety assistant that uses computer vision and AI to detect hazards — unattended flames, boiling-over pots, sharp object proximity — and sends real-time alerts to keep kitchens safe.',
    emoji: '🍳',
    tags: ['Computer Vision', 'AI', 'Safety', 'IoT'],
    color: '#f7971e',
    treePos: [-3, 0, -12],
    images: [
      '/ProductDesigns/CookSense/img1.png',
      '/ProductDesigns/CookSense/img2.png',
      '/ProductDesigns/CookSense/img3.png',
      '/ProductDesigns/CookSense/img4.png',
      '/ProductDesigns/CookSense/img5.png',
    ],
    link: null,
  },
  {
    id: 3,
    title: 'SocialSense',
    shortTitle: 'SocialSense',
    description: 'SocialSense is a social media wellbeing app that tracks screen time, detects doomscrolling patterns, mood shifts from content, and nudges users toward healthier digital habits with gentle, personalised interventions.',
    emoji: '📱',
    tags: ['App Design', 'Digital Wellbeing', 'UX', 'AI'],
    color: '#a78bfa',
    treePos: [5, 0, -12],
    images: [
      '/ProductDesigns/SocialSense/img1.png',
      '/ProductDesigns/SocialSense/img2.png',
      '/ProductDesigns/SocialSense/img3.png',
      '/ProductDesigns/SocialSense/img4.png',
    ],
    link: null,
  },
  {
    id: 4,
    title: 'SentinelEyes',
    shortTitle: 'SentinelEyes',
    description: 'SentinelEyes is an AI-powered home security concept — a sleek camera system with real-time threat classification, facial recognition for trusted visitors, and instant silent alerts to your phone.',
    emoji: '👁️',
    tags: ['Security', 'Computer Vision', 'Hardware', 'AI'],
    color: '#f43f5e',
    treePos: [11, 0, -5],
    images: [
      '/ProductDesigns/SentinelEyes/img1.png',
      '/ProductDesigns/SentinelEyes/img2.png',
      '/ProductDesigns/SentinelEyes/img3.png',
    ],
    link: null,
  },
  {
    id: 5,
    title: 'FindrTag',
    shortTitle: 'FindrTag',
    description: 'FindrTag is a minimalist Bluetooth tracker designed to be thinner than a credit card, with a crowd-sourced find network, NFC tap-to-find, and a replaceable battery — never lose your essentials again.',
    emoji: '🔍',
    tags: ['Product Design', 'IoT', 'Bluetooth', 'Hardware'],
    color: '#10b981',
    treePos: [12, 0, 4],
    images: [
      '/ProductDesigns/FindrTag/img1.png',
      '/ProductDesigns/FindrTag/img2.png',
      '/ProductDesigns/FindrTag/img3.png',
    ],
    link: null,
  },
  {
    id: 6,
    title: 'BicepBands',
    shortTitle: 'BicepBands',
    description: 'BicepBands are smart resistance bands with embedded EMG sensors that track muscle activation, rep count, and form in real time — giving gym-goers and physio patients accurate biofeedback without bulky equipment.',
    emoji: '💪',
    tags: ['Fitness Tech', 'Wearable', 'EMG Sensing', 'Hardware'],
    color: '#f59e0b',
    treePos: [8, 0, 9],
    images: [
      '/ProductDesigns/BicepBands/img1.png',
      '/ProductDesigns/BicepBands/img2.png',
      '/ProductDesigns/BicepBands/img3.png',
      '/ProductDesigns/BicepBands/img4.png',
    ],
    link: null,
  },
  {
    id: 7,
    title: 'ClipON',
    shortTitle: 'ClipON',
    description: 'ClipON is a modular clip-on device concept that adds a wide-angle lens, macro lens, or thermal camera to any smartphone in seconds — a snap-fit, no-case-needed photography upgrade.',
    emoji: '📷',
    tags: ['Accessory Design', 'Photography', 'Modular', 'Hardware'],
    color: '#06b6d4',
    treePos: [0, 0, 11],
    images: [
      '/ProductDesigns/ClipON/img1.png',
      '/ProductDesigns/ClipON/img2.png',
      '/ProductDesigns/ClipON/img3.png',
    ],
    link: null,
  },
  {
    id: 8,
    title: 'Cane',
    shortTitle: 'Cane',
    description: 'A reinvented walking cane for the visually impaired — ultrasonic sensors detect obstacles at ground and head level, haptic handles communicate direction, and a companion app connects caregivers in real time.',
    emoji: '🦯',
    tags: ['Assistive Tech', 'Accessibility', 'Hardware', 'IoT'],
    color: '#8b5cf6',
    treePos: [-8, 0, 9],
    images: [
      '/ProductDesigns/Cane/img1.png',
      '/ProductDesigns/Cane/img2.png',
      '/ProductDesigns/Cane/img3.png',
    ],
    link: null,
  },
  {
    id: 9,
    title: 'NecklaceConcept',
    shortTitle: 'NecklaceConcept',
    description: 'A luxury smart necklace concept that hides an SOS beacon, fall detection sensor, and heart rate monitor inside a beautiful pendant — personal safety that looks like fine jewellery.',
    emoji: '📿',
    tags: ['Wearable', 'Jewellery Design', 'Safety', 'Fashion Tech'],
    color: '#ec4899',
    treePos: [-12, 0, 0],
    images: [
      '/ProductDesigns/NecklaceConcept/img1.png',
      '/ProductDesigns/NecklaceConcept/img2.png',
    ],
    link: null,
  },
  {
    id: 10,
    title: 'RingConcept',
    shortTitle: 'RingConcept',
    description: 'A minimalist smart ring that tracks sleep, HRV, blood oxygen, and daily activity — with a 7-day battery, water resistance, and a companion app that surfaces health insights without the screen fatigue of a smartwatch.',
    emoji: '💍',
    tags: ['Wearable', 'Health Tech', 'Jewellery', 'Hardware'],
    color: '#f59e0b',
    treePos: [-10, 0, -5],
    images: [
      '/ProductDesigns/RingConcept/img1.png',
      '/ProductDesigns/RingConcept/img2.png',
    ],
    link: null,
  },
]

// ── Vertex-coloured ground ────────────────────────────────────────────────────
function Ground() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(80, 80, 60, 60)
    g.rotateX(-Math.PI / 2)
    const colors = []
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i)
      const n  = (Math.sin(x*0.3)*Math.cos(z*0.25)+1)*0.5
      const n2 = (Math.sin(x*0.7+1.2)*Math.sin(z*0.5-0.8)+1)*0.5
      pos.setY(i, Math.sin(x*0.18)*Math.cos(z*0.22)*0.25)
      colors.push(0.14+n*0.08+n2*0.04, 0.42+n*0.18+n2*0.06, 0.06+n*0.04)
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <mesh geometry={geo} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.95} metalness={0} />
    </mesh>
  )
}

// ── 3000 instanced animated grass blades ─────────────────────────────────────
function GrassBlades() {
  const meshRef = useRef()
  const COUNT = 3000
  const { geo, dummy, offsets } = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.06, 0.38, 1, 3)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      if (y > 0.1) pos.setX(i, pos.getX(i)+(y/0.38)*0.05)
    }
    g.computeVertexNormals()
    const d = new THREE.Object3D()
    const off = []
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random()*Math.PI*2, r = Math.random()*36
      off.push({ x:Math.cos(angle)*r, z:Math.sin(angle)*r, rot:Math.random()*Math.PI*2, scale:0.7+Math.random()*0.7, phase:Math.random()*Math.PI*2 })
    }
    return { geo:g, dummy:d, offsets:off }
  }, [])
  useEffect(() => {
    if (!meshRef.current) return
    offsets.forEach((o,i) => {
      dummy.position.set(o.x,0,o.z); dummy.rotation.y=o.rot; dummy.scale.setScalar(o.scale); dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [offsets, dummy])
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.elapsedTime
    offsets.forEach((o,i) => {
      dummy.position.set(o.x,0,o.z); dummy.rotation.y=o.rot; dummy.rotation.z=Math.sin(t*1.2+o.phase)*0.12; dummy.scale.setScalar(o.scale); dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={meshRef} args={[geo, null, COUNT]} castShadow>
      <meshStandardMaterial color="#3a9a3a" side={THREE.DoubleSide} roughness={0.9} />
    </instancedMesh>
  )
}

// ── Project tree with wooden sign board ──────────────────────────────────────
function ProjectTree({ project, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const signRef = useRef()
  const [px,,pz] = project.treePos
  const trunkH = 3.5+Math.abs(Math.sin(px*0.5))*1.2
  const crownR  = 2.0+Math.abs(Math.cos(pz*0.4))*0.8
  // Rotate sign group so it always faces inward toward the center (where player starts)
  const signAngle = Math.atan2(-px, -pz)
  useFrame(({ clock }) => {
    if (signRef.current) signRef.current.rotation.y = Math.sin(clock.elapsedTime*0.4+px)*0.04
  })
  return (
    <group position={project.treePos}>
      {/* Trunk */}
      <mesh position={[0,trunkH/2,0]} castShadow>
        <cylinderGeometry args={[0.22,0.36,trunkH,10]} />
        <meshStandardMaterial color="#5c3a1a" roughness={1} />
      </mesh>
      {/* Bark rings */}
      {[0.4,0.8,1.3,1.9,2.5].map((h,i) => (
        <mesh key={i} position={[0,h,0]}>
          <torusGeometry args={[0.28,0.018,6,12]} />
          <meshStandardMaterial color="#3e2208" roughness={1} />
        </mesh>
      ))}
      {/* Main crown */}
      <mesh position={[0,trunkH+crownR*0.5,0]} castShadow>
        <sphereGeometry args={[crownR,12,10]} />
        <meshStandardMaterial color="#1e6e1e" roughness={0.85} />
      </mesh>
      <mesh position={[0.42,trunkH+crownR*0.68,0.3]} castShadow>
        <sphereGeometry args={[crownR*0.72,10,8]} />
        <meshStandardMaterial color="#228022" roughness={0.82} />
      </mesh>
      <mesh position={[-0.3,trunkH+crownR*0.62,-0.22]} castShadow>
        <sphereGeometry args={[crownR*0.65,10,8]} />
        <meshStandardMaterial color="#196019" roughness={0.88} />
      </mesh>
      {/* Sign direction wrapper — rotated so sign always faces inward toward player */}
      <group rotation={[0, signAngle, 0]}>
      {/* Sign post */}
      <mesh position={[0,1.1,2.2]} castShadow>
        <cylinderGeometry args={[0.045,0.055,2.4,6]} />
        <meshStandardMaterial color="#6b3d10" roughness={0.95} />
      </mesh>
      {/* Sign board */}
      <group ref={signRef} position={[0,2.2,2.2]}>
        <mesh castShadow
          onPointerEnter={() => { setHovered(true); document.body.style.cursor='pointer' }}
          onPointerLeave={() => { setHovered(false); document.body.style.cursor='crosshair' }}
          onClick={() => onSelect(project)}>
          <boxGeometry args={[1.6,1.0,0.08]} />
          <meshStandardMaterial color={hovered ? '#f5e6c8' : '#ddb97a'} roughness={0.75} />
        </mesh>
        {/* Wood grain lines */}
        {[-0.3,-0.1,0.1,0.3].map((y,i) => (
          <mesh key={i} position={[0,y,0.042]}>
            <planeGeometry args={[1.48,0.011]} />
            <meshStandardMaterial color="#b8924e" transparent opacity={0.35} />
          </mesh>
        ))}
        {/* Corner nails */}
        {[[-0.65,0.38],[0.65,0.38],[-0.65,-0.38],[0.65,-0.38]].map(([nx,ny],i) => (
          <mesh key={i} position={[nx,ny,0.043]}>
            <circleGeometry args={[0.026,8]} />
            <meshStandardMaterial color="#999" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Emoji overlay */}
        <Html center position={[0,0.22,0.06]} distanceFactor={5} zIndexRange={[10,0]}>
          <div style={{ fontSize:'20px', pointerEvents:'none', userSelect:'none', filter:'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }}>
            {project.emoji}
          </div>
        </Html>
        {/* 3D title text */}
        <Text position={[0,-0.14,0.046]} fontSize={0.112} maxWidth={1.35} lineHeight={1.28} textAlign="center" color={hovered ? '#200000' : '#3b1a00'} anchorX="center" anchorY="middle">
          {project.title}
        </Text>
        {/* Hover glow */}
        {hovered && (
          <mesh position={[0,0,-0.02]}>
            <planeGeometry args={[1.7,1.1]} />
            <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={0.45} transparent opacity={0.22} />
          </mesh>
        )}
      </group>
      </group>{/* end signAngle wrapper */}
    </group>
  )
}

// ── Background decorative trees ───────────────────────────────────────────────
const DECO_POSITIONS = [[-6,0,-14],[4,0,-15],[14,0,-10],[15,0,-2],[14,0,7],[4,0,14],[-4,0,14],[-14,0,7],[-15,0,-2],[-14,0,-10],[0,0,-16],[8,0,-16],[-8,0,-16],[16,0,0],[-16,0,0]]

function DecoTree({ position }) {
  const [px,,pz] = position
  const trunkH = 2.8+Math.abs(Math.sin(px*0.7))*1.4
  const crownR  = 1.6+Math.abs(Math.cos(pz*0.5))*0.9
  return (
    <group position={position}>
      <mesh position={[0,trunkH/2,0]} castShadow>
        <cylinderGeometry args={[0.18,0.28,trunkH,8]} />
        <meshStandardMaterial color="#5a3618" roughness={1} />
      </mesh>
      <mesh position={[0,trunkH+crownR*0.45,0]} castShadow>
        <sphereGeometry args={[crownR,10,8]} />
        <meshStandardMaterial color="#1a5c1a" roughness={0.88} />
      </mesh>
      <mesh position={[0.35,trunkH+crownR*0.65,0.2]} castShadow>
        <sphereGeometry args={[crownR*0.68,8,6]} />
        <meshStandardMaterial color="#228022" roughness={0.85} />
      </mesh>
    </group>
  )
}

// ── Fireflies ─────────────────────────────────────────────────────────────────
function Fireflies() {
  const ref = useRef()
  const COUNT = 55
  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT*3)
    for (let i = 0; i < COUNT; i++) {
      arr[i*3]=(Math.random()-0.5)*28; arr[i*3+1]=0.5+Math.random()*3.5; arr[i*3+2]=(Math.random()-0.5)*28
    }
    return arr
  }, [])
  useFrame(({ clock }) => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array
    const t = clock.elapsedTime
    for (let i = 0; i < COUNT; i++) arr[i*3+1]=0.5+Math.sin(t*0.7+i*1.3)*1.2+1.5
    ref.current.geometry.attributes.position.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#ffe066" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

// ── Scattered rocks ───────────────────────────────────────────────────────────
function Rocks() {
  const rocks = useMemo(() => {
    const r = []
    for (let i = 0; i < 20; i++) {
      const a=(i/20)*Math.PI*2, d=5+Math.random()*12
      r.push({ x:Math.cos(a)*d+(Math.random()-0.5)*4, z:Math.sin(a)*d+(Math.random()-0.5)*4, s:0.12+Math.random()*0.22, ry:Math.random()*Math.PI })
    }
    return r
  }, [])
  return <>{rocks.map((r,i) => (
    <mesh key={i} position={[r.x,r.s*0.4,r.z]} rotation={[0,r.ry,0.15]} castShadow>
      <dodecahedronGeometry args={[r.s,0]} />
      <meshStandardMaterial color="#888880" roughness={0.95} metalness={0.05} />
    </mesh>
  ))}</>
}

// ── Wooden path ───────────────────────────────────────────────────────────────
function WoodPath() {
  return <>{[-5,-3.6,-2.2,-0.8,0.8,2.2,3.6,5].map((z,i) => (
    <mesh key={i} position={[0,0.02,z]} rotation={[0,i%2===0?0.04:-0.03,0]}>
      <boxGeometry args={[1.1,0.055,1.2]} />
      <meshStandardMaterial color="#b8864e" roughness={0.88} />
    </mesh>
  ))}</>
}

// ── First-person WASD controller with pointer lock ────────────────────────────
function PlayerController({ onNearSign }) {
  const { camera } = useThree()
  const keys   = useRef({})
  const vel    = useRef(new THREE.Vector3())
  const yaw    = useRef(0)
  const pitch  = useRef(0)
  const drag   = useRef({ active: false, lastX: 0, lastY: 0, moved: false })

  useEffect(() => {
    camera.position.set(0,1.65,6)
    camera.rotation.order = 'YXZ'
  }, [camera])

  useEffect(() => {
    const dn = e => { keys.current[e.code]=true }
    const up = e => { keys.current[e.code]=false }
    window.addEventListener('keydown', dn)
    window.addEventListener('keyup',   up)
    return () => { window.removeEventListener('keydown',dn); window.removeEventListener('keyup',up) }
  }, [])

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    // Drag-to-look: hold left mouse button and drag to rotate camera.
    // A plain click (no drag) passes through to R3F's onClick on 3D objects.
    const onDown = e => {
      if (e.button !== 0) return
      drag.current = { active: true, lastX: e.clientX, lastY: e.clientY, moved: false }
    }
    const onMove = e => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.lastX
      const dy = e.clientY - drag.current.lastY
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.current.moved = true
      if (drag.current.moved) {
        yaw.current   -= dx * 0.003
        pitch.current  = Math.max(-0.85, Math.min(0.85, pitch.current - dy * 0.003))
      }
      drag.current.lastX = e.clientX
      drag.current.lastY = e.clientY
    }
    const onUp = () => { drag.current.active = false }
    canvas.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      canvas.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [])

  useFrame((_, delta) => {
    const k = keys.current
    const forward = new THREE.Vector3(-Math.sin(yaw.current),0,-Math.cos(yaw.current))
    const right   = new THREE.Vector3( Math.cos(yaw.current),0,-Math.sin(yaw.current))
    const dir = new THREE.Vector3()
    if (k['KeyW']    || k['ArrowUp'])    dir.addScaledVector(forward, 1)
    if (k['KeyS']    || k['ArrowDown'])  dir.addScaledVector(forward,-1)
    if (k['KeyA']    || k['ArrowLeft'])  dir.addScaledVector(right,  -1)
    if (k['KeyD']    || k['ArrowRight']) dir.addScaledVector(right,   1)
    dir.normalize()
    vel.current.lerp(dir.multiplyScalar(4.5), 0.18)
    camera.position.addScaledVector(vel.current, delta)
    camera.position.x = Math.max(-14, Math.min(14, camera.position.x))
    camera.position.z = Math.max(-14, Math.min(14, camera.position.z))
    camera.position.y = 1.65
    camera.rotation.y = yaw.current
    camera.rotation.x = pitch.current
    let nearest=null, nearDist=4
    DESIGN_PROJECTS.forEach(p => {
      const dx=camera.position.x-p.treePos[0], dz=camera.position.z-p.treePos[2]
      const d=Math.sqrt(dx*dx+dz*dz)
      if (d<nearDist) { nearDist=d; nearest=p }
    })
    onNearSign(nearest)
  })
  return null
}

// ── Welcome / intro sign board at entrance ──────────────────────────────────
function WelcomeBoard() {
  // Short cute foot-height signboard
  const postH  = 0.52   // post ends here
  const boardH = 0.68
  const boardW = 1.90
  const boardY = postH + boardH / 2 + 0.05  // board sits just above post top — no overlap

  // North-east of player spawn [0,1.65,6], rotated to face the player
  const bx = 3.0, bz = 2.0
  const rotY = Math.atan2(0 - bx, 6 - bz)  // angle from board → player

  return (
    <group position={[bx, 0, bz]} rotation={[0, rotY, 0]}>
      {/* Short post — stays fully below the board */}
      <mesh position={[0, postH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.07, postH, 8]} />
        <meshStandardMaterial color="#6b3d10" roughness={0.95} />
      </mesh>
      {/* Board backing */}
      <mesh position={[0, boardY, 0]} castShadow>
        <boxGeometry args={[boardW, boardH, 0.085]} />
        <meshStandardMaterial color="#c8954a" roughness={0.72} />
      </mesh>
      {/* Front face */}
      <mesh position={[0, boardY, 0.044]}>
        <planeGeometry args={[boardW - 0.1, boardH - 0.08]} />
        <meshStandardMaterial color="#ddb97a" roughness={0.68} />
      </mesh>
      {/* Wood grain lines */}
      {[-0.2, 0, 0.2].map((y, i) => (
        <mesh key={i} position={[0, boardY + y, 0.047]}>
          <planeGeometry args={[boardW - 0.14, 0.009]} />
          <meshStandardMaterial color="#b8924e" transparent opacity={0.3} />
        </mesh>
      ))}
      {/* Corner nails */}
      {[[-0.82, 0.26], [0.82, 0.26], [-0.82, -0.26], [0.82, -0.26]].map(([nx, ny], i) => (
        <mesh key={i} position={[nx, boardY + ny, 0.048]}>
          <circleGeometry args={[0.026, 8]} />
          <meshStandardMaterial color="#aaa" metalness={0.85} roughness={0.25} />
        </mesh>
      ))}
      {/* Emoji */}
      <Html center position={[0, boardY + 0.18, 0.07]} distanceFactor={4} zIndexRange={[10, 0]}>
        <div style={{ fontSize: '13px', pointerEvents: 'none', userSelect: 'none', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.4))' }}>
          🦯
        </div>
      </Html>
      {/* Title */}
      <Text
        position={[0, boardY + 0.04, 0.048]}
        fontSize={0.135}
        maxWidth={1.72}
        lineHeight={1.2}
        textAlign="center"
        color="#2a0e00"
        anchorX="center"
        anchorY="middle"
      >
        {'Products For Blinds'}
      </Text>
      {/* Subtitle */}
      <Text
        position={[0, boardY - 0.2, 0.048]}
        fontSize={0.072}
        maxWidth={1.68}
        lineHeight={1.25}
        textAlign="center"
        color="#5a2e00"
        anchorX="center"
        anchorY="middle"
      >
        {'Main project · all designs\nare made under this'}
      </Text>
      {/* Warm glow behind board */}
      <mesh position={[0, boardY, -0.025]}>
        <planeGeometry args={[boardW + 0.2, boardH + 0.18]} />
        <meshStandardMaterial color="#f5c060" emissive="#f5c060" emissiveIntensity={0.2} transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

// ── Lighting + sky ────────────────────────────────────────────────────────────
function SceneLighting() {
  return (
    <>
      <Sky sunPosition={[80,35,100]} turbidity={3} rayleigh={0.5} mieCoefficient={0.006} mieDirectionalG={0.82} />
      <ambientLight intensity={0.72} color="#fff5e8" />
      <directionalLight position={[12,22,8]} intensity={1.6} castShadow color="#ffe8c8"
        shadow-mapSize={[1024,1024]} shadow-camera-near={0.5} shadow-camera-far={80}
        shadow-camera-left={-22} shadow-camera-right={22} shadow-camera-top={22} shadow-camera-bottom={-22} />
      <hemisphereLight skyColor="#87ceeb" groundColor="#3a7a2a" intensity={0.5} />
      <fog attach="fog" args={['#b8d8a0',18,55]} />
    </>
  )
}

// ── Main exported scene ───────────────────────────────────────────────────────
export default function GrassScene({ onSelectProject }) {
  const [nearProject, setNearProject] = useState(null)
  return (
    <div style={{ width:'100%', height:'100%', position:'relative' }}>
      <Canvas camera={{ position:[0,1.65,6], fov:72, near:0.1, far:120 }} shadows
        gl={{ antialias:true, alpha:false }}
        style={{ width:'100%', height:'100%', cursor:'crosshair', display:'block' }}>
        <SceneLighting />
        <Ground />
        <GrassBlades />
        <WoodPath />
        <Rocks />
        <Fireflies />
        <WelcomeBoard />
        {DESIGN_PROJECTS.map(p => <ProjectTree key={p.id} project={p} onSelect={onSelectProject} />)}
        {DECO_POSITIONS.map((pos,i) => <DecoTree key={i} position={pos} />)}
        <PlayerController onNearSign={setNearProject} />
      </Canvas>

      {/* Crosshair */}
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:20, height:20, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'50%', left:0, right:0, height:1.5, background:'rgba(255,255,255,0.7)', transform:'translateY(-50%)' }} />
        <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:1.5, background:'rgba(255,255,255,0.7)', transform:'translateX(-50%)' }} />
      </div>

      {/* HUD — proximity prompt */}
      {nearProject ? (
        <div style={{ position:'absolute', bottom:18, left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', border:'1.5px solid '+nearProject.color+'88', borderRadius:8, padding:'10px 22px', color:'white', fontSize:12, fontFamily:'Segoe UI,Tahoma,sans-serif', textAlign:'center', pointerEvents:'none', boxShadow:'0 0 20px '+nearProject.color+'44', whiteSpace:'nowrap' }}>
          <span style={{ fontSize:18 }}>{nearProject.emoji}</span>
          {'  '}<strong>{nearProject.shortTitle}</strong>{'  ·  '}
          <span style={{ opacity:0.7 }}>Click the sign to view project</span>
        </div>
      ) : (
        <div style={{ position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)', color:'rgba(255,255,255,0.55)', fontSize:11, fontFamily:'Segoe UI,Tahoma,sans-serif', textShadow:'0 1px 3px rgba(0,0,0,0.9)', pointerEvents:'none', textAlign:'center', whiteSpace:'nowrap', letterSpacing:'0.3px' }}>
          WASD / Arrow Keys to walk  ·  Click & drag to look around  ·  Click a sign to open
        </div>
      )}
    </div>
  )
}
