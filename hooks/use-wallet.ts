"use client"
import { useState, useEffect, useCallback } from "react"

export type WalletState = {
  address: string | null
  shortAddress: string | null
  chainId: number | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
}

const initialState: WalletState = {
  address: null,
  shortAddress: null,
  chainId: null,
  isConnected: false,
  isConnecting: false,
  error: null,
}

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4)
}

// Check which provider is available
function detectProvider(): { provider: unknown; name: string } | null {
  if (typeof window === "undefined") return null
  const eth = (window as unknown as { ethereum?: Record<string, unknown> }).ethereum
  if (!eth) return null

  // Coinbase Wallet
  if (eth.isCoinbaseWallet) return { provider: eth, name: "Coinbase Wallet" }
  // MetaMask
  if (eth.isMetaMask) return { provider: eth, name: "MetaMask" }
  // Trust Wallet
  if (eth.isTrust) return { provider: eth, name: "Trust Wallet" }
  // Generic EIP-1193
  return { provider: eth, name: "Browser Wallet" }
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(initialState)

  // Restore from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("connected_wallet")
    if (saved) {
      const addr = saved
      setWallet(prev => ({
        ...prev,
        address: addr,
        shortAddress: shortenAddress(addr),
        isConnected: true,
      }))
    }
  }, [])

  // Listen to account/chain changes
  useEffect(() => {
    const eth = (window as unknown as { ethereum?: Record<string, unknown> }).ethereum
    if (!eth) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        setWallet(initialState)
        sessionStorage.removeItem("connected_wallet")
      } else {
        setWallet(prev => ({
          ...prev,
          address: accs[0],
          shortAddress: shortenAddress(accs[0]),
          isConnected: true,
        }))
        sessionStorage.setItem("connected_wallet", accs[0])
      }
    }

    const handleChainChanged = () => window.location.reload()

    if (eth.on) {
      ;(eth as unknown as { on: (event: string, cb: unknown) => void }).on("accountsChanged", handleAccountsChanged)
      ;(eth as unknown as { on: (event: string, cb: unknown) => void }).on("chainChanged", handleChainChanged)
    }

    return () => {
      if (eth.removeListener) {
        ;(eth as unknown as { removeListener: (event: string, cb: unknown) => void }).removeListener("accountsChanged", handleAccountsChanged)
        ;(eth as unknown as { removeListener: (event: string, cb: unknown) => void }).removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const connect = useCallback(async (walletType: string) => {
    setWallet(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      const detected = detectProvider()

      // If MetaMask/browser extension available
      if (detected && detected.provider) {
        const eth = detected.provider as {
          request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
        }

        const accounts = await eth.request({ method: "eth_requestAccounts" }) as string[]
        const chainIdHex = await eth.request({ method: "eth_chainId" }) as string

        const address = accounts[0]
        const chainId = parseInt(chainIdHex, 16)

        sessionStorage.setItem("connected_wallet", address)
        setWallet({
          address,
          shortAddress: shortenAddress(address),
          chainId,
          isConnected: true,
          isConnecting: false,
          error: null,
        })
        return { success: true, address }
      }

      // No provider found — open wallet's install page
      const installUrls: Record<string, string> = {
        MetaMask: "https://metamask.io/download/",
        "Coinbase Wallet": "https://www.coinbase.com/wallet/downloads",
        "Trust Wallet": "https://trustwallet.com/download",
        WalletConnect: "https://walletconnect.com/",
        Rainbow: "https://rainbow.me/",
      }

      if (installUrls[walletType]) {
        window.open(installUrls[walletType], "_blank")
      }

      setWallet(prev => ({
        ...prev,
        isConnecting: false,
        error: `${walletType} not detected. Please install it.`,
      }))
      return { success: false }
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || "Connection failed"
      setWallet(prev => ({ ...prev, isConnecting: false, error: msg }))
      return { success: false }
    }
  }, [])

  const disconnect = useCallback(() => {
    sessionStorage.removeItem("connected_wallet")
    setWallet(initialState)
  }, [])

  return { wallet, connect, disconnect }
}
