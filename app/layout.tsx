import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { profile, research, siteUrl } from "@/lib/data";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

const title = `${profile.name} — ${profile.role} · Medical Image Super-Resolution`;
const description =
  "Portfolio of Mohammad Owais, undergraduate researcher at AUST working on brain MRI super-resolution, hallucination and diagnostic fidelity of deep learning models. First author of a CNN-vs-Transformer SR benchmark under review at a Springer Nature SCIE journal.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#13120f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: `${profile.name} Portfolio`,
  keywords: [
    "Mohammad Owais",
    "medical image analysis",
    "brain MRI super-resolution",
    "SwinIR",
    "Real-ESRGAN",
    "EDSR",
    "computer vision researcher",
    "deep learning",
    "AUST",
    "Pakistan",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: siteUrl,
    title,
    description,
    siteName: `${profile.name} Portfolio`,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: siteUrl,
  image: `${siteUrl}${profile.photo}`,
  address: { "@type": "PostalAddress", addressLocality: "Mianwali", addressCountry: "PK" },
  affiliation: { "@type": "CollegeOrUniversity", name: "Abbottabad University of Science and Technology" },
  knowsAbout: ["Medical image analysis", "Super-resolution", "Deep learning", "Computer vision", research.short],
  sameAs: Object.values(profile.socials),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} grain antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
