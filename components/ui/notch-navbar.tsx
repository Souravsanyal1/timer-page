"use client"
import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { useWallet } from "@/hooks/use-wallet"
import { WalletModal } from "@/components/ui/wallet-modal"
import LogoIcon from "@/assets/logo/logo-icon"
import { PopButton } from "@/components/ui/pop-button"
import { GenerateButton } from "@/components/ui/generate-button"

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

               {/* Logo & Name (Center) */}
               <div className="flex justify-center items-center gap-2.5 shrink-0 mx-2 md:mx-4 mt-0.5">
                 {props.logo || (
                   <>
                     <LogoIcon size={24} />
                     <span className="font-extrabold text-sm tracking-[0.18em] text-foreground select-none uppercase">
                       Elite Force
                     </span>
                   </>
                 )}
               </div>

               {/* Desktop Right Nav (Theme + Wallet) */}
               <div className="hidden md:flex gap-4 items-center shrink-0">
                  <ThemeToggle />
                  {wallet.isConnected ? (
                    <GenerateButton
                      hue={30}
                      text={wallet.shortAddress || "Connected"}
                      generatingText="Disconnecting"
                      onClick={() => setWalletModalOpen(true)}
                    />
                  ) : (
                    <GenerateButton
                      hue={30}
                      text="Connect"
                      generatingText="Connecting"
                      onClick={() => setWalletModalOpen(true)}
                    />
                  )}
               </div>

               {/* Mobile Right Actions (Theme + Compact Wallet) */}
               <div className="md:hidden flex items-center gap-3 mb-1">
                 <MobileThemeToggle />
                 {wallet.isConnected ? (
                   <GenerateButton
                     hue={30}
                     text={wallet.shortAddress || "Connected"}
                     generatingText="Disconnecting"
                     onClick={() => setWalletModalOpen(true)}
                     className="scale-90"
                   />
                 ) : (
                   <GenerateButton
                     hue={30}
                     text="Connect"
                     generatingText="Connecting"
                     onClick={() => setWalletModalOpen(true)}
                     className="scale-90"
                   />
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
