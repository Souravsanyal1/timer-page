"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@/hooks/use-wallet"

// Wallet icons — official logo accurate representations
export const WalletIcons: Record<string, React.ReactNode> = {
  MetaMask: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" viewBox="0 0 24 24"><title>metamask</title><g fill="none"><path fill="#ff5c16" d="m19.821 19.918l-3.877-1.131l-2.924 1.712h-2.04l-2.926-1.712l-3.875 1.13L3 16.02l1.179-4.327L3 8.034L4.179 3.5l6.056 3.544h3.53L19.821 3.5L21 8.034l-1.179 3.658L21 16.02z"/><path fill="#ff5c16" d="m4.18 3.5l6.055 3.547l-.24 2.434zm3.875 12.52l2.665 1.99l-2.665.777zm2.452-3.286l-.512-3.251l-3.278 2.21h-.002v.001l.01 2.275l1.33-1.235zM19.82 3.5l-6.056 3.547l.24 2.434zm-3.875 12.52l-2.665 1.99l2.665.777zm1.339-4.326v-.002zl-3.279-2.21l-.512 3.25h2.451l1.33 1.236z"/><path fill="#e34807" d="m8.054 18.787l-3.875 1.13L3 16.022h5.054zm2.452-6.054l.74 4.7l-1.026-2.614l-3.497-.85l1.33-1.236zm5.44 6.054l3.875 1.13L21 16.022h-5.055zm-2.452-6.054l-.74 4.7l1.026-2.614l3.497-.85l-1.331-1.236z"/><path fill="#ff8d5d" d="m3 16.02l1.179-4.328h2.535l.01 2.276l3.496.85l1.026 2.613l-.527.576l-2.665-1.989H3zm18 0l-1.179-4.328h-2.535l-.01 2.276l-3.496.85l-1.026 2.613l.527.576l2.665-1.989H21zm-7.235-8.976h-3.53l-.24 2.435l1.251 7.95h1.508l1.252-7.95z"/><path fill="#661800" d="M4.179 3.5L3 8.034l1.179 3.658h2.535l3.28-2.211zm5.594 10.177H8.625l-.626.6l2.222.54zM19.821 3.5L21 8.034l-1.179 3.658h-2.535l-3.28-2.211zm-5.593 10.177h1.15l.626.6l-2.224.541zm-1.209 5.271l.262-.94l-.527-.575h-1.509l-.527.575l.262.94"/><path fill="#c0c4cd" d="M13.02 18.948V20.5h-2.04v-1.552z"/><path fill="#e7ebf6" d="m8.055 18.785l2.927 1.714v-1.552l-.262-.94zm7.89 0L13.02 20.5v-1.552l.262-.94z"/></g></svg>
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
    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" viewBox="0 0 48 48" stroke="#006aff" strokeWidth="3.5" fill="none"><title>trust-wallet</title><path fill="none" stroke="#006aff" stroke-linecap="round" stroke-linejoin="round" d="M24 43.5c1.35-.062 8.977-4.15 11.767-8.742s4.268-16.815 4.37-24.879C32.072 9.88 26.853 7.352 24 4.5c-2.855 2.855-8.062 5.38-16.138 5.38c0 8.065 1.68 20.217 4.371 24.878S22.65 43.561 24 43.5"/></svg>
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
  {
    id: "MetaMask",
    name: "MetaMask",
    desc: "Popular Ethereum wallet",
    detectKey: "isMetaMask",
    installUrl: "https://metamask.io/download/",
  },
  {
    id: "TokenPocket",
    name: "TokenPocket",
    desc: "Multi-chain DeFi wallet",
    detectKey: "isTokenPocket",
    installUrl: "https://www.tokenpocket.pro/en/download/app",
  },
  {
    id: "Trust",
    name: "Trust Wallet",
    desc: "Multi-chain mobile wallet",
    detectKey: "isTrust",
    installUrl: "https://trustwallet.com/download",
  },
  {
    id: "OneInch",
    name: "1inch Wallet",
    desc: "Best swap rates & DeFi",
    detectKey: "isOneInch",
    installUrl: "https://1inch.io/wallet/",
  },
]

interface WalletModalProps {
  open: boolean
  onClose: () => void
}

export function WalletModal({ open, onClose }: WalletModalProps) {
  const { wallet, connect, disconnect } = useWallet()
  const [connecting, setConnecting] = useState<string | null>(null)
  const [detected, setDetected] = useState<Set<string>>(new Set())

  // Detect installed wallets from window.ethereum provider flags
  useEffect(() => {
    if (typeof window === "undefined") return
    const anyWindow = window as any
    const eth = anyWindow.ethereum

    const found = new Set<string>()

    if (eth) {
      // If window.ethereum exists, MetaMask or compatible browser wallet is present
      found.add("MetaMask")

      if (eth.isTokenPocket) found.add("TokenPocket")
      if (eth.isTrust || eth.isTrustWallet) found.add("Trust")
      if (eth.isOneInch) found.add("OneInch")
      
      // Check providers array if multiple wallets are active
      if (eth.providers && Array.isArray(eth.providers)) {
        if (eth.providers.some((p: any) => p.isMetaMask)) found.add("MetaMask")
        if (eth.providers.some((p: any) => p.isTokenPocket)) found.add("TokenPocket")
        if (eth.providers.some((p: any) => p.isTrust || p.isTrustWallet)) found.add("Trust")
        if (eth.providers.some((p: any) => p.isOneInch)) found.add("OneInch")
      }
    }

    // Direct window objects injected by wallets
    if (anyWindow.tokenpocket) found.add("TokenPocket")
    if (anyWindow.trustWallet) found.add("Trust")
    if (anyWindow.ethereum?.isOneInch) found.add("OneInch")

    setDetected(found)
  }, [open])

  // Sort: detected wallets first
  const sortedWallets = [...WALLETS].sort((a, b) => {
    const aDetected = detected.has(a.id) ? 0 : 1
    const bDetected = detected.has(b.id) ? 0 : 1
    return aDetected - bDetected
  })

  async function handleConnect(walletId: string, walletName: string, isDetected: boolean) {
    if (!isDetected) return // Don't connect if not installed
    setConnecting(walletId)
    const result = await connect(walletName)
    setConnecting(null)
    if (result?.success) onClose()
  }

  function handleDisconnect() {
    disconnect()
    onClose()
  }

  async function handleSwitchNetwork() {
    const eth = (window as any).ethereum
    if (eth) {
      try {
        await eth.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // Hex for 56
        })
        window.location.reload()
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            await eth.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x38",
                  chainName: "BNB Smart Chain",
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://bscscan.com"],
                },
              ],
            })
            window.location.reload()
          } catch (addError) {
            console.error("Failed to add BNB chain", addError)
          }
        }
      }
    }
  }

  const isWrongNetwork = wallet.isConnected && wallet.chainId !== 56

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
                    className="flex items-center gap-3 p-4 rounded-xl border animate-fade-in"
                    style={{
                      borderColor: isWrongNetwork ? "#ef4444" : "#FF8A00",
                      background: isWrongNetwork ? "rgba(239,68,68,0.08)" : "rgba(255,138,0,0.08)"
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{
                        background: isWrongNetwork
                          ? "linear-gradient(135deg,#ef4444,#b91c1c)"
                          : "linear-gradient(135deg,#FF8A00,#e67600)"
                      }}
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
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className={`w-2 h-2 rounded-full animate-pulse ${isWrongNetwork ? "bg-red-500" : "bg-green-400"}`} />
                      <span className={`text-xs font-medium ${isWrongNetwork ? "text-red-500" : "text-green-400"}`}>
                        {isWrongNetwork ? "Wrong Network" : "Connected"}
                      </span>
                    </div>
                  </div>

                  {isWrongNetwork && (
                    <button
                      onClick={handleSwitchNetwork}
                      className="w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all active:scale-[0.98] shadow-lg"
                      style={{ background: "linear-gradient(135deg, #FF8A00, #e67600)" }}
                    >
                      Switch to BNB Chain
                    </button>
                  )}

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
                  {/* Info banner */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3 border border-white/5 mb-1">
                    <svg className="w-3.5 h-3.5 text-white/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                    </svg>
                    <p className="text-white/40 text-xs">Wallet must have at least one account</p>
                  </div>

                  {wallet.error && (
                    <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-1">
                      {wallet.error}
                    </div>
                  )}

                  {sortedWallets.map((w) => {
                    const isDetected = detected.has(w.id)
                    return (
                      <div key={w.id} className="relative">
                        <button
                          onClick={() => handleConnect(w.id, w.name, isDetected)}
                          disabled={!!connecting || !isDetected}
                          className={`group flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all active:scale-[0.98] text-left ${
                            isDetected
                              ? "hover:bg-white/5 cursor-pointer"
                              : "opacity-40 cursor-not-allowed"
                          }`}
                        >
                          <div className="relative w-11 h-11 shrink-0">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                              isDetected ? "bg-white/5 group-hover:bg-white/10" : "bg-white/3"
                            }`}>
                              {WalletIcons[w.id]}
                            </div>
                            {/* Detected green dot */}
                            {isDetected && (
                              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#111] animate-pulse" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm font-medium">{w.name}</p>
                              {isDetected && (
                                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                                  style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80' }}>
                                  Detected
                                </span>
                              )}
                            </div>
                            <p className="text-white/40 text-xs">{w.desc}</p>
                          </div>

                          {connecting === w.id ? (
                            <svg className="w-4 h-4 text-orange-400 animate-spin shrink-0" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25"/>
                              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          ) : isDetected ? (
                            <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 18l6-6-6-6"/>
                            </svg>
                          ) : (
                            <a
                              href={w.installUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-[10px] font-semibold px-2 py-1 rounded-full border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-colors shrink-0"
                            >
                              Install
                            </a>
                          )}
                        </button>
                      </div>
                    )
                  })}
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
