import React from "react";

interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className, size = 32 }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ef-grad-main" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFB300"/>
          <stop offset="100%" stopColor="#FF5500"/>
        </linearGradient>
        <linearGradient id="ef-grad-shadow" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CC4400"/>
          <stop offset="100%" stopColor="#993300"/>
        </linearGradient>
      </defs>
      {/* E letter */}
      <rect x="12" y="22" width="28" height="8" rx="2" fill="url(#ef-grad-main)"/>
      <rect x="12" y="38" width="22" height="7" rx="2" fill="url(#ef-grad-main)"/>
      <rect x="12" y="54" width="28" height="8" rx="2" fill="url(#ef-grad-main)"/>
      <rect x="12" y="22" width="8" height="40" rx="2" fill="url(#ef-grad-main)"/>
      {/* F letter */}
      <rect x="48" y="22" width="8" height="40" rx="2" fill="url(#ef-grad-main)"/>
      <rect x="48" y="22" width="28" height="8" rx="2" fill="url(#ef-grad-main)"/>
      <rect x="48" y="38" width="22" height="7" rx="2" fill="url(#ef-grad-main)"/>
      {/* 3D shadow depth */}
      <rect x="14" y="62" width="28" height="4" rx="2" fill="url(#ef-grad-shadow)" opacity="0.5"/>
      <rect x="50" y="62" width="28" height="4" rx="2" fill="url(#ef-grad-shadow)" opacity="0.5"/>
    </svg>
  );
}
