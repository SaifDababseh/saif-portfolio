import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#050508",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: {
    default: "Saif Dababseh | Game Designer & Environment Artist",
    template: "%s | Saif Dababseh",
  },
  description:
    "Portfolio of Saif Dababseh — Game Designer, Environment Artist, and Unity Developer crafting immersive digital worlds.",
  keywords: [
    "Game Designer","Environment Artist","Unity Developer",
    "Saif Dababseh","Game Development","Portfolio","Unity","Unreal Engine",
  ],
  authors: [{ name: "Saif Dababseh" }],
  openGraph: {
    title: "Saif Dababseh | Game Designer & Environment Artist",
    description: "Crafting immersive digital worlds through environment art, game design, and Unity development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saif Dababseh | Game Designer & Environment Artist",
    description: "Crafting immersive digital worlds through environment art and Unity development.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Syne:wght@400;500;600;700;800&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-text-primary overflow-x-hidden">
        <ParticleBackground />
        <Navigation />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
