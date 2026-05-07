"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3" aria-label="Saif Dababseh Home">
            <div className="w-7 h-7 relative flex-shrink-0">
              <div className="absolute inset-0 border border-neon-blue/50 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-1 bg-neon-blue/20 rotate-45 group-hover:bg-neon-blue/40 transition-colors duration-500" />
            </div>
            <span className="font-display text-sm font-bold tracking-[0.2em] uppercase">
              <span className="text-text-primary">Saif</span>
              <span className="text-neon-blue">.D</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link font-accent font-semibold text-sm tracking-[0.15em] uppercase transition-colors duration-300 ${
                    active ? "text-neon-blue active" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/about#contact"
              className="relative px-5 py-2 font-accent font-semibold text-sm tracking-[0.15em] uppercase text-neon-blue border border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/10 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Hire Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/10 to-neon-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-neon-blue transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {navItems.map((item, i) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={item.href}
                    className={`font-display text-3xl font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                      active ? "text-neon-blue text-glow-blue" : "text-text-primary hover:text-neon-blue"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}>
              <Link
                href="/about#contact"
                className="px-8 py-3 font-accent font-semibold text-base tracking-widest uppercase text-neon-blue border border-neon-blue hover:bg-neon-blue/10 transition-all duration-300"
              >
                Hire Me
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
