"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const onMouse = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        if (!bgRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        bgRef.current.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
      });
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => { window.removeEventListener("mousemove", onMouse); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[360, 560, 760, 960].map((size, i) => (
          <motion.div
            key={size}
            className="absolute border border-neon-blue/[0.04] rounded-full"
            style={{ width: size, height: size }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
      </div>

      {/* Parallax wrapper */}
      <div ref={bgRef} className="relative z-10 text-center px-6 max-w-6xl mx-auto transition-transform duration-200 ease-out w-full">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-neon-blue" />
          <span className="font-mono text-xs text-neon-blue tracking-[0.4em] uppercase select-none">Portfolio · 2026</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-neon-blue" />
        </motion.div>

        {/* Name */}
        <h1 className="font-display font-black text-text-primary leading-none mb-2 select-none"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >SAIF</motion.span>
          <motion.span
            className="block text-neon-blue text-glow-blue"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.23, 1, 0.32, 1] }}
          >DABABSEH</motion.span>
        </h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-8 mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-accent font-semibold text-sm md:text-base tracking-[0.2em] uppercase">
            <span className="text-neon-blue">Game Designer</span>
            <span className="text-border-bright">·</span>
            <span className="text-text-secondary">Environment Artist</span>
            <span className="text-border-bright">·</span>
            <span className="text-neon-purple">Unity Developer</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-accent font-bold text-sm tracking-[0.2em] uppercase text-background bg-neon-blue hover:bg-neon-blue/90 transition-all duration-300 btn-glow"
          >
            View Projects
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/about"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 font-accent font-bold text-sm tracking-[0.2em] uppercase text-neon-purple border border-neon-purple/50 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              About Me
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-xs mx-auto"
        >
          {[{ num: "4+", label: "Projects" }, { num: "2+", label: "Years Exp" }, { num: "3", label: "Engines" }].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-xl font-black text-neon-blue mb-1">{s.num}</div>
              <div className="font-mono text-[10px] text-text-muted tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-text-muted tracking-[0.4em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={18} className="text-neon-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
}
