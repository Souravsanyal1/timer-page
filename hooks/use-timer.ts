"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TimerStatus = "idle" | "running" | "paused" | "completed";

export interface TimerState {
  totalSeconds: number;
  remainingSeconds: number;
  status: TimerStatus;
  sessionsCompleted: number;
  todayFocusMinutes: number;
  currentStreak: number;
}

export interface TimerControls {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
  setDuration: (seconds: number) => void;
}

export function useTimer(initialSeconds = 25 * 60): [TimerState, TimerControls] {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [todayFocusMinutes, setTodayFocusMinutes] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearTimer();
            setStatus("completed");
            setSessionsCompleted((s) => s + 1);
            setTodayFocusMinutes((m) => m + Math.round(totalSeconds / 60));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [status, clearTimer, totalSeconds]);

  const start = useCallback(() => {
    if (status === "idle" || status === "completed") {
      setRemainingSeconds(totalSeconds);
      setStatus("running");
    }
  }, [status, totalSeconds]);

  const pause = useCallback(() => {
    if (status === "running") setStatus("paused");
  }, [status]);

  const resume = useCallback(() => {
    if (status === "paused") setStatus("running");
  }, [status]);

  const reset = useCallback(() => {
    clearTimer();
    setStatus("idle");
    setRemainingSeconds(totalSeconds);
  }, [clearTimer, totalSeconds]);

  const skip = useCallback(() => {
    clearTimer();
    setStatus("completed");
    setSessionsCompleted((s) => s + 1);
  }, [clearTimer]);

  const setDuration = useCallback(
    (seconds: number) => {
      clearTimer();
      setTotalSeconds(seconds);
      setRemainingSeconds(seconds);
      setStatus("idle");
    },
    [clearTimer]
  );

  return [
    { totalSeconds, remainingSeconds, status, sessionsCompleted, todayFocusMinutes, currentStreak },
    { start, pause, resume, reset, skip, setDuration },
  ];
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
