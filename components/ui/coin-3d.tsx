'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

function GoldCoin() {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useLoader(TextureLoader, '/watermark.png')

  // Gold materials: rim | front face (with texture) | back face
  const materials = useMemo(() => [
    new THREE.MeshStandardMaterial({ color: '#C8860A', metalness: 0.98, roughness: 0.04 }),
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.85, roughness: 0.12, color: '#FFD700' }),
    new THREE.MeshStandardMaterial({ color: '#C8860A', metalness: 0.98, roughness: 0.04 }),
  ], [texture])

  // Slow continuous Y-axis rotation
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={groupRef} rotation={[-0.18, 0, 0]}>
      <mesh material={materials} castShadow>
        <cylinderGeometry args={[1, 1, 0.14, 80]} />
      </mesh>
      {/* Subtle gold rim ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.0, 0.025, 16, 80]} />
        <meshStandardMaterial color="#FFB700" metalness={0.99} roughness={0.02} />
      </mesh>
    </group>
  )
}

export default function Coin3D() {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      style={{ width: 'min(85vw, 600px)', height: 'min(85vw, 600px)', opacity: 0.13 }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting for premium gold look */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={2.5} color="#FFF5CC" />
        <directionalLight position={[-4, -2, 3]} intensity={0.8} color="#FF8A00" />
        <pointLight position={[0, 3, 2]} intensity={1.2} color="#FFD700" />
        <pointLight position={[0, -3, -2]} intensity={0.4} color="#C8860A" />

        <Suspense fallback={null}>
          <GoldCoin />
        </Suspense>
      </Canvas>
    </div>
  )
}
