'use client'

import { motion } from 'framer-motion'

export default function Coin3D() {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      style={{ width: 520, height: 520, opacity: 0.2 }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,183,0,0.08) 30%, transparent 70%)',
        }}
      />

      {/* Coin image with 3D rotateY flip */}
      <motion.img
        src="/watermark.png"
        alt="Elite Force Coin"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transformPerspective: 900,
        }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
