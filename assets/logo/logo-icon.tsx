import React from "react";

interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className, size = 32 }: LogoIconProps) {
  return (
    <img
      src="/ef-logo.png"
      alt="Elite Force Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
