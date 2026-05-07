"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 grid-bg">
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
          <div aria-hidden="true" className="font-display font-black leading-none select-none text-neon-blue/8 mb-0"
            style={{ fontSize: "clamp(8rem, 25vw, 18rem)" }}>
            404
          </div>
          <div className="-mt-8 md:-mt-16">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-3">Page Not Found</h1>
            <p className="font-body text-text-secondary mb-10">This sector of the grid doesn&apos;t exist.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/" className="group inline-flex items-center gap-2 px-6 py-3 font-accent font-semibold text-sm tracking-widest uppercase text-background bg-neon-blue hover:bg-neon-blue/90 transition-all duration-300">
                <Home size={14} />
                Return Home
              </Link>
              <Link href="/projects" className="group inline-flex items-center gap-2 px-6 py-3 font-accent font-semibold text-sm tracking-widest uppercase text-neon-purple border border-neon-purple/50 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300">
                <ArrowLeft size={14} />
                View Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
