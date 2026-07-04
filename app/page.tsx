"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX,
  Timer, Target, Flame, BarChart3, TrendingUp, Award, Clock,
  Brain, Dumbbell, BookOpen, Coffee, Moon, Leaf, Settings, X,
} from "lucide-react";
import { FaSpotify, FaDiscord, FaTelegram } from "react-icons/fa";
import { SiGooglecalendar, SiNotion } from "react-icons/si";

import { AnimatedNumber } from "@/components/ui/animated-number";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { PopButton } from "@/components/ui/pop-button";
import ExpandableBentoGrid from "@/components/ui/expandable-bento-grid";
import { KineticTextLoader } from "@/components/ui/kinetic-text-loader";
import { StackedLogos } from "@/components/ui/stacked-logos";
import SocialFlipButton from "@/components/ui/social-flip-button";
import { NotchNavbar } from "@/components/ui/notch-navbar";
import { GlowBorderCard } from "@/components/ui/glow-border-card";
import { useTimer, formatTime } from "@/hooks/use-timer";

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

/* ─────────────── Stat Card ─────────────── */
function StatCard({ icon: Icon, label, value, unit, color, delay }: {
  icon: React.ElementType; label: string; value: number; unit: string; color: string; delay: number;
}) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = value / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplayed(value); clearInterval(timer); }
      else setDisplayed(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group cursor-pointer w-full rounded-3xl"
    >
      <GlowBorderCard
        width="100%"
        borderRadius="1.5rem"
        animationDuration={6}
        gradientColors={[color, `${color}99`, `${color}44`, `${color}11`, `${color}44`, `${color}99`, color]}
        borderWidth="1.5px"
        blurAmount="6px"
        inset="-1.5px"
        className="p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="text-[10px] font-semibold px-2 py-1 rounded-full border border-foreground/10 text-foreground/60"
            style={{ background: `${color}12`, color }}>
            Live
          </div>
        </div>

        <div className="mt-2">
          <div className="flex items-end gap-1 mb-1">
            <span className="text-3xl font-black text-foreground tabular-nums">{displayed}</span>
            <span className="text-sm text-foreground/40 mb-1">{unit}</span>
          </div>
          <p className="text-sm text-foreground/50 font-medium">{label}</p>
        </div>
      </GlowBorderCard>
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

/* ═══════════════════════════════════════════════ MAIN PAGE ═══════════════════════════════════════════════ */
export default function FocusTimerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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
    { icon: Clock, label: "Today's Focus Time", value: todayFocusMinutes || 127, unit: "min", color: "#FFB000", delay: 0 },
    { icon: Target, label: "Completed Sessions", value: sessionsCompleted + 8, unit: "sessions", color: "#FF8A00", delay: 0.1 },
    { icon: Flame, label: "Current Streak", value: currentStreak + 12, unit: "days", color: "#FF6B00", delay: 0.2 },
    { icon: BarChart3, label: "Weekly Progress", value: 84, unit: "%", color: "#ffffff", delay: 0.3 },
    { icon: TrendingUp, label: "Average Session", value: 28, unit: "min", color: "#a0a0a0", delay: 0.4 },
    { icon: Award, label: "Productivity Score", value: 92, unit: "pts", color: "#FFB000", delay: 0.5 },
  ];

  const flipItems = [
    { letter: "S", icon: <FaSpotify />, label: "Spotify", href: "#" },
    { letter: "M", icon: isMuted ? <VolumeX /> : <Volume2 />, label: isMuted ? "Unmute" : "Mute", onClick: () => setIsMuted((v) => !v) },
    { letter: "D", icon: <FaDiscord />, label: "Discord", href: "#" },
    { letter: "T", icon: <FaTelegram />, label: "Telegram", href: "#" },
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
            <KineticTextLoader text="Loading" />
            <p className="text-foreground/45 text-xs tracking-[0.4em] uppercase">Initializing Elite Force</p>
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* ── ASH COLOR BACKGROUND ── */}
      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground" style={{ fontFamily: "'Inter',sans-serif" }}>

        {/* Subtle grid pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── Navbar ── */}
        <NotchNavbar />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ══════ HERO ══════ */}
          <section id="timer" className="pt-32 pb-16 flex flex-col items-center text-center">

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

              {/* ── Coming Soon Text in place of Timer ── */}
              <div
                className="my-6 py-2 flex flex-col items-center"
                style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
              >
                <FlipFadeText
                  words={["COMING", "SOON"]}
                  interval={2000}
                  letterDuration={0.55}
                  staggerDelay={0.08}
                  exitStaggerDelay={0.04}
                  className="min-h-[1.3em] py-0"
                  textClassName="text-white text-[1em] tracking-[0.2em] font-black"
                />
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
            </motion.div>

            {/* Flip text subtitle - removed */}

            {/* ── Pomodoro Timer Ring - removed ── */}

            {/* Status - removed */}

            {/* ── Control Buttons - removed ── */}

            {/* Keyboard hints - removed */}
          </section>

          {/* ══════ PRESETS ══════ */}
          <section id="presets" className="py-16">
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
          <section id="stats" className="py-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-10">
              <p className="text-[10px] font-semibold text-foreground/40 uppercase tracking-[0.35em] mb-3">Analytics</p>
              <h2 className="text-3xl md:text-5xl font-black text-foreground" style={{ letterSpacing: "-0.03em" }}>
                Your{" "}
                <span style={{ background: "linear-gradient(135deg,#FFB000,#FF8A00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Progress
                </span>
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
            </div>
          </section>


          {/* ══════ CONTACT US ══════ */}
          <section className="py-20 flex flex-col items-center gap-12">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative w-full max-w-2xl mx-auto"
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

              <div className="grid grid-cols-3 w-full"
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
                <a
                  href="https://t.me/YourTelegramUsername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center gap-4 py-12 px-6 transition-all duration-300"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(34,158,217,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg,#229ED9,#1a8bbf)", boxShadow: "0 8px 32px rgba(34,158,217,0)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(34,158,217,0.5)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(34,158,217,0)"; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-sm">Telegram</p>
                    <p className="text-white/30 text-xs mt-0.5 group-hover:text-[#229ED9] transition-colors">@EliteForce ↗</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/YourPhoneNumber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center gap-4 py-12 px-6 transition-all duration-300"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg,#25D366,#1ebe58)", boxShadow: "0 8px 32px rgba(37,211,102,0)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0.5)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0)"; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-sm">WhatsApp</p>
                    <p className="text-white/30 text-xs mt-0.5 group-hover:text-[#25D366] transition-colors">Message us ↗</p>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@YourYouTubeChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center gap-4 py-12 px-6 transition-all duration-300"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,0,0,0.07)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg,#FF0000,#cc0000)", boxShadow: "0 8px 32px rgba(255,0,0,0)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,0,0,0.45)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,0,0,0)"; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-sm">YouTube</p>
                    <p className="text-white/30 text-xs mt-0.5 group-hover:text-[#FF0000] transition-colors">Subscribe ↗</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </section>


          {/* ══════ FOOTER ══════ */}
          <footer className="py-10 border-t border-white/4 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center border border-orange-500/20"
                  style={{ background: "rgba(255,138,0,0.08)" }}>
                  <Timer className="w-3 h-3 text-orange-400" />
                </div>
                <span className="text-foreground font-bold text-sm">Elite Force</span>
                <span className="text-foreground/15 text-sm">— 6 months. Stay locked in.</span>
              </div>
              <div className="flex gap-6 text-xs text-white/20 tracking-wider uppercase">
                {["Privacy", "Terms", "GitHub", "Docs"].map((l) => (
                  <a key={l} href="#" className="hover:text-white/50 transition-colors">{l}</a>
                ))}
              </div>
              <p className="text-xs text-white/15">Deadline: Jan 3, 2027 · 12:00 AM</p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
