"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

const socials = [
  { href: "https://github.com/saifdababseh", icon: <Github size={16} />, label: "GitHub" },
  { href: "https://linkedin.com/in/saifdababseh", icon: <Linkedin size={16} />, label: "LinkedIn" },
  { href: "mailto:saif.dababseh@email.com", icon: <Mail size={16} />, label: "Email" },
  { href: "https://wa.me/970591234567", icon: <MessageCircle size={16} />, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display text-sm font-bold tracking-[0.2em] uppercase">
              <span className="text-text-primary">Saif</span>
              <span className="text-neon-blue">.D</span>
            </span>
            <span className="font-mono text-xs text-text-muted tracking-wider">
              Game Designer · Environment Artist · Unity Developer
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-accent text-xs tracking-[0.15em] uppercase text-text-muted hover:text-neon-blue transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-text-muted hover:text-neon-blue transition-colors duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="font-mono text-xs text-text-muted">
            © 2024 Saif Dababseh. All rights reserved.
          </span>
          <span className="font-mono text-xs text-text-muted">
            Built with Next.js · Tailwind CSS · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}
