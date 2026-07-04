"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@/hooks/use-wallet"

// Wallet SVG icons inline (no external deps)
const WalletIcons: Record<string, React.ReactNode> = {
  MetaMask: (
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.3 3L22.1 13.6l2.6-6.1L36.3 3z" fill="#E17726" stroke="#E17726" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.7 3l14.1 10.7-2.5-6.2L3.7 3z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M31.2 27.6l-3.8 5.8 8.1 2.2 2.3-7.9-6.6-.1zM2.2 27.7l2.3 7.9 8.1-2.2-3.8-5.8-6.6.1z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.1 18.3l-2.2 3.4 7.9.4-.3-8.5-5.4 4.7zM27.9 18.3l-5.5-4.8-.2 8.6 7.9-.4-2.2-3.4z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6 33.4l4.8-2.3-4.1-3.2-.7 5.5zM22.6 31.1l4.8 2.3-.7-5.5-4.1 3.2z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M27.4 33.4l-4.8-2.3.4 3.1-.1 2.4 4.5-3.2zM12.6 33.4l4.5 3.2-.1-2.4.4-3.1-4.8 2.3z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17.2 25.5l-3.9-1.2 2.8-1.3 1.1 2.5zM22.8 25.5l1.1-2.5 2.8 1.3-3.9 1.2z" fill="#233447" stroke="#233447" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.6 33.4l.7-5.8-4.5.1 3.8 5.7zM26.7 27.6l.7 5.8 3.8-5.7-4.5-.1zM30.1 21.7l-7.9.4.7 4.4 1.1-2.5 2.8 1.3 3.3-3.6zM13.3 24.9l2.8-1.3 1.1 2.5.7-4.4-7.9-.4 3.3 3.6z" fill="#CC6228" stroke="#CC6228" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.9 21.7l3.3 6.5-.1-3.3-3.2-3.2zM26.9 24.9l-.1 3.3 3.3-6.5-3.2 3.2zM17.9 22.1l-.7 4.4.9 4.6.2-6.1-.4-2.9zM22.1 22.1l-.4 2.9.2 6.1.9-4.6-.7-4.4z" fill="#E27525" stroke="#E27525" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22.8 25.5l-.9 4.6.6.5 4.1-3.2.1-3.3-3.9 1.4zM13.3 23.1l.1 3.3 4.1 3.2.6-.5-.9-4.6-3.9-1.4z" fill="#F5841F" stroke="#F5841F" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22.9 36.6l.1-2.4-.3-.3h-5.4l-.3.3.1 2.4-4.5-3.2 1.6 1.3 3.2 2.2h5.5l3.2-2.2 1.6-1.3-4.8 3.2z" fill="#C0AC9D" stroke="#C0AC9D" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22.6 31.1l-.6-.5h-3.9l-.6.5-.4 3.1.3-.3h5.4l.3.3-.5-3.1z" fill="#161616" stroke="#161616" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M37 14.4l1.2-5.7L36.3 3l-13.7 10.2 5.3 4.5 7.4 2.2 1.7-1.9-.7-.5 1.1-1-.9-.7 1.1-.9-.6-.4zM1.8 8.7L3 14.4l-.7.4 1.1.9-.8.7 1.1 1-.7.5 1.7 1.9 7.4-2.2 5.3-4.5L3.7 3 1.8 8.7z" fill="#763E1A" stroke="#763E1A" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M35.3 20l-7.4-2.2 2.2 3.4-3.3 6.5 4.4-.1h6.6l-2.5-7.6zM12.1 17.8L4.7 20 2.2 27.6h6.6l4.4.1-3.3-6.5 2.2-3.4zM22.2 22.1l.5-8.3 2.1-5.7h-9.6l2.1 5.7.5 8.3.2 2.9v6.1h3.9v-6.1l.3-2.9z" fill="#F5841F" stroke="#F5841F" strokeWidth=".25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  WalletConnect: (
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#3B99FC"/>
      <path d="M12.5 16.9c4.1-4 10.9-4 15 0l.5.5a.5.5 0 0 1 0 .7l-1.7 1.7a.3.3 0 0 1-.4 0l-.7-.7c-2.9-2.8-7.5-2.8-10.4 0l-.7.7a.3.3 0 0 1-.4 0L12 17.6a.5.5 0 0 1 0-.7l.5-.5zm18.5 3.4l1.5 1.5a.5.5 0 0 1 0 .7l-6.8 6.6a.5.5 0 0 1-.7 0l-4.8-4.7a.1.1 0 0 0-.2 0l-4.8 4.7a.5.5 0 0 1-.7 0L7.5 22.5a.5.5 0 0 1 0-.7L9 20.3a.5.5 0 0 1 .7 0l4.8 4.7a.1.1 0 0 0 .2 0l4.8-4.7a.5.5 0 0 1 .7 0l4.8 4.7a.1.1 0 0 0 .2 0l4.8-4.7a.5.5 0 0 1 .7 0z" fill="white"/>
    </svg>
  ),
  Coinbase: (
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#0052FF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12 12-5.4 12-12S26.6 8 20 8zm-3 9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6z" fill="white"/>
    </svg>
  ),
  Trust: (
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#0500FF"/>
      <path d="M20 9l-9 4v7c0 5.5 3.8 10.6 9 12 5.2-1.4 9-6.5 9-12v-7l-9-4z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
      <path d="M16 20l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Rainbow: (
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rb" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="30%" stopColor="#FFE66D"/>
          <stop offset="60%" stopColor="#4ECDC4"/>
          <stop offset="100%" stopColor="#A855F7"/>
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#rb)"/>
      <path d="M10 24c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M13 24c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeOpacity="0.7"/>
      <path d="M16 24c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.5"/>
    </svg>
  ),
  Phantom: (
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#AB9FF2"/>
      <path d="M29.5 20.5c0 5.2-4.3 9.5-9.5 9.5-5.2 0-9.5-4.3-9.5-9.5S14.8 11 20 11c5.2 0 9.5 4.3 9.5 9.5z" fill="#551BF9"/>
      <path d="M23 18h1.5a.5.5 0 0 1 .5.5v3a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4v-3a.5.5 0 0 1 .5-.5H16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17.5 16a2.5 2.5 0 0 1 5 0v2h-5v-2z" fill="white"/>
    </svg>
  ),
}

const WALLETS = [
  { id: "MetaMask", name: "MetaMask", desc: "Popular Ethereum wallet" },
  { id: "WalletConnect", name: "WalletConnect", desc: "Connect any mobile wallet" },
  { id: "Coinbase", name: "Coinbase Wallet", desc: "Easy & secure wallet" },
  { id: "Trust", name: "Trust Wallet", desc: "Multi-chain mobile wallet" },
  { id: "Rainbow", name: "Rainbow", desc: "Fun & beautiful wallet" },
  { id: "Phantom", name: "Phantom", desc: "Solana & Ethereum" },
]

interface WalletModalProps {
  open: boolean
  onClose: () => void
}

export function WalletModal({ open, onClose }: WalletModalProps) {
  const { wallet, connect, disconnect } = useWallet()
  const [connecting, setConnecting] = useState<string | null>(null)

  async function handleConnect(walletId: string, walletName: string) {
    setConnecting(walletId)
    const result = await connect(walletName)
    setConnecting(null)
    if (result?.success) onClose()
  }

  function handleDisconnect() {
    disconnect()
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(145deg, #1a1a1a, #111)" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div>
                  <h2 className="text-white font-semibold text-base">Connect Wallet</h2>
                  <p className="text-white/40 text-xs mt-0.5">Choose your preferred wallet</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Connected State */}
              {wallet.isConnected && wallet.address ? (
                <div className="p-5 flex flex-col gap-4">
                  <div
                    className="flex items-center gap-3 p-4 rounded-xl border"
                    style={{ borderColor: "#FF8A00", background: "rgba(255,138,0,0.08)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "linear-gradient(135deg,#FF8A00,#e67600)" }}
                    >
                      {wallet.address.slice(2, 4).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium font-mono">{wallet.shortAddress}</p>
                      <p className="text-white/40 text-xs mt-0.5">
                        {wallet.chainId === 1 ? "Ethereum Mainnet" :
                         wallet.chainId === 137 ? "Polygon" :
                         wallet.chainId === 56 ? "BNB Chain" :
                         `Chain ID: ${wallet.chainId}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">Connected</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDisconnect}
                    className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                /* Wallet List */
                <div className="p-3 flex flex-col gap-1.5">
                  {wallet.error && (
                    <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-1">
                      {wallet.error}
                    </div>
                  )}
                  {WALLETS.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => handleConnect(w.id, w.name)}
                      disabled={!!connecting}
                      className="group flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-white/5 transition-all active:scale-[0.98] disabled:opacity-60 text-left"
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                        {WalletIcons[w.id]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium">{w.name}</p>
                        <p className="text-white/40 text-xs">{w.desc}</p>
                      </div>
                      {connecting === w.id ? (
                        <svg className="w-4 h-4 text-orange-400 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25"/>
                          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="px-5 py-3 border-t border-white/5 flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span className="text-white/30 text-xs">Secured by Web3 Protocol</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
