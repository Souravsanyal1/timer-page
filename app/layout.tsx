import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Elite Force — Build Your Focus",
  description:
    "A premium futuristic Focus Timer app. Stay productive, deep work, no distractions. Built with Vengence UI, Next.js, and Framer Motion.",
  keywords: ["focus timer", "pomodoro", "productivity", "deep work"],
  openGraph: {
    title: "Elite Force — Build Your Focus",
    description: "Premium futuristic Focus Timer. Apple + Linear + Raycast inspired.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/ef-logo.png?v=3" type="image/png" />
      </head>
      <body className="min-h-screen antialiased" suppressHydrationWarning style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

