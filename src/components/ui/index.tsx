"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Button ────────────────────────────────────────────────────────────────────
interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  external?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function Button({
  children, href, onClick, variant = "primary", size = "md",
  className, external, icon, disabled,
}: ButtonProps) {
  const base = "relative inline-flex items-center gap-2 font-accent font-semibold tracking-[0.15em] uppercase transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };
  const variants = {
    primary: "text-neon-blue border border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 hover:shadow-neon-blue",
    secondary: "text-neon-purple border border-neon-purple/50 hover:border-neon-purple hover:bg-neon-purple/10",
    ghost: "text-text-secondary border border-border hover:border-border-bright hover:text-text-primary",
  };
  const cls = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
      {icon && <span className="relative z-10 flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </>
  );
  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
    return <Link href={href} className={cls}>{inner}</Link>;
  }
  return <button onClick={onClick} disabled={disabled} className={cls}>{inner}</button>;
}

// ── SectionTitle ──────────────────────────────────────────────────────────────
interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({ label, title, subtitle, align = "left", className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      {label && (
        <div className={cn("flex items-center gap-3 mb-4", align === "center" && "justify-center")}>
          <div className="h-px w-8 bg-neon-blue" />
          <span className="font-mono text-xs text-neon-blue tracking-[0.3em] uppercase">{label}</span>
          <div className="h-px w-8 bg-neon-blue" />
        </div>
      )}
      <h2 className="font-display text-section-title font-bold text-text-primary leading-tight">{title}</h2>
      {subtitle && (
        <p className={cn("mt-4 text-text-secondary font-body text-lg leading-relaxed", align === "left" ? "max-w-2xl" : "max-w-3xl mx-auto")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

// ── Tag ───────────────────────────────────────────────────────────────────────
type TagColor = "blue" | "purple" | "cyan" | "default";
interface TagProps { children: React.ReactNode; color?: TagColor; className?: string; }

export function Tag({ children, color = "default", className }: TagProps) {
  const colors: Record<TagColor, string> = {
    blue: "border-neon-blue/30 text-neon-blue bg-neon-blue/5",
    purple: "border-neon-purple/30 text-neon-purple bg-neon-purple/5",
    cyan: "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5",
    default: "border-border text-text-muted bg-surface",
  };
  return (
    <span className={cn("inline-block px-3 py-1 text-xs font-mono border tracking-wider", colors[color], className)}>
      {children}
    </span>
  );
}

// ── GlowDivider ───────────────────────────────────────────────────────────────
export function GlowDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px my-16", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neon-blue rotate-45 shadow-glow-sm" />
    </div>
  );
}

// ── CornerFrame ───────────────────────────────────────────────────────────────
export function CornerFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative p-6", className)}>
      <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-neon-blue/60" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-neon-purple/60" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-neon-purple/60" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-neon-blue/60" />
      {children}
    </div>
  );
}
