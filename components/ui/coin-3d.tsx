'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function GoldCoinMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const texture = useTexture('/watermark.png')

  // Ensure correct orientation and wrapping
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.colorSpace = THREE.SRGBColorSpace

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={groupRef} rotation={[-0.18, 0, 0]}>
      {/* Coin body */}
      <mesh>
        <cylinderGeometry args={[1, 1, 0.14, 80]} />
        {/* Side / rim — gold */}
        <meshStandardMaterial attach="material-0" color="#C8860A" metalness={0.97} roughness={0.04} />
        {/* Top face — watermark texture */}
        <meshStandardMaterial attach="material-1" map={texture} metalness={0.75} roughness={0.2} />
        {/* Bottom face — gold */}
        <meshStandardMaterial attach="material-2" color="#C8860A" metalness={0.97} roughness={0.04} />
      </mesh>
      {/* Gold edge torus */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.01, 0.022, 12, 80]} />
        <meshStandardMaterial color="#FFD700" metalness={0.99} roughness={0.02} />
      </mesh>
    </group>
  )
}

// Shown while the texture is loading
function PlaceholderCoin() {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.5
  })
  return (
    <mesh ref={meshRef} rotation={[-0.18, 0, 0]}>
      <cylinderGeometry args={[1, 1, 0.14, 64]} />
      <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.05} />
    </mesh>
  )
}

export default function Coin3D() {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      style={{ width: 560, height: 560, opacity: 0.18 }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 3], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={2.8} color="#FFF5CC" />
        <directionalLight position={[-4, -2, 3]} intensity={1.0} color="#FF8A00" />
        <pointLight position={[0, 4, 2]} intensity={1.5} color="#FFD700" />
        <pointLight position={[0, -3, -2]} intensity={0.5} color="#C8860A" />

        <Suspense fallback={<PlaceholderCoin />}>
          <GoldCoinMesh />
        </Suspense>
      </Canvas>
    </div>
  )
}
