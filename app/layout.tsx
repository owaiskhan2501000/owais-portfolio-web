import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Mohammad Owais — AI Researcher, Animator & Developer",
  description:
    "Portfolio of Mohammad Owais — final-year CS student specialising in AI research, 2D animation, and full-stack web development. Explore projects, skills, and animation reel.",
  keywords: [
    "Mohammad Owais",
    "AI researcher",
    "web developer",
    "2D animator",
    "portfolio",
    "Next.js",
    "computer vision",
  ],
  authors: [{ name: "Mohammad Owais" }],
  creator: "Mohammad Owais",
  openGraph: {
    type: "website",
    title: "Mohammad Owais — AI Researcher, Animator & Developer",
    description:
      "AI research, creative animation & modern web engineering — all in one portfolio.",
    siteName: "Mohammad Owais Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Owais — AI Researcher, Animator & Developer",
    description:
      "AI research, creative animation & modern web engineering — all in one portfolio.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}