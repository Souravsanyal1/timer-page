"use client"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { useWallet } from "@/hooks/use-wallet"
import { WalletModal } from "@/components/ui/wallet-modal"
import LogoIcon from "@/assets/logo/logo-icon"

// Simple Theme Toggle for Mobile
const MobileThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  const isDark = (theme === 'dark' || resolvedTheme === 'dark')

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

export function NotchNavbar({ className, ...props }: React.HTMLAttributes<HTMLElement> & { logo?: React.ReactNode }) {
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const { wallet } = useWallet()

  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-50 h-16 flex px-0", className)} {...props}>
        
        {/* Left Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-zinc-50 dark:bg-black z-20 relative min-w-0">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
          </svg>
        </div>

        {/* Responsive Notch Container - 3 Slices */}
        <div className="flex h-16 relative z-10 shrink-0 -ml-px">
          
          {/* Left Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-black" style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            </svg>
          </div>

          {/* Center Slice (Flexible Content Area) */}
          <div className="flex-1 h-full relative min-w-[200px] -ml-px">
             {/* Background & Lines Layer */}
             <div className="absolute inset-0 bg-zinc-50 dark:bg-black">
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                   <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
                   <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
                 </svg>
             </div>

             {/* Content Layer */}
             <div className="relative w-full h-full flex items-end justify-between pb-2 px-4 md:px-8">
               
               {/* Left Placeholder for alignment */}
               <div className="hidden md:block w-32" />

               {/* Logo (Center) */}
               <div className="flex justify-center shrink-0 mx-2 md:mx-4 mt-1">
                 {props.logo || <LogoIcon size={28} />}
               </div>

               {/* Desktop Right Nav (Theme + Wallet) */}
               <div className="hidden md:flex gap-4 items-center shrink-0">
                  <ThemeToggle />
                  {wallet.isConnected ? (
                    <button
                      onClick={() => setWalletModalOpen(true)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded-2xl border transition-all whitespace-nowrap hover:scale-[1.02] active:scale-95"
                      style={{ borderColor: '#FF8A00', color: '#FF8A00', background: 'rgba(255,138,0,0.08)' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      {wallet.shortAddress}
                    </button>
                  ) : (
                    <button
                      onClick={() => setWalletModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-1.5 text-sm font-semibold text-white rounded-2xl transition-all whitespace-nowrap shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #FF8A00, #e67600)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>
                        <circle cx="16" cy="14" r="1" fill="currentColor"/>
                      </svg>
                      Connect Wallet
                    </button>
                  )}
               </div>

               {/* Mobile Right Actions (Theme + Compact Wallet) */}
               <div className="md:hidden flex items-center gap-3 mb-1">
                 <MobileThemeToggle />
                 {wallet.isConnected ? (
                   <button
                     onClick={() => setWalletModalOpen(true)}
                     className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl border transition-all whitespace-nowrap active:scale-95"
                     style={{ borderColor: '#FF8A00', color: '#FF8A00', background: 'rgba(255,138,0,0.08)' }}
                   >
                     <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                     {wallet.shortAddress}
                   </button>
                 ) : (
                   <button
                     onClick={() => setWalletModalOpen(true)}
                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-xl transition-all whitespace-nowrap shadow-sm active:scale-95"
                     style={{ background: 'linear-gradient(135deg, #FF8A00, #e67600)' }}
                   >
                     Connect
                   </button>
                 )}
               </div>

             </div>
          </div>

          {/* Right Slice (Corner) */}
          <div className="w-[50px] h-full relative shrink-0 -ml-px">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-black" style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }} />
            {/* Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 50 64">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            </svg>
          </div>

        </div>

        {/* Right Side Bar - Flexible width */}
        <div className="flex-1 h-10 bg-zinc-50 dark:bg-black z-20 relative min-w-0 -ml-px">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.05} strokeWidth={0.5} className="text-foreground" />
          </svg>
        </div>

      </header>
      <WalletModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
    </>
  )
}
