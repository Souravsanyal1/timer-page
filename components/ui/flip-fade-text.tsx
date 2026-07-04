"use client"

import { useEffect, useState, useMemo, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlipFadeTextProps {
    /**
     * Array of words to cycle through
     */
    words?: string[]
    /**
     * Interval between word changes in milliseconds
     * @default 2500
     */
    interval?: number
    /**
     * Additional CSS classes for the container
     */
    className?: string
    /**
     * Additional CSS classes for the text
     */
    textClassName?: string
    /**
     * Animation duration for each letter in seconds
     * @default 0.6
     */
    letterDuration?: number
    /**
     * Stagger delay between letters on enter in seconds
     * @default 0.1
     */
    staggerDelay?: number
    /**
     * Stagger delay between letters on exit in seconds
     * @default 0.05
     */
    exitStaggerDelay?: number
}

// Memoized Letter component for performance
const Letter = memo(function Letter({
    char,
    letterDuration,
}: {
    char: string
    letterDuration: number
}) {
    return (
        <motion.span
            style={{ transformStyle: "preserve-3d" }}
            variants={{
                initial: {
                    rotateX: 90,
                    y: 20,
                    opacity: 0,
                    filter: "blur(8px)",
                },
                animate: {
                    rotateX: 0,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                        duration: letterDuration,
                        ease: [0.2, 0.65, 0.3, 0.9],
                    },
                },
                exit: {
                    rotateX: -90,
                    y: -20,
                    opacity: 0,
                    filter: "blur(8px)",
                    transition: {
                        duration: letterDuration * 0.67,
                        ease: "easeIn",
                    },
                },
            }}
            className="inline-block"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    )
})

// Memoized Word component for performance
const Word = memo(function Word({
    text,
    staggerDelay,
    exitStaggerDelay,
    letterDuration,
    textClassName,
}: {
    text: string
    staggerDelay: number
    exitStaggerDelay: number
    letterDuration: number
    textClassName?: string
}) {
    const letters = useMemo(() => text.split(""), [text])

    return (
        <motion.div
            className={cn(
                "flex gap-[0.05em] font-black uppercase tracking-[0.2em]",
                textClassName
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 1 },
                animate: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
                exit: {
                    opacity: 1,
                    transition: {
                        staggerChildren: exitStaggerDelay,
                        staggerDirection: -1,
                    },
                },
            }}
        >
            {letters.map((char, i) => (
                <Letter
                    key={`${char}-${i}`}
                    char={char}
                    letterDuration={letterDuration}
                />
            ))}
        </motion.div>
    )
})

export function FlipFadeText({
    words = ["COMING SOON"],
    interval = 2500,
    className,
    textClassName,
    letterDuration = 0.6,
    staggerDelay = 0.08,
    exitStaggerDelay = 0.04,
}: FlipFadeTextProps) {
    const [index, setIndex] = useState(0)

    const updateIndex = useCallback(() => {
        setIndex((prev) => (prev + 1) % words.length)
    }, [words.length])

    useEffect(() => {
        const timer = setInterval(updateIndex, interval)
        return () => clearInterval(timer)
    }, [updateIndex, interval])

    const currentWord = useMemo(() => words[index], [words, index])

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div
                className="relative flex items-center justify-center"
                style={{ perspective: "1000px" }}
            >
                <AnimatePresence mode="wait">
                    <Word
                        key={currentWord}
                        text={currentWord}
                        staggerDelay={staggerDelay}
                        exitStaggerDelay={exitStaggerDelay}
                        letterDuration={letterDuration}
                        textClassName={textClassName}
                    />
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FlipFadeText
