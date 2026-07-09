"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export interface FaqAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FaqItem[];
  title?: string;
}

const DEFAULT_ITEMS: FaqItem[] = [
  { question: "What is Elite Force?", answer: "Elite Force is a high-performance accountability platform where builders and stakers turn focus sessions into on-chain proof of work." },
  { question: "How does token staking work?", answer: "Staking lets you lock your EFC tokens during a focus session. If you complete your session, you retain your tokens and earn yield; if not, your stake remains locked or distributed." },
];

export function FaqAccordion({
  items = DEFAULT_ITEMS,
  title,
  className,
  ...props
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto py-4 font-sans", className)} {...props}>
      {title && (
        <h2 className="text-center font-black text-2xl md:text-3xl mb-8 text-foreground/80 tracking-tight">
          {title}
        </h2>
      )}
      
      <ul className="w-full flex flex-col gap-4 list-none p-0 m-0">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <motion.li
              key={index}
              layout="position"
              className={cn(
                "w-full rounded-2xl border transition-all duration-300 overflow-hidden",
                isActive
                  ? "border-[#FF8A00] bg-white/70 dark:bg-neutral-900/60 shadow-lg shadow-[#FF8A00]/5 backdrop-blur-md"
                  : "border-foreground/10 bg-white/30 dark:bg-white/[0.02] hover:border-foreground/20 hover:bg-white/50 dark:hover:bg-white/[0.04] backdrop-blur-sm"
              )}
            >
              <button
                type="button"
                className="flex flex-row items-center justify-between w-full py-5 px-6 cursor-pointer text-left outline-none border-none bg-transparent"
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                <span className={cn(
                  "pr-6 text-base md:text-lg font-bold transition-colors duration-300 select-none",
                  isActive ? "text-foreground" : "text-foreground/75 group-hover:text-foreground"
                )}>
                  {item.question}
                </span>
                
                {/* Animated Plus-to-Minus Icon */}
                <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                  {/* Horizontal line */}
                  <span className={cn(
                    "absolute w-4 h-0.5 transition-colors duration-300 rounded-full",
                    isActive ? "bg-[#FF8A00]" : "bg-foreground/50"
                  )} />
                  {/* Vertical line (collapses and rotates when active to form a minus) */}
                  <motion.span
                    animate={{ rotate: isActive ? 90 : 0, scaleY: isActive ? 0 : 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={cn(
                      "absolute w-0.5 h-4 transition-colors duration-300 rounded-full",
                      isActive ? "bg-[#FF8A00]" : "bg-foreground/50"
                    )}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-1 text-sm md:text-base font-normal text-foreground/60 leading-relaxed border-t border-foreground/5">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
