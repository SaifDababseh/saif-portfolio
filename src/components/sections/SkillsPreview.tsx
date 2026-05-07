"use client";

import { motion } from "framer-motion";
import { SectionTitle, GlowDivider } from "@/components/ui";

const skills = [
  { name: "Unity HDRP/URP", category: "Engine", level: 90, color: "text-neon-blue" },
  { name: "Environment Art", category: "Art", level: 88, color: "text-neon-purple" },
  { name: "Level Design", category: "Design", level: 88, color: "text-neon-purple" },
  { name: "C# Development", category: "Code", level: 85, color: "text-neon-cyan" },
  { name: "Shader Graph", category: "Tech", level: 85, color: "text-neon-blue" },
  { name: "Blender", category: "3D", level: 88, color: "text-neon-cyan" },
  { name: "Unreal Engine 5", category: "Engine", level: 75, color: "text-neon-blue" },
  { name: "Substance Painter", category: "Art", level: 82, color: "text-neon-purple" },
];

const services = [
  { icon: "◈", title: "Environment Art", desc: "Photorealistic scenes built from scratch" },
  { icon: "◉", title: "Game Design", desc: "Systems, levels, and game feel" },
  { icon: "◈", title: "Unity Dev", desc: "C#, shaders, and custom tooling" },
  { icon: "◉", title: "3D Modeling", desc: "Blender to game-ready assets" },
];

export function SkillsPreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <GlowDivider />
        <div className="grid md:grid-cols-2 gap-16 items-start mt-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <SectionTitle label="Capabilities" title="What I Do"
              subtitle="Bridging artistic vision and technical execution — I craft worlds that feel real, systems that feel great, and experiences that leave impressions." />
            <div className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <div key={s.title} className="p-4 border border-border bg-surface hover:border-neon-blue/30 transition-colors duration-300 group">
                  <div className="text-neon-blue text-xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{s.icon}</div>
                  <div className="font-display text-sm font-bold text-text-primary mb-1">{s.title}</div>
                  <div className="font-body text-xs text-text-muted leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: skill bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-5"
          >
            {skills.map((skill, i) => (
              <motion.div key={skill.name}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.055 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-[10px] tracking-widest ${skill.color}`}>{skill.category.toUpperCase()}</span>
                    <span className="font-accent font-semibold text-sm text-text-primary">{skill.name}</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted">{skill.level}%</span>
                </div>
                <div className="h-[3px] bg-surface-3 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.055, ease: [0.23, 1, 0.32, 1] }}
                    style={{ boxShadow: "0 0 8px rgba(0,212,255,0.5)" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
