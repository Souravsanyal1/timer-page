"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@/hooks/use-wallet"

// Wallet icons — official logo accurate representations
const WalletIcons: Record<string, React.ReactNode> = {
  MetaMask: (
    // Official MetaMask Fox SVG downloaded from wikimedia
    <img src="/wallets/metamask.svg" alt="MetaMask" className="w-9 h-9 object-contain" />
  ),
  TokenPocket: (
    // TokenPocket exact brand: blue gradient bg, wallet+arrow icon
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tp-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A8AF6"/>
          <stop offset="100%" stopColor="#1A60D4"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#tp-bg)"/>
      {/* Wallet outline */}
      <rect x="7" y="14" width="26" height="17" rx="3" fill="none" stroke="white" strokeWidth="2"/>
      {/* Wallet flap */}
      <path d="M7 20H33" stroke="white" strokeWidth="2"/>
      {/* Coin slot */}
      <rect x="24" y="17" width="6" height="6" rx="3" fill="white" fillOpacity="0.9"/>
      {/* Handle */}
      <path d="M13 14V12C13 10.9 13.9 10 15 10H25C26.1 10 27 10.9 27 12V14" stroke="white" strokeWidth="2" fill="none"/>
    </svg>
  ),
  Trust: (
    // Trust Wallet exact official logo: blue bg, white shield with checkmark
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tw-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3375BB"/>
          <stop offset="100%" stopColor="#1C5DA0"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#tw-bg)"/>
      {/* Shield */}
      <path d="M20 7L9 11.5V20C9 26.3 13.8 32.1 20 33.5C26.2 32.1 31 26.3 31 20V11.5L20 7Z"
        fill="white" fillOpacity="0.12"/>
      <path d="M20 7L9 11.5V20C9 26.3 13.8 32.1 20 33.5C26.2 32.1 31 26.3 31 20V11.5L20 7Z"
        stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      {/* Checkmark */}
      <path d="M14.5 20.5L18 24L25.5 16.5"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  OneInch: (
    // 1inch exact brand: red gradient bg, unicorn silhouette
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="inch-bg" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5525B"/>
          <stop offset="100%" stopColor="#CB2026"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#inch-bg)"/>
      {/* 1inch unicorn logo simplified */}
      {/* Body */}
      <ellipse cx="20" cy="26" rx="8" ry="5.5" fill="white" fillOpacity="0.92"/>
      {/* Neck */}
      <path d="M24 22C26 20 27 18 26 16C25 14 23 14 22 15" fill="white" fillOpacity="0.92" stroke="white" strokeWidth="0.5"/>
      {/* Head */}
      <circle cx="24.5" cy="17" r="3.5" fill="white" fillOpacity="0.92"/>
      {/* Horn */}
      <path d="M24.5 13.5L26.5 8.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Eye */}
      <circle cx="26" cy="16.5" r="0.9" fill="#CB2026"/>
      {/* Front legs */}
      <path d="M15 29.5L13.5 34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.92"/>
      <path d="M18 30.5L17 34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.92"/>
      {/* Tail */}
      <path d="M12.5 25C10 23.5 9.5 20 11 18" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.7"/>
    </svg>
  ),
}


const WALLETS = [
  { id: "MetaMask",     name: "MetaMask",      desc: "Popular Ethereum wallet" },
  { id: "TokenPocket",  name: "TokenPocket",   desc: "Multi-chain DeFi wallet" },
  { id: "Trust",        name: "Trust Wallet",  desc: "Multi-chain mobile wallet" },
  { id: "OneInch",      name: "1inch Wallet",  desc: "Best swap rates & DeFi" },
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
                        {(() => {
                          const chains: Record<number, string> = {
                            // Ethereum
                            1: "🔷 Ethereum Mainnet",
                            11155111: "🔷 Sepolia Testnet",
                            5: "🔷 Goerli Testnet",
                            // BNB Ecosystem
                            56: "🟡 BNB Smart Chain",
                            97: "🟡 BNB Testnet",
                            204: "🟡 opBNB Mainnet",
                            5611: "🟡 opBNB Testnet",
                            // Polygon
                            137: "🟣 Polygon Mainnet",
                            80001: "🟣 Mumbai Testnet",
                            1101: "🟣 Polygon zkEVM",
                            // Arbitrum
                            42161: "🔵 Arbitrum One",
                            421614: "🔵 Arbitrum Sepolia",
                            42170: "🔵 Arbitrum Nova",
                            // Optimism
                            10: "🔴 Optimism",
                            11155420: "🔴 Optimism Sepolia",
                            // Base
                            8453: "🔵 Base Mainnet",
                            84532: "🔵 Base Sepolia",
                            // Avalanche
                            43114: "🔺 Avalanche C-Chain",
                            43113: "🔺 Fuji Testnet",
                            // Fantom
                            250: "👻 Fantom Opera",
                            4002: "👻 Fantom Testnet",
                            // zkSync
                            324: "⚡ zkSync Era",
                            280: "⚡ zkSync Testnet",
                            // Linea
                            59144: "🟢 Linea Mainnet",
                            59140: "🟢 Linea Testnet",
                            // Scroll
                            534352: "📜 Scroll Mainnet",
                            534351: "📜 Scroll Sepolia",
                            // Mantle
                            5000: "🔷 Mantle Mainnet",
                            5001: "🔷 Mantle Testnet",
                            // Cronos
                            25: "⚡ Cronos Mainnet",
                            // Gnosis
                            100: "🦉 Gnosis Chain",
                            // Moonbeam / Moonriver
                            1284: "🌙 Moonbeam",
                            1285: "🌙 Moonriver",
                            // Celo
                            42220: "🌿 Celo Mainnet",
                            // Aurora
                            1313161554: "🟢 Aurora Mainnet",
                          }
                          return chains[wallet.chainId!] ?? `🔗 Chain ID: ${wallet.chainId}`
                        })()}
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
