import React from "react";

interface LogoIconProps {
  className?: string;
}

export default function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 8v8l5 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
