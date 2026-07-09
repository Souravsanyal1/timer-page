"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX,
  Timer, Target, Flame, BarChart3, TrendingUp, Award, Clock,
  Brain, Dumbbell, BookOpen, Coffee, Moon, Leaf, Settings, X,
  Home, Mail, Sun, Wallet
} from "lucide-react";
import { useTheme } from "next-themes";
import { useWallet } from "@/hooks/use-wallet";
import { FaSpotify, FaDiscord, FaTelegram } from "react-icons/fa";
import { SiGooglecalendar, SiNotion } from "react-icons/si";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { PopButton } from "@/components/ui/pop-button";
import ExpandableBentoGrid from "@/components/ui/expandable-bento-grid";
import { KineticTextLoader } from "@/components/ui/kinetic-text-loader";
import { Atom } from "react-loading-indicators";
import { StackedLogos } from "@/components/ui/stacked-logos";
import SocialFlipButton from "@/components/ui/social-flip-button";
import { GlowBorderCard } from "@/components/ui/glow-border-card";
import { useTimer, formatTime } from "@/hooks/use-timer";
import { WalletModal, WalletIcons } from "@/components/ui/wallet-modal";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import LogoIcon from "@/assets/logo/logo-icon";
import GlassDock from "@/components/ui/glass-dock";

/* ─────────────── 6-Month Countdown (ends Jan 3, 2027 12:00 AM) ─────────────── */
// Target: January 3, 2027 at 00:00:00 local time
const TARGET_DATE = new Date("2027-01-03T00:00:00");


function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const totalSec = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
      done: diff <= 0,
    };
  };
  // Start with zeros to avoid server/client hydration mismatch
  const [cd, setCd] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false });
  useEffect(() => {
    // Set real value immediately after mount
    setCd(calc());
    const id = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return cd;
}


/* ─────────────── Countdown Block ─────────────── */
function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative flex items-center justify-center rounded-2xl border border-foreground/10 bg-card/60 dark:bg-white/5 backdrop-blur-md tabular-nums"
        style={{
          minWidth: "clamp(64px,12vw,110px)",
          padding: "clamp(10px,2vw,20px) clamp(8px,1.5vw,16px)",
        }}
      >
        {/* top shimmer line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-foreground/10" />
        <div
          className="font-black text-foreground"
          style={{ fontSize: "clamp(2rem,7vw,5.5rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
        >
          <AnimatedNumber value={value} />
        </div>
      </div>
      <span className="text-[10px] sm:text-xs font-semibold text-foreground/40 uppercase tracking-[0.25em]">
        {label}
      </span>
    </div>
  );
}

/* ─────────────── Six-Month Deadline Countdown ─────────────── */
function SixMonthCountdown() {
  const cd = useCountdown(TARGET_DATE);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Render placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-5 my-8 w-full">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF8A00" }} />
          <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-[0.35em]">
            6-Month Deadline · Ends Jan 3, 2027 · 12:00 AM
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#FF8A00" }} />
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          {["Days", "Hours", "Mins", "Secs"].map((label) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="relative flex items-center justify-center rounded-2xl border border-foreground/10 bg-card/60 dark:bg-white/5 backdrop-blur-md tabular-nums" style={{ minWidth: "clamp(64px,12vw,110px)", padding: "clamp(10px,2vw,20px) clamp(8px,1.5vw,16px)" }}>
                <div className="font-black text-foreground" style={{ fontSize: "clamp(2rem,7vw,5.5rem)", lineHeight: 1, letterSpacing: "-0.04em" }}>0</div>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-foreground/40 uppercase tracking-[0.25em]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-5 my-8 w-full"
    >
      {/* Label */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF8A00" }} />
        <span className="text-[11px] font-semibold text-foreground/40 uppercase tracking-[0.35em]">
          6-Month Deadline · Ends Jan 3, 2027 · 12:00 AM
        </span>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF8A00" }} />
      </div>

      {/* Blocks */}
      {cd.done ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl font-black text-foreground/80 tracking-widest"
          style={{ textShadow: "0 0 40px rgba(255,138,0,0.6)" }}
        >
          🎯 TIME&apos;S UP — FOCUS COMPLETE
        </motion.div>
      ) : (
        <div className="flex items-end gap-3 sm:gap-5">
          <CountdownBlock value={cd.days} label="Days" />
          <span className="text-foreground/20 font-black pb-6 text-3xl sm:text-5xl select-none">:</span>
          <CountdownBlock value={cd.hours} label="Hours" />
          <span className="text-foreground/20 font-black pb-6 text-3xl sm:text-5xl select-none">:</span>
          <CountdownBlock value={cd.minutes} label="Minutes" />
          <span className="text-foreground/20 font-black pb-6 text-3xl sm:text-5xl select-none">:</span>
          <CountdownBlock value={cd.seconds} label="Seconds" />
        </div>
      )}

      {/* Progress bar */}
      {!cd.done && (
        <div className="w-full max-w-md">
          <div className="h-px w-full rounded-full overflow-hidden bg-foreground/10">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg,#FFB000,#FF8A00)",
                width: `${Math.min(100, ((TARGET_DATE.getTime() - new Date("2026-07-03T00:00:00").getTime() - (TARGET_DATE.getTime() - Date.now())) / (TARGET_DATE.getTime() - new Date("2026-07-03T00:00:00").getTime())) * 100)}%`,
              }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────── Pomodoro Timer Ring ─────────────── */
function HeroTimer({ remaining, total, status }: { remaining: number; total: number; status: string }) {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = total > 0 ? (total - remaining) / total : 0;
  const circumference = 2 * Math.PI * 140;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="320" height="320" className="absolute rotate-[-90deg]">
        <circle cx="160" cy="160" r="140" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="2" />
        <motion.circle
          cx="160" cy="160" r="140" fill="none"
          stroke="url(#timerGrad)" strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFB000" />
            <stop offset="100%" stopColor="#FF8A00" />
          </linearGradient>
        </defs>
      </svg>

      <AnimatePresence>
        {status === "running" && (
          <motion.div
            key="pulse"
            className="absolute rounded-full"
            style={{ width: 290, height: 290, background: "radial-gradient(circle,rgba(255,138,0,0.06) 0%,transparent 70%)" }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === "completed" && (
          <motion.div
            key="burst"
            className="absolute rounded-full border border-orange-400/40"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ width: 290, height: 290 }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center gap-2">
        <div
          className="flex items-center gap-1 font-black tabular-nums text-white"
          style={{ fontSize: "clamp(3.5rem,11vw,6.5rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
        >
          <AnimatedNumber value={minutes} />
          <span className="text-white/30 font-light select-none mx-1" style={{ fontSize: "0.6em" }}>:</span>
          <AnimatedNumber value={seconds} />
        </div>
        <div className="text-[11px] text-white/25 uppercase tracking-[0.3em] font-medium">
          {formatTime(remaining)} remaining
        </div>
      </div>
    </div>
  );
}

/* ─────────────── Stat Card (StackedLogos-style) ─────────────── */
function StatCard({ logo, color, delay }: {
  logo: React.ReactNode; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="group relative flex items-center justify-center p-12 cursor-pointer transition-all duration-300"
      style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = `${color}0d`; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 p-3.5 shrink-0 shadow-lg shadow-black/5"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
      >
        <div className="w-9 h-9 flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
          {logo}
        </div>
      </div>

      {/* Accent bottom bar */}
      <div className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

/* ─────────────── Settings Drawer ─────────────── */
function SettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const toggles = [
    { label: "Sound Effects", key: "sound", default: true },
    { label: "Notifications", key: "notify", default: true },
    { label: "Auto-Start Break", key: "autoBreak", default: false },
    { label: "Auto-Start Focus", key: "autoFocus", default: false },
    { label: "Loop Sessions", key: "loop", default: false },
    { label: "Analytics Sharing", key: "analytics", default: true },
  ];
  const [vals, setVals] = useState<Record<string, boolean>>(
    Object.fromEntries(toggles.map((t) => [t.key, t.default]))
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div key="drawer"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full z-50 w-full max-w-sm overflow-y-auto bg-background border-l border-border"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-foreground">Settings</h2>
                <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors">
                  <X className="w-4 h-4 text-foreground/50" />
                </button>
              </div>
              <div className="space-y-3">
                {toggles.map((t) => (
                  <div key={t.key} className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card/50">
                    <span className="text-sm font-medium text-foreground/70">{t.label}</span>
                    <button
                      onClick={() => setVals((v) => ({ ...v, [t.key]: !v[t.key] }))}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${vals[t.key] ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-foreground/10"}`}
                    >
                      <motion.div
                        animate={{ x: vals[t.key] ? 24 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 bg-background rounded-full shadow"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-2xl border border-border bg-card/50">
                  <label className="text-sm font-medium text-foreground/50 mb-3 block">Timer Volume</label>
                  <input type="range" min={0} max={100} defaultValue={70} className="w-full accent-orange-500 cursor-pointer" />
                </div>
                <div className="p-4 rounded-2xl border border-border bg-card/50">
                  <label className="text-sm font-medium text-foreground/50 mb-3 block">Focus Music</label>
                  <div className="flex gap-2 flex-wrap">
                    {["Lo-Fi", "Nature", "Rain", "White Noise", "Silence"].map((m) => (
                      <button key={m} className="px-3 py-1.5 text-xs rounded-full border border-border text-foreground/50 hover:border-orange-500/40 hover:text-orange-400 transition-all">{m}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────── Animated Coming Soon ─────────────── */
function AnimatedComingSoon() {
  const coming = "COMING".split("");
  const soon = "SOON".split("");

  return (
    <div
      className="mt-8 flex items-center justify-center gap-3 font-black uppercase tracking-[0.25em]"
      style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", perspective: "1000px" }}
    >
      {/* COMING */}
      <div className="flex gap-[0.1em]" style={{ transformStyle: "preserve-3d" }}>
        {coming.map((char, i) => (
          <motion.span
            key={`c-${i}`}
            initial={{ rotateX: 90, y: 15, opacity: 0, filter: "blur(4px)" }}
            animate={{ rotateX: 0, y: [0, -6, 0], opacity: 1, filter: "blur(0px)" }}
            transition={{
              rotateX: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9], delay: i * 0.05 },
              opacity: { duration: 0.4, delay: i * 0.05 },
              filter: { duration: 0.4, delay: i * 0.05 },
              y: {
                duration: 2.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.12 + 0.6,
              }
            }}
            className="inline-block text-foreground"
            style={{ transformStyle: "preserve-3d" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* SOON */}
      <div className="flex gap-[0.1em]" style={{ transformStyle: "preserve-3d" }}>
        {soon.map((char, i) => {
          const index = coming.length + i;
          return (
            <motion.span
              key={`s-${i}`}
              initial={{ rotateX: 90, y: 15, opacity: 0, filter: "blur(4px)" }}
              animate={{ rotateX: 0, y: [0, -6, 0], opacity: 1, filter: "blur(0px)" }}
              transition={{
                rotateX: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9], delay: index * 0.05 },
                opacity: { duration: 0.4, delay: index * 0.05 },
                filter: { duration: 0.4, delay: index * 0.05 },
                y: {
                  duration: 2.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.12 + 0.6,
                }
              }}
              className="inline-block"
              style={{
                transformStyle: "preserve-3d",
                color: "#FF8A00",
                textShadow: "0 0 25px rgba(255,138,0,0.35)",
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────── Contact Section Animation Variants ─────────────── */
const contactGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const contactItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16
    }
  }
} as const;

/* ═══════════════════════════════════════════════ MAIN PAGE ═══════════════════════════════════════════════ */
export default function FocusTimerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { wallet } = useWallet();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark" || resolvedTheme === "dark";

  useEffect(() => {
    const sections = ["home", "partnerships", "contact", "about-us"];
    const handleScrollActive = () => {
      const scrollPos = window.scrollY + 300; // offset
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScrollActive);
    handleScrollActive(); // run once on mount
    return () => window.removeEventListener("scroll", handleScrollActive);
  }, []);

  const dockItems = [
    {
      title: "Home",
      icon: Home,
      isActive: activeSection === "home",
      onClick: () => {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      title: "Partnerships",
      icon: Target,
      isActive: activeSection === "partnerships",
      onClick: () => {
        document.getElementById("partnerships")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      title: "Contact",
      icon: Mail,
      isActive: activeSection === "contact",
      onClick: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      title: "About",
      icon: Brain,
      isActive: activeSection === "about-us",
      onClick: () => {
        document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      title: !mounted ? "Theme" : (isDark ? "Light Mode" : "Dark Mode"),
      icon: !mounted ? Sun : (isDark ? Sun : Moon),
      onClick: () => setTheme(isDark ? "light" : "dark")
    },
    {
      title: !mounted ? "Wallet" : (wallet.isConnected ? (wallet.shortAddress || "Connected") : "Connect Wallet"),
      icon: ({ className }: { className?: string }) => (
        <div className="relative">
          <Wallet className={className} />
          {mounted && wallet.isConnected && (
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-background animate-pulse" />
          )}
        </div>
      ),
      onClick: () => setWalletModalOpen(true)
    }
  ];

  const [timerState, timerControls] = useTimer(25 * 60);
  const { remainingSeconds, totalSeconds, status, sessionsCompleted, todayFocusMinutes, currentStreak } = timerState;
  const { start, pause, resume, reset, skip, setDuration } = timerControls;

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " ") { e.preventDefault(); status === "running" ? pause() : status === "paused" ? resume() : start(); }
      if (e.key === "r" || e.key === "R") reset();
      if (e.key === "Escape") setSettingsOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [status, start, pause, resume, reset]);

  const heroTexts = ["Focus Mode", "Stay Productive", "Deep Work", "No Distractions"];
  const statusTexts: Record<string, string[]> = {
    idle: ["Timer Ready", "Press Start"],
    running: ["Focus Started", "Stay Locked In"],
    paused: ["Paused", "Resume When Ready"],
    completed: ["Session Complete", "Great Job!"],
  };

  const presets = [
    { id: 1, title: "Pomodoro", subtitle: "25 min focus", icon: <Timer className="w-6 h-6" />, description: "25-minute classic focus session.", content: <p>Start your 25-minute Pomodoro!</p>, seconds: 25 * 60 },
    { id: 2, title: "Deep Focus", subtitle: "50 min block", icon: <Brain className="w-6 h-6" />, description: "Extended deep work block.", content: <p>50 minutes of maximum concentration.</p>, seconds: 50 * 60 },
    { id: 3, title: "Short Break", subtitle: "5 min rest", icon: <Coffee className="w-6 h-6" />, description: "Quick mental reset.", content: <p>5 minutes to refresh your mind.</p>, seconds: 5 * 60 },
    { id: 4, title: "Long Break", subtitle: "15 min rest", icon: <Moon className="w-6 h-6" />, description: "Full recharge after multiple sessions.", content: <p>15 minutes to fully recharge.</p>, seconds: 15 * 60 },
    { id: 5, title: "Meditation", subtitle: "10 min calm", icon: <Leaf className="w-6 h-6" />, description: "10-minute mindfulness session.", content: <p>Clear your mind with meditation.</p>, seconds: 10 * 60 },
    { id: 6, title: "Workout", subtitle: "45 min active", icon: <Dumbbell className="w-6 h-6" />, description: "45-minute active workout timer.", content: <p>Stay active with this workout timer.</p>, seconds: 45 * 60 },
    { id: 7, title: "Study", subtitle: "90 min deep", icon: <BookOpen className="w-6 h-6" />, description: "90-minute intensive study session.", content: <p>90 minutes of deep study.</p>, seconds: 90 * 60 },
    { id: 8, title: "Custom", subtitle: "Your time", icon: <Target className="w-6 h-6" />, description: "Set your own duration.", content: <p>Customize your perfect timer.</p>, seconds: 20 * 60 },
  ];

  const stats = [
    {
      logo: (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle fill="#FF007A" cx="16" cy="16" r="16"/>
          <g fill="#FFF">
            <path d="M12.261 5.767c-.285-.044-.297-.05-.163-.07.257-.04.865.015 1.284.114.977.233 1.866.828 2.816 1.885l.252.28.36-.057c1.52-.245 3.067-.05 4.36.547.356.164.917.491.987.576.023.026.064.199.091.383.096.637.048 1.125-.146 1.49-.106.198-.112.26-.041.43a.416.416 0 00.372.236c.322 0 .668-.52.828-1.243l.064-.287.126.143c.692.784 1.235 1.853 1.328 2.613l.025.199-.117-.18c-.2-.31-.4-.522-.658-.693-.464-.307-.955-.411-2.255-.48-1.174-.062-1.839-.162-2.497-.377-1.121-.365-1.686-.852-3.018-2.599-.591-.776-.957-1.205-1.32-1.55-.827-.786-1.639-1.198-2.678-1.36z"/>
            <path d="M22.422 7.5c.03-.52.1-.863.242-1.176.056-.124.109-.226.117-.226a.773.773 0 01-.055.204c-.103.304-.12.72-.049 1.203.09.614.142.702.79 1.365.305.311.659.703.787.872l.233.306-.233-.219c-.285-.267-.941-.79-1.086-.864-.097-.05-.112-.049-.172.01-.055.056-.067.138-.074.529-.012.608-.095 1-.296 1.39-.108.21-.125.166-.027-.073.073-.178.08-.256.08-.845 0-1.184-.141-1.468-.966-1.956a9.046 9.046 0 00-.764-.396 2.916 2.916 0 01-.374-.182c.023-.023.827.211 1.15.336.482.185.561.209.62.186.039-.015.058-.129.077-.464zm-9.607 2.025c-.579-.797-.937-2.02-.86-2.934l.024-.283.132.024c.248.045.675.204.875.326.548.333.786.772 1.027 1.898.071.33.164.703.207.83.068.203.328.678.54.987.152.222.05.327-.286.297-.514-.047-1.21-.527-1.659-1.145zm8.905 5.935c-2.707-1.09-3.66-2.036-3.66-3.632 0-.235.008-.427.017-.427.01 0 .115.077.233.172.549.44 1.164.628 2.865.876 1.001.147 1.565.265 2.085.437 1.652.548 2.674 1.66 2.918 3.174.07.44.029 1.265-.086 1.7-.09.344-.367.963-.44.987-.02.006-.04-.071-.046-.178-.028-.568-.315-1.122-.798-1.537-.549-.471-1.286-.847-3.089-1.572zm-1.9.452a4.808 4.808 0 00-.131-.572l-.07-.206.129.144c.177.2.318.454.436.794.091.259.101.336.1.757 0 .414-.011.5-.095.734a2.32 2.32 0 01-.571.908c-.495.504-1.13.782-2.048.898-.16.02-.624.054-1.033.075-1.03.054-1.707.164-2.316.378a.488.488 0 01-.174.042c-.024-.025.39-.272.733-.437.483-.233.963-.36 2.04-.539.532-.089 1.082-.196 1.221-.239 1.318-.404 1.995-1.446 1.778-2.737z"/>
            <path d="M21.06 18.116c-.36-.773-.442-1.52-.245-2.216.021-.074.055-.135.075-.135a.73.73 0 01.189.102c.166.112.498.3 1.383.782 1.105.603 1.735 1.07 2.164 1.602.375.467.607.999.719 1.647.063.367.026 1.25-.068 1.62-.297 1.166-.988 2.082-1.972 2.616a2.53 2.53 0 01-.288.143c-.014 0 .038-.133.117-.297.33-.692.369-1.366.118-2.116-.153-.459-.466-1.02-1.097-1.966-.734-1.1-.914-1.394-1.095-1.782zm-10.167 4.171c1.005-.848 2.254-1.45 3.393-1.635.49-.08 1.308-.048 1.762.068.728.186 1.38.604 1.719 1.101.33.486.473.91.62 1.852.06.372.123.745.142.83.11.488.327.879.595 1.075.425.311 1.158.33 1.878.05a.981.981 0 01.236-.074c.026.026-.336.269-.592.397a2.014 2.014 0 01-.983.238c-.66 0-1.208-.335-1.665-1.02-.09-.135-.292-.538-.45-.897-.482-1.1-.72-1.436-1.28-1.803-.489-.32-1.118-.377-1.591-.145-.622.305-.795 1.1-.35 1.603.177.2.507.373.777.406a.83.83 0 00.939-.83c0-.332-.128-.52-.448-.665-.437-.197-.907.033-.905.444.001.175.077.285.253.365.113.05.115.055.023.036-.401-.084-.495-.567-.172-.888.387-.386 1.188-.216 1.463.31.116.221.129.662.028.928-.225.595-.883.907-1.55.737-.454-.116-.639-.241-1.186-.805-.951-.98-1.32-1.17-2.692-1.384l-.263-.041.3-.253z"/>
            <path d="M6.196 3.35l.096.117c3.708 4.54 5.624 6.896 5.746 7.064.2.278.125.527-.219.723-.191.109-.585.219-.781.219-.223 0-.474-.107-.657-.28-.129-.123-.65-.901-1.853-2.768a188.53 188.53 0 00-1.712-2.633c-.049-.046-.048-.045 1.618 2.936 1.046 1.872 1.4 2.533 1.4 2.622 0 .18-.05.274-.272.522-.37.413-.535.877-.655 1.837-.134 1.077-.51 1.837-1.554 3.138-.61.762-.71.902-.865 1.209-.194.386-.247.603-.269 1.091-.023.516.022.85.18 1.343.138.432.282.718.65 1.288.318.493.501.859.501 1.002 0 .114.022.114.515.003 1.179-.266 2.136-.735 2.675-1.309.333-.355.411-.551.414-1.038.001-.318-.01-.385-.096-.568-.14-.298-.395-.546-.957-.93-.737-.504-1.051-.91-1.138-1.467-.072-.457.011-.78.419-1.634.421-.884.526-1.26.597-2.151.045-.576.108-.803.274-.985.172-.19.328-.255.755-.313.696-.095 1.139-.275 1.503-.61.316-.292.448-.573.468-.995l.016-.32-.177-.206c-.254-.296-2.355-2.614-6.304-6.956l-.106-.115-.212.165zM7.91 19.732a.566.566 0 00-.174-.746c-.228-.152-.583-.08-.583.118 0 .06.033.104.108.143.127.065.136.139.037.288-.101.152-.093.286.023.377.186.146.45.065.59-.18zm5.524-7.176c-.327.1-.644.447-.743.81-.06.221-.026.61.064.73.145.194.286.245.666.242.744-.005 1.39-.324 1.466-.723.062-.327-.223-.78-.614-.98-.202-.102-.631-.143-.839-.079zm.87.68c.115-.163.064-.34-.13-.458-.372-.227-.934-.04-.934.312 0 .174.293.365.561.365.18 0 .424-.107.503-.219z"/>
          </g>
        </svg>
      ),
      color: "#FF007A",
      delay: 0
    },
    {
      logo: (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle fill="#2A5ADA" cx="16" cy="16" r="16"/>
          <path d="M16 6l-1.799 1.055L9.3 9.945 7.5 11v10l1.799 1.055 4.947 2.89L16.045 26l1.799-1.055 4.857-2.89L24.5 21V11l-1.799-1.055-4.902-2.89L16 6zm-4.902 12.89v-5.78L16 10.22l4.902 2.89v5.78L16 21.78l-4.902-2.89z" fill="#FFF"/>
        </svg>
      ),
      color: "#375BD2",
      delay: 0.1
    },
    {
      logo: (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle fill="#66F9A1" cx="16" cy="16" r="16"/>
          <path d="M9.925 19.687a.59.59 0 01.415-.17h14.366a.29.29 0 01.207.497l-2.838 2.815a.59.59 0 01-.415.171H7.294a.291.291 0 01-.207-.498l2.838-2.815zm0-10.517A.59.59 0 0110.34 9h14.366c.261 0 .392.314.207.498l-2.838 2.815a.59.59 0 01-.415.17H7.294a.291.291 0 01-.207-.497L9.925 9.17zm12.15 5.225a.59.59 0 00-.415-.17H7.294a.291.291 0 00-.207.498l2.838 2.815c.11.109.26.17.415.17h14.366a.291.291 0 00.207-.498l-2.838-2.815z" fill="#FFF"/>
        </svg>
      ),
      color: "#14F195",
      delay: 0.2
    },
    {
      logo: (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle fill="#2EBAC6" cx="16" cy="16" r="16"/>
          <path d="M22.934 21.574l-5.35-13.532C17.28 7.342 16.834 7 16.243 7h-.473c-.592 0-1.039.343-1.341 1.042l-2.327 5.896h-1.761c-.528.002-.956.448-.96 1v.014c.004.553.432.999.96 1.001h.946l-2.221 5.621a1.235 1.235 0 00-.066.384c0 .315.092.562.263.754.17.192.407.288.71.288a.933.933 0 00.552-.192c.17-.123.289-.302.38-.507l2.446-6.348h1.696c.527-.002.955-.449.96-1.001v-.027c-.005-.553-.433-1-.96-1.001h-.907l1.866-4.867L21.093 22.3c.092.205.21.384.381.507.161.122.354.19.553.192.302 0 .539-.096.71-.288.17-.192.262-.439.262-.754a.944.944 0 00-.065-.384z" fill="#FFF"/>
        </svg>
      ),
      color: "#B6509E",
      delay: 0.3
    },
    {
      logo: (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle fill="#D1884F" cx="16" cy="16" r="16"/>
          <g fill="#FFF">
            <path d="M20.8 12.8c-.2-.4-.6-.6-1-.7h-.4c.1-.2.1-.4.1-.7 0-1.3-1.1-2.3-2.4-2.3-1 0-1.8.5-2.2 1.3-.4-.8-1.2-1.3-2.2-1.3-1.3 0-2.4 1-2.4 2.3 0 .2 0 .5.1.7h-.4c-.4.1-.8.3-1 .7-.3.3-.4.8-.3 1.2l.8 5.5c.1.7.8 1.3 1.5 1.3h7.3c.7 0 1.3-.6 1.5-1.3l.8-5.5c0-.4-.1-.9-.3-1.2zm-7.6-1.4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3.6 8.8h-1.6v1.6h-.8v-1.6h-1.6v-.8h1.6v-1.6h.8v1.6h1.6v.8zm2.4-7.8c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1z"/>
          </g>
        </svg>
      ),
      color: "#D1884F",
      delay: 0.4
    },
    {
      logo: (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle fill="#1AAB9B" cx="16" cy="16" r="16"/>
          <path d="M7.558 21.156v-8.045l6.101 4.592v3.453h1.558V17.38a.909.909 0 00-.363-.726l-7.399-5.569A.909.909 0 006 11.81v9.346h1.558zm16.874 0v-8.045l-6.101 4.592v3.453h-1.558V17.38c0-.286.134-.555.362-.726l7.4-5.569a.909.909 0 011.455.726v9.346h-1.558z" fill="#FFF"/>
        </svg>
      ),
      color: "#1AAB9B",
      delay: 0.5
    },
    {
      logo: (
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12.0059 1.7635a.4383.4383 0 00-.2149.0547.4214.4214 0 00-.1562.1523L9.3613 5.834a.8191.8191 0 00-.1133.416c0 .146.0388.2896.1133.416l4.9512 8.4123a.8444.8444 0 00.3125.3047.8584.8584 0 00.4239.1113h4.5489a.4358.4358 0 00.2129-.0566.4185.4185 0 00.1543-.1524.4106.4106 0 00.0586-.207.416.416 0 00-.0567-.209L12.3711 1.9745a.416.416 0 00-.1543-.1524.4276.4276 0 00-.211-.0586zM8.0195 8.5058a.4277.4277 0 00-.211.0566.4235.4235 0 00-.1562.1524L.0584 21.6095a.4083.4083 0 00-.002.418.4188.4188 0 00.1563.1524c.065.0365.138.057.2129.0566h4.5509a.8586.8586 0 00.4238-.1113.8389.8389 0 00.3105-.3047l4.9532-8.4123a.8194.8194 0 00.1133-.416.8264.8264 0 00-.1133-.418L8.3886 8.7148a.4235.4235 0 00-.1562-.1524.435.435 0 00-.213-.0566zm3.0117 8.8244a.8645.8645 0 00-.4258.1113.8385.8385 0 00-.3105.3047l-2.2754 3.8614a.4123.4123 0 00-.0567.209.4059.4059 0 00.0567.207.4228.4228 0 00.1543.1543.432.432 0 00.2129.0547h15.1897a.4319.4319 0 00.2129-.0547.4222.4222 0 00.1543-.1543.4059.4059 0 00.0566-.207.4122.4122 0 00-.0566-.209L21.67 17.7462a.8384.8384 0 00-.3106-.3047.8573.8573 0 00-.4238-.1113z" fill="#0C0F25"/>
        </svg>
      ),
      color: "#3F85F4",
      delay: 0.6
    },
    {
      logo: (
        <svg viewBox="0 0 32 32" className="w-full h-full">
          <circle fill="#FF5C35" cx="16" cy="16" r="16"/>
          <g fill="#FFF">
            <rect x="11" y="7" width="10" height="2.5" rx="0.5"/>
            <rect x="13" y="11" width="6" height="2" rx="0.5"/>
            <path d="M9 15h14l-2.5 5h-9L9 15z"/>
            <path d="M11.5 22h9l-3 5h-3l-3-5z"/>
          </g>
        </svg>
      ),
      color: "#FF5C35",
      delay: 0.7
    },
  ];

  const flipItems = [
    { letter: "S", icon: <FaSpotify />, label: "Spotify", href: "#" },
    { letter: "M", icon: isMuted ? <VolumeX /> : <Volume2 />, label: isMuted ? "Unmute" : "Mute", onClick: () => setIsMuted((v) => !v) },
    { letter: "D", icon: <FaDiscord />, label: "Discord", href: "#" },
    { letter: "T", icon: <FaTelegram />, label: "Telegram", href: "https://t.me/Elite_Force_Official" },
  ];

  const integrationLogos = [
    [<FaSpotify key="s1" size={26} color="#1DB954" />, <FaSpotify key="s2" size={26} color="#1DB954" />],
    [<SiGooglecalendar key="g1" size={26} color="#4285F4" />, <SiGooglecalendar key="g2" size={26} color="#4285F4" />],
    [<SiNotion key="n1" size={26} className="text-foreground fill-current" />, <SiNotion key="n2" size={26} className="text-foreground fill-current" />],
    [<FaDiscord key="d1" size={26} color="#5865F2" />, <FaDiscord key="d2" size={26} color="#5865F2" />],
    [<FaTelegram key="t1" size={26} color="#26A5E4" />, <FaTelegram key="t2" size={26} color="#26A5E4" />],
  ];

  return (
    <>
      {/* ── Loading Screen ── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background text-foreground"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex flex-col items-center justify-center">
              {/* Pulsing glow around the logo */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-24 h-24 rounded-full bg-[#FF8A00] blur-xl"
              />
              <motion.img
                src="/ef-logo.png?v=3"
                alt="Elite Force Logo"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5 }
                }}
                className="w-20 h-20 object-contain relative z-10"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-foreground font-black text-xl tracking-[0.25em] uppercase select-none">
                ELITE FORCE
              </span>
              <span className="text-foreground/30 text-[10px] font-bold tracking-[0.3em] uppercase select-none">
                Build Your Focus
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <WalletModal open={walletModalOpen} onClose={() => setWalletModalOpen(false)} />

      {/* Floating Glass Dock at Bottom Center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 scale-90 sm:scale-100 pointer-events-auto">
        <GlassDock items={dockItems} />
      </div>

      {/* ── ASH COLOR BACKGROUND ── */}
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>

        {/* Subtle grid pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />



        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ══════ HERO ══════ */}
          <section id="home" className="pt-32 pb-16 flex flex-col items-center text-center">

            {/* ── Giant Typography ── */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="select-none mb-2"
              style={{ lineHeight: "0.88", letterSpacing: "-0.04em" }}
            >
              <div className="block text-foreground font-black"
                style={{ fontSize: "clamp(3.5rem,11vw,8.5rem)" }}>
                ELITE
              </div>

              <div className="block font-black mt-1"
                style={{
                  fontSize: "clamp(3.5rem,11vw,8.5rem)",
                  background: "linear-gradient(135deg,#FFB000 0%,#FF8A00 50%,#FF6B00 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                FORCE
              </div>

              {/* ── Coming Soon Text ── */}
              <AnimatedComingSoon />
            </motion.div>

            {/* Flip text subtitle - removed */}

            {/* ── Pomodoro Timer Ring - removed ── */}

            {/* Status - removed */}

            {/* ── Control Buttons - removed ── */}

            {/* Keyboard hints - removed */}
          </section>

          {/* ══════ PRESETS ══════ */}
          <section id="milestones" className="py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-10">
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">Schedule</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>
                Goal{" "}
                <span style={{ background: "linear-gradient(135deg,#FFB000,#FF8A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Milestones
                </span>
              </h2>
            </motion.div>
            <div>
              <ExpandableBentoGrid items={presets.slice(0, 3).map((p) => ({ ...p, icon: p.icon }))} />
            </div>
          </section>

          {/* ══════ STATS ══════ */}
          <section id="partnerships" className="py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-10">
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">Ecosystem</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>
                Web3{" "}
                <span style={{ background: "linear-gradient(135deg,#FFB000,#FF8A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Ecosystem
                </span>
              </h2>
            </motion.div>

            {/* Desktop & Tablet: StackedLogos-style stats grid */}
            <div
              className="hidden sm:block relative w-full"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--sx", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--sy", `${e.clientY - rect.top}px`);
              }}
            >
              {/* Ambient mouse glow */}
              <div
                className="stats-mouse-glow pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
                style={{ background: "radial-gradient(600px circle at var(--sx,50%) var(--sy,50%), rgba(255,138,0,0.06), transparent 60%)" }}
              />
              {/* Border glow */}
              <div
                className="stats-border-glow pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(500px circle at var(--sx,50%) var(--sy,50%), rgba(255,180,0,0.7), transparent 40%)",
                  maskImage: "repeating-linear-gradient(to right, transparent, transparent calc(25% - 1px), black calc(25% - 1px), black 25%), repeating-linear-gradient(to bottom, transparent, transparent calc(50% - 1px), black calc(50% - 1px), black 50%)",
                  WebkitMaskImage: "repeating-linear-gradient(to right, transparent, transparent calc(25% - 1px), black calc(25% - 1px), black 25%), repeating-linear-gradient(to bottom, transparent, transparent calc(50% - 1px), black calc(50% - 1px), black 50%)",
                  maskComposite: "add",
                  WebkitMaskComposite: "source-over",
                }}
              />
              <div
                className="grid grid-cols-2 lg:grid-cols-4"
                style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
                onMouseEnter={(e) => {
                  const wrap = e.currentTarget.parentElement;
                  if (wrap) {
                    (wrap.querySelector(".stats-mouse-glow") as HTMLElement).style.opacity = "1";
                    (wrap.querySelector(".stats-border-glow") as HTMLElement).style.opacity = "1";
                  }
                }}
                onMouseLeave={(e) => {
                  const wrap = e.currentTarget.parentElement;
                  if (wrap) {
                    (wrap.querySelector(".stats-mouse-glow") as HTMLElement).style.opacity = "0";
                    (wrap.querySelector(".stats-border-glow") as HTMLElement).style.opacity = "0";
                  }
                }}
              >
                {stats.map((stat, idx) => (
                  <StatCard key={idx} {...stat} />
                ))}
              </div>
            </div>

            {/* Mobile/Phone: Infinite Horizontal Marquee Slider */}
            <div className="block sm:hidden relative w-full overflow-hidden my-4 py-2">
              {/* Fade overlays on left/right for seamless blending */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

              <div className="flex gap-4 animate-marquee py-2 select-none" style={{ "--marquee-speed": "12s" } as React.CSSProperties}>
                {[...stats, ...stats].map((stat, idx) => (
                  <div
                    key={idx}
                    className="w-24 h-24 rounded-2xl flex items-center justify-center p-4.5 shrink-0 shadow-lg shadow-black/5"
                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 [&>img]:w-full [&>img]:h-full [&>img]:object-contain text-white">
                      {stat.logo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* ══════ CONTACT US ══════ */}
          <section id="contact" className="py-20 flex flex-col items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">
                Contact Us
              </p>
              <h2
                className="text-3xl md:text-5xl font-black text-foreground"
                style={{ letterSpacing: "-0.03em" }}
              >
                Stay{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#FFB000,#FF8A00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Connected
                </span>
              </h2>
              <p className="text-foreground/40 text-sm mt-3 max-w-xs mx-auto">
                Join our community or reach out — we&apos;re always here.
              </p>
            </motion.div>

            {/* ── StackedLogos-style grid ── */}
            {/* Desktop & Tablet: StackedLogos-style grid */}
            <motion.div
              variants={contactGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="hidden sm:block relative w-full max-w-3xl mx-auto"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
              }}
            >
              {/* Mouse-following amber glow */}
              <div
                className="pointer-events-none absolute inset-0 z-10 rounded-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(255,138,0,0.08), transparent 70%)",
                }}
              />
              {/* Border glow overlay */}
              <div
                className="contact-border-glow pointer-events-none absolute inset-0 z-20"
                style={{
                  background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(255,138,0,0.9), transparent 40%)",
                  maskImage: "repeating-linear-gradient(to right, transparent, transparent calc(33.333% - 1px), black calc(33.333% - 1px), black 33.333%), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)",
                  WebkitMaskImage: "repeating-linear-gradient(to right, transparent, transparent calc(33.333% - 1px), black calc(33.333% - 1px), black 33.333%), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)",
                  maskComposite: "add",
                  WebkitMaskComposite: "source-over",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 w-full"
                onMouseEnter={(e) => {
                  const glow = e.currentTarget.parentElement?.querySelector(".contact-border-glow") as HTMLElement;
                  if (glow) glow.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  const glow = e.currentTarget.parentElement?.querySelector(".contact-border-glow") as HTMLElement;
                  if (glow) glow.style.opacity = "0";
                }}
              >
                {/* Telegram */}
                <motion.a
                  variants={contactItemVariants}
                  href="https://t.me/Elite_Force_Official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center gap-4 py-12 px-6 transition-all duration-300"
                  style={{ borderRight: "1px solid var(--border)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(34,158,217,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg,#229ED9,#1a8bbf)", boxShadow: "0 8px 32px rgba(34,158,217,0)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(34,158,217,0.5)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(34,158,217,0)"; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-bold text-sm">Telegram</p>
                    <p className="text-foreground/50 text-xs mt-0.5 group-hover:text-[#229ED9] transition-colors">@Elite_Force_Official ↗</p>
                  </div>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  variants={contactItemVariants}
                  href="https://whatsapp.com/channel/0029VbDfUaIFMqrRUQQLoA3P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center gap-4 py-12 px-6 transition-all duration-300"
                  style={{ borderRight: "1px solid var(--border)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg,#25D366,#1ebe58)", boxShadow: "0 8px 32px rgba(37,211,102,0)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0.5)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0)"; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-bold text-sm">WhatsApp</p>
                    <p className="text-foreground/50 text-xs mt-0.5 group-hover:text-[#25D366] transition-colors">Message us ↗</p>
                  </div>
                </motion.a>

                {/* YouTube */}
                <motion.a
                  variants={contactItemVariants}
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center gap-4 py-12 px-6 transition-all duration-300"
                  style={{ borderRight: "1px solid var(--border)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,0,0,0.07)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg,#FF0000,#cc0000)", boxShadow: "0 8px 32px rgba(255,0,0,0)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,0,0,0.45)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,0,0,0)"; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-bold text-sm">YouTube</p>
                    <p className="text-foreground/50 text-xs mt-0.5 group-hover:text-[#FF0000] transition-colors">Subscribe ↗</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Mobile/Phone: Vertical List of 3 items */}
            <motion.div
              variants={contactGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="block sm:hidden w-full max-w-xs mx-auto flex flex-col gap-3 px-4 mt-6"
            >
              {[
                {
                  name: "Telegram",
                  href: "https://t.me/Elite_Force_Official",
                  label: "@Elite_Force_Official ↗",
                  color: "#229ED9",
                  textColor: "text-[#1d82b3] dark:text-[#229ED9]",
                  bg: "rgba(34,158,217,0.06)",
                  border: "rgba(34,158,217,0.2)",
                  iconBg: "linear-gradient(135deg,#229ED9,#1a8bbf)",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  )
                },
                {
                  name: "WhatsApp",
                  href: "https://whatsapp.com/channel/0029VbDfUaIFMqrRUQQLoA3P",
                  label: "Message us ↗",
                  color: "#25D366",
                  textColor: "text-[#1b8c43] dark:text-[#25D366]",
                  bg: "rgba(37,211,102,0.06)",
                  border: "rgba(37,211,102,0.2)",
                  iconBg: "linear-gradient(135deg,#25D366,#1ebe58)",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  )
                },
                {
                  name: "YouTube",
                  href: "https://youtube.com/",
                  label: "Subscribe ↗",
                  color: "#FF0000",
                  textColor: "text-[#cc0000] dark:text-[#FF0000]",
                  bg: "rgba(255,0,0,0.05)",
                  border: "rgba(255,0,0,0.18)",
                  iconBg: "linear-gradient(135deg,#FF0000,#cc0000)",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )
                }
              ].map((w, idx) => (
                <motion.a
                  key={idx}
                  variants={contactItemVariants}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 py-3 px-3.5 rounded-2xl w-full transition-all duration-300 shadow-md shadow-black/5"
                  style={{ background: w.bg, border: `1px solid ${w.border}` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = w.color === "#ffffff" ? "rgba(255,255,255,0.1)" : w.color + "14"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = w.bg; }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: w.iconBg }}>
                    {w.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-foreground font-bold text-xs leading-none truncate">{w.name}</p>
                    <p className={`text-[10px] mt-1.5 leading-none transition-colors truncate ${w.textColor}`}>{w.label}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </section>



          {/* ══════ SUPPORTED WALLETS SECTION ══════ */}
          <section id="supported-wallets" className="py-20 border-t border-border">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">Web3</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>
                Supported{" "}
                <span style={{ background: "linear-gradient(135deg,#FFB000,#FF8A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Wallets
                </span>
              </h2>
              <p className="text-foreground/40 text-sm mt-3 max-w-sm mx-auto">Connect your preferred Web3 wallet to unlock all Elite Force features.</p>
            </motion.div>
            {/* ── StackedLogos-style grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative w-full max-w-3xl mx-auto"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--wx", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--wy", `${e.clientY - rect.top}px`);
              }}
            >
              {/* Mouse-following amber glow */}
              <div
                className="wallets-mouse-glow pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(500px circle at var(--wx,50%) var(--wy,50%), rgba(50,205,50,0.08), transparent 70%)",
                }}
              />
              {/* Border glow overlay */}
              <div
                className="wallets-border-glow pointer-events-none absolute inset-0 z-20"
                style={{
                  background: "radial-gradient(600px circle at var(--wx,50%) var(--wy,50%), rgba(50,205,50,0.9), transparent 40%)",
                  maskImage: "repeating-linear-gradient(to right, transparent, transparent calc(25% - 1px), black calc(25% - 1px), black 25%), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)",
                  WebkitMaskImage: "repeating-linear-gradient(to right, transparent, transparent calc(25% - 1px), black calc(25% - 1px), black 25%), linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)",
                  maskComposite: "add",
                  WebkitMaskComposite: "source-over",
                  opacity: 0,
                  transition: "opacity 0.3s",
                }}
              />

              <div className="grid grid-cols-2 lg:grid-cols-4 w-full relative z-30"
                style={{ borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}
                onMouseEnter={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const glow1 = parent.querySelector(".wallets-mouse-glow") as HTMLElement;
                    const glow2 = parent.querySelector(".wallets-border-glow") as HTMLElement;
                    if (glow1) glow1.style.opacity = "1";
                    if (glow2) glow2.style.opacity = "1";
                  }
                }}
                onMouseLeave={(e) => {
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const glow1 = parent.querySelector(".wallets-mouse-glow") as HTMLElement;
                    const glow2 = parent.querySelector(".wallets-border-glow") as HTMLElement;
                    if (glow1) glow1.style.opacity = "0";
                    if (glow2) glow2.style.opacity = "0";
                  }
                }}
              >
                {[
                  {
                    id: "MetaMask",
                    name: "MetaMask",
                    color: "#ffd9b5ff",
                    desc: "Browser extension",
                  },
                  {
                    id: "Trust",
                    name: "Trust Wallet",
                    color: "#9fcdffff",
                    desc: "Mobile wallet",
                  },
                  {
                    id: "TokenPocket",
                    name: "TokenPocket",
                    color: "#a8d1ffff",
                    desc: "Multi-chain DeFi",
                  },
                  {
                    id: "OneInch",
                    name: "1inch Wallet",
                    color: "#ffb0b4ff",
                    desc: "Best swap rates",
                  }
                ].map((w) => (
                  <div
                    key={w.name}
                    className="group relative flex flex-col items-center justify-center gap-4 py-12 px-6 transition-all duration-300 cursor-default"
                    style={{
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(50,205,50,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    {/* Wallet Logo */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 shadow-lg shadow-black/10"
                      style={{ background: w.color }}>
                      <div className="w-9 h-9 flex items-center justify-center shrink-0 [&>svg]:h-full [&>svg]:w-auto [&>img]:h-full [&>img]:w-auto [&>img]:object-contain text-white">
                        {WalletIcons[w.id]}
                      </div>
                    </div>
                    {/* Name + Description */}
                    <div className="text-center">
                      <p className="text-foreground font-bold text-sm tracking-wide transition-colors group-hover:text-white">{w.name}</p>
                      <p className="text-foreground/40 text-xs mt-1 transition-colors group-hover:text-foreground/60">{w.desc}</p>
                    </div>

                    {/* Accent bottom bar */}
                    <div
                      className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, transparent, ${w.color}, transparent)` }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ══════ ABOUT US SECTION ══════ */}
          <section id="about-us" className="py-20 border-t border-border">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">Who We Are</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>
                About{" "}
                <span style={{ background: "linear-gradient(135deg,#FFB000,#FF8A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Us
                </span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }} className="max-w-2xl mx-auto px-4">
              <FaqAccordion
                title=""
                items={[
                  { question: "Our Mission", answer: "To establish the EFC token as the premier utility asset for decentralized accountability. By staking and backing your focus sessions with EFC, you turn personal discipline into verifiable on-chain value." },
                  { question: "Who We Build For", answer: "Web3 builders, token holders, stakers, and dreamers — anyone who wants to lock in, back their progress with EFC token staking, and grow alongside a community of focused execution." },
                  { question: "Web3 Native", answer: "Decentralized to the core. By integrating smart contracts and EFC tokens, we ensure transparency, proof of commitment, and yield-backed milestones that no centralized system can offer." },
                  { question: "The 6-Month Window", answer: "Starting now and ending January 3, 2027 — a 6-month staking epoch of focused execution. Secure your EFC pools, track your focus streaks, and earn token distribution rewards." },
                ]}
              />
            </motion.div>
          </section>

          {/* ══════ PRIVACY SECTION ══════ */}
          <section id="privacy" className="py-20 border-t border-border">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">Legal</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>
                Privacy{" "}
                <span style={{ background: "linear-gradient(135deg,#FFB000,#FF8A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Policy
                </span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }} className="max-w-2xl mx-auto px-4">
              <FaqAccordion
                title=""
                items={[
                  { question: "Data We Collect", answer: "We collect only what is necessary: wallet addresses (public, on-chain), session activity data, and streak counts. We never collect private keys or seed phrases." },
                  { question: "How We Use It", answer: "Your data is used solely to display your progress, leaderboard standing, and community stats. We do not sell or share your data with third parties." },
                  { question: "Cookies", answer: "We use essential cookies only — for theme preferences and session state. No advertising or tracking cookies are used." },
                  { question: "Your Rights", answer: "You can disconnect your wallet and clear your session data at any time through the Settings panel. All on-chain data remains public as part of the blockchain." },
                ]}
              />
            </motion.div>
          </section>

          {/* ══════ TERMS SECTION ══════ */}
          <section id="terms" className="py-20 border-t border-border">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">Legal</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>
                Terms of{" "}
                <span style={{ background: "linear-gradient(135deg,#FFB000,#FF8A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Service
                </span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} viewport={{ once: true }} className="max-w-2xl mx-auto px-4">
              <FaqAccordion
                title=""
                items={[
                  { question: "Acceptance", answer: "By using Elite Force, you agree to these terms. The platform is provided as-is for accountability and productivity tracking purposes only." },
                  { question: "Wallet Responsibility", answer: "You are solely responsible for your wallet and private keys. Elite Force never has access to your funds. Always verify contract addresses before any on-chain actions." },
                  { question: "Community Standards", answer: "Users are expected to engage respectfully across all community channels (Telegram, WhatsApp, Discord). Harassment, spam, or abuse will result in removal." },
                  { question: "Limitation of Liability", answer: "Elite Force is not liable for any losses, missed goals, or technical issues. Session data is stored locally and may be reset. Always keep personal records." },
                ]}
              />
            </motion.div>
          </section>


          {/* ══════ FOOTER ══════ */}
          <footer className="pt-8 pb-36 border-t border-border">
            <div className="flex flex-col items-center justify-center gap-3">
              <img
                src="/ef-logo.png?v=3"
                alt="Elite Force Logo"
                className="w-32 h-32 object-contain"
              />
              <span className="text-foreground font-black text-base tracking-wide">
                Elite Force
              </span>
              <p className="text-foreground/30 text-xs">
                © 2026 Elite Force. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
