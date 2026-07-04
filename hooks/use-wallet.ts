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

// Helper to get specific provider based on wallet clicked
function getSpecificProvider(walletName: string): any {
  if (typeof window === "undefined") return null
  const anyWindow = window as any
  const eth = anyWindow.ethereum
  
  const findProvider = (flag: string) => {
    if (eth && eth.providers && Array.isArray(eth.providers)) {
      return eth.providers.find((p: any) => p[flag])
    }
    if (eth && eth[flag]) return eth
    return null
  }

  switch (walletName) {
    case "MetaMask":
      if (eth && eth.providers && Array.isArray(eth.providers)) {
        return eth.providers.find((p: any) => p.isMetaMask && !p.isTokenPocket && !p.isTrust && !p.isOneInch) || eth
      }
      return eth && eth.isMetaMask ? eth : eth
    case "TokenPocket":
      return findProvider("isTokenPocket") || anyWindow.tokenpocket || eth
    case "Trust Wallet":
      return findProvider("isTrust") || findProvider("isTrustWallet") || anyWindow.trustWallet || eth
    case "1inch Wallet":
      return findProvider("isOneInch") || eth
    default:
      return eth
  }
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(initialState)

  // Restore from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("connected_wallet")
    if (saved) {
      const addr = saved
      const eth = (window as any).ethereum
      if (eth) {
        const requestMethod = eth.request || (eth.providers && eth.providers[0]?.request)
        if (requestMethod) {
          eth.request({ method: "eth_chainId" })
            .then((chainIdHex: string) => {
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
                sessionStorage.removeItem("connected_wallet")
              }
            })
            .catch(() => {
              sessionStorage.removeItem("connected_wallet")
            })
        }
      }
    }
  }, [])

  // Listen to account/chain changes
  useEffect(() => {
    const eth = (window as any).ethereum
    if (!eth) return

    const handleAccountsChanged = (accounts: any) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        setWallet(initialState)
        sessionStorage.removeItem("connected_wallet")
      } else {
        window.location.reload()
      }
    }

    const handleChainChanged = () => window.location.reload()

    if (eth.on) {
      eth.on("accountsChanged", handleAccountsChanged)
      eth.on("chainChanged", handleChainChanged)
    }

    return () => {
      if (eth.removeListener) {
        eth.removeListener("accountsChanged", handleAccountsChanged)
        eth.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const connect = useCallback(async (walletType: string) => {
    setWallet(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      const provider = getSpecificProvider(walletType)

      if (provider) {
        const eth = provider as {
          request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
        }

        // 1. Check current Chain ID first
        const currentChainHex = await eth.request({ method: "eth_chainId" }) as string
        const currentChainId = parseInt(currentChainHex, 16)

        // 2. Only switch if not already on BNB Chain (56)
        if (currentChainId !== 56) {
          const bnbChainIdHex = "0x38"
          let chainSwitched = false

          try {
            await eth.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: bnbChainIdHex }],
            })
            chainSwitched = true
          } catch (switchError: any) {
            // 4902 indicates that the chain is not added
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
        }

        // 3. Request accounts
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
