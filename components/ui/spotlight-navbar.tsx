"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useWallet } from "@/hooks/use-wallet";
import { WalletModal } from "@/components/ui/wallet-modal";
import LogoIcon from "@/assets/logo/logo-icon";
import { GenerateButton } from "@/components/ui/generate-button";

export interface SpotlightNavbarProps {
    className?: string;
}

export function SpotlightNavbar({ className }: SpotlightNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const [hoverX, setHoverX] = useState<number | null>(null);
    const [walletModalOpen, setWalletModalOpen] = useState(false);
    const { wallet } = useWallet();

    useEffect(() => {
        if (!navRef.current) return;
        const nav = navRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = nav.getBoundingClientRect();
            const x = e.clientX - rect.left;
            setHoverX(x);
            nav.style.setProperty("--spotlight-x", `${x}px`);
        };

        const handleMouseLeave = () => {
            setHoverX(null);
        };

        nav.addEventListener("mousemove", handleMouseMove);
        nav.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            nav.removeEventListener("mousemove", handleMouseMove);
            nav.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <>
            <header className={cn("fixed top-4 left-1/2 -translate-x-1/2 z-50 flex justify-center w-[92vw] sm:w-[500px] md:w-[600px] lg:w-[680px]", className)}>
                <nav
                    ref={navRef}
                    className={cn(
                        "relative w-full h-14 rounded-full transition-all duration-300 overflow-hidden",
                        "bg-zinc-50/80 dark:bg-black/80 backdrop-blur-md",
                        "border border-foreground/5 shadow-2xl"
                    )}
                >
                    {/* Content Layer */}
                    <div className="relative flex items-center justify-between h-full px-5 md:px-6 z-10">
                        {/* Logo & Name (Left) */}
                        <div className="flex items-center gap-2.5 shrink-0 select-none">
                            <LogoIcon size={24} />
                            <span className="font-extrabold text-sm tracking-[0.18em] text-foreground uppercase">
                                Elite Force
                            </span>
                        </div>

                        {/* Right Nav (Wallet) */}
                        <div className="flex items-center shrink-0">
                            {wallet.isConnected ? (
                                <GenerateButton
                                    hue={30}
                                    text={wallet.shortAddress || "Connected"}
                                    generatingText="Disconnecting"
                                    onClick={() => setWalletModalOpen(true)}
                                    className="scale-90 origin-right"
                                />
                            ) : (
                                <GenerateButton
                                    hue={30}
                                    text="Connect"
                                    generatingText="Connecting"
                                    onClick={() => setWalletModalOpen(true)}
                                    className="scale-90 origin-right"
                                />
                            )}
                        </div>
                    </div>

                    {/* Spotlight Lighting Layer */}
                    <div
                        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
                        style={{
                            opacity: hoverX !== null ? 1 : 0,
                            background: `
                                radial-gradient(
                                    120px circle at var(--spotlight-x) 50%, 
                                    var(--spotlight-color, rgba(0,0,0,0.08)) 0%, 
                                    transparent 100%
                                )
                            `
                        }}
                    />
                </nav>

                <style jsx>{`
                    nav {
                        --spotlight-color: rgba(255,138,0,0.06);
                    }
                    :global(.dark) nav {
                        --spotlight-color: rgba(255,138,0,0.12);
                    }
                `}</style>
            </header>

            <WalletModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
        </>
    );
}
