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
      // Detect chain to ensure it's still BNB Chain
      const eth = (window as unknown as { ethereum?: { request: (args: { method: string }) => Promise<string> } }).ethereum
      if (eth) {
        eth.request({ method: "eth_chainId" })
          .then((chainIdHex) => {
            const chainId = parseInt(chainIdHex, 16)
            if (chainId === 56) {
              setWallet(prev => ({
                ...prev,
                address: addr,
                shortAddress: shortenAddress(addr),
                chainId,
                isConnected: true,
              }))
            } else {
              // Switch required, but don't force reload loop. Just keep disconnected until they switch
              sessionStorage.removeItem("connected_wallet")
            }
          })
          .catch(() => {
            sessionStorage.removeItem("connected_wallet")
          })
      }
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
        // Just reload to re-run the restore/check flow safely
        window.location.reload()
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

        // 1. Switch/Add BNB Chain (Chain ID: 56, Hex: 0x38)
        const bnbChainIdHex = "0x38"
        let chainSwitched = false

        try {
          await eth.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: bnbChainIdHex }],
          })
          chainSwitched = true
        } catch (switchError: any) {
          // 4902 indicates the chain has not been added to the wallet
          if (switchError.code === 4902) {
            try {
              await eth.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: bnbChainIdHex,
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
              chainSwitched = true
            } catch (addError) {
              throw new Error("Failed to add BNB Smart Chain to wallet.")
            }
          } else {
            throw new Error("Please switch to BNB Smart Chain to connect.")
          }
        }

        if (!chainSwitched) {
          throw new Error("Connection cancelled: BNB Smart Chain required.")
        }

        // 2. Request accounts after ensuring BNB chain
        const accounts = await eth.request({ method: "eth_requestAccounts" }) as string[]
        const address = accounts[0]

        sessionStorage.setItem("connected_wallet", address)
        setWallet({
          address,
          shortAddress: shortenAddress(address),
          chainId: 56,
          isConnected: true,
          isConnecting: false,
          error: null,
        })
        return { success: true, address }
      }

      // No provider found — open wallet's install page
      const installUrls: Record<string, string> = {
        MetaMask: "https://metamask.io/download/",
        "TokenPocket": "https://www.tokenpocket.pro/en/download/app",
        "Trust Wallet": "https://trustwallet.com/download",
        "1inch Wallet": "https://1inch.io/wallet/",
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
