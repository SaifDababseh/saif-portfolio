import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        surface: "#0d0d14",
        "surface-2": "#12121c",
        "surface-3": "#1a1a28",
        border: "#1e1e32",
        "border-bright": "#2a2a45",
        "neon-blue": "#00d4ff",
        "neon-purple": "#a855f7",
        "neon-cyan": "#06ffd8",
        "neon-violet": "#7c3aed",
        "text-primary": "#f0f0fa",
        "text-secondary": "#8888aa",
        "text-muted": "#44445a",
      },
      fontFamily: {
        display: ["'Orbitron'", "monospace"],
        body: ["'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        accent: ["'Rajdhani'", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "glitch": "glitch 0.3s ease-in-out",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(2px, -2px)" },
          "60%": { transform: "translate(-1px, 1px)" },
          "80%": { transform: "translate(1px, -1px)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)",
        "hero-gradient": "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(13,13,20,0.9) 0%, rgba(18,18,28,0.9) 100%)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },
      boxShadow: {
        "neon-blue": "0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)",
        "neon-purple": "0 0 20px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.1)",
        "card": "0 4px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glow-sm": "0 0 10px rgba(0, 212, 255, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
