"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircle, MapPin, Download, Briefcase, GraduationCap, Clock } from "lucide-react";
import { getAbout } from "@/lib/data";
import { SectionTitle, Tag, Button, GlowDivider, CornerFrame } from "@/components/ui";

export default function AboutPage() {
  const about = getAbout();
  const [firstName, lastName] = about.name.split(" ");

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Bio ───────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-24">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-neon-blue" />
              <span className="font-mono text-xs text-neon-blue tracking-[0.3em] uppercase">About</span>
            </div>
            <h1 className="font-display font-black text-text-primary leading-none"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
              {firstName}
            </h1>
            <h1 className="font-display font-black text-neon-blue text-glow-blue leading-none mb-8"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
              {lastName}
            </h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {about.title.split(" | ").map((t) => <Tag key={t} color="blue">{t}</Tag>)}
            </div>
            <div className="space-y-4 mb-10">
              {about.bio.split("\n\n").map((para, i) => (
                <p key={i} className="font-body text-text-secondary leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={about.resumeUrl} variant="primary" size="md" icon={<Download size={13} />} external>
                Download Resume
              </Button>
              <Button href="#contact" variant="ghost" size="md">Get In Touch</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }} className="flex flex-col gap-5">
            {/* Availability */}
            <div className="p-4 border border-neon-cyan/30 bg-neon-cyan/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <span className="font-display text-sm font-bold text-neon-cyan tracking-[0.12em] uppercase">{about.availability}</span>
              </div>
            </div>

            {/* Location + stats */}
            <CornerFrame className="border border-border bg-surface">
              <div className="flex items-start gap-3 mb-6">
                <MapPin size={15} className="text-neon-blue mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-mono text-xs text-text-muted mb-1 tracking-wider uppercase">Location</div>
                  <div className="font-accent font-semibold text-text-primary text-sm">{about.location}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{ num: "4+", label: "Projects" }, { num: "2+", label: "Years" }, { num: "3", label: "Engines" }].map((s) => (
                  <div key={s.label} className="text-center p-3 bg-surface-2 border border-border">
                    <div className="font-display text-xl font-black text-neon-blue">{s.num}</div>
                    <div className="font-mono text-[10px] text-text-muted mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </CornerFrame>

            {/* Education */}
            {about.education.map((edu) => (
              <div key={edu.degree} className="p-5 border border-border bg-surface flex gap-4">
                <GraduationCap size={17} className="text-neon-purple flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm font-bold text-text-primary mb-1">{edu.degree}</div>
                  <div className="font-accent text-text-secondary text-sm">{edu.institution}</div>
                  <div className="font-mono text-xs text-text-muted mt-1">{edu.period}</div>
                  <div className="font-mono text-xs text-text-muted/70 mt-0.5">{edu.focus}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <GlowDivider />

        {/* ── Skills ───────────────────────────────── */}
        <section className="my-24">
          <SectionTitle label="Expertise" title="Skills & Tools" align="center" />
          <div className="grid md:grid-cols-2 gap-10 mt-12">
            {about.skills.map((cat, ci) => (
              <motion.div key={cat.category}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: ci * 0.1 }}
              >
                <h3 className="font-display text-xs font-bold text-neon-blue tracking-[0.25em] uppercase mb-5">{cat.category}</h3>
                <div className="space-y-4">
                  {cat.items.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="font-accent font-semibold text-sm text-text-primary">{skill.name}</span>
                        <span className="font-mono text-xs text-text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-[3px] bg-surface-3 overflow-hidden rounded-full">
                        <motion.div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: ci * 0.1 + si * 0.05, ease: [0.23, 1, 0.32, 1] }}
                          style={{ boxShadow: "0 0 8px rgba(0,212,255,0.4)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GlowDivider />

        {/* ── Experience ───────────────────────────── */}
        <section className="my-24">
          <SectionTitle label="Background" title="Experience" />
          <div className="space-y-5 mt-10">
            {about.experience.map((exp, i) => (
              <motion.div key={exp.title}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-5 p-5 border border-border bg-surface hover:border-neon-blue/30 transition-colors duration-300 group"
              >
                <div className="w-10 h-10 border border-border-bright group-hover:border-neon-blue/40 transition-colors flex items-center justify-center flex-shrink-0">
                  <Briefcase size={15} className="text-neon-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-sm font-bold text-text-primary">{exp.title}</h3>
                    <span className="flex items-center gap-1 text-text-muted font-mono text-xs flex-shrink-0">
                      <Clock size={10} />{exp.period}
                    </span>
                  </div>
                  <div className="font-accent text-neon-blue text-sm mb-2">{exp.company}</div>
                  <p className="font-body text-text-secondary text-sm leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <GlowDivider />

        {/* ── Contact ──────────────────────────────── */}
        <section id="contact" className="my-24 scroll-mt-28">
          <SectionTitle label="Let's Connect" title="Get In Touch"
            subtitle="Open to internships, freelance projects, and full-time opportunities." align="center" />

          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.7 }} className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10"
          >
            {[
              { icon: <Mail size={20} />, label: "Email", value: about.email, href: `mailto:${about.email}`, cls: "border-neon-blue/30 hover:border-neon-blue text-neon-blue" },
              { icon: <Linkedin size={20} />, label: "LinkedIn", value: "linkedin.com/in/saifdababseh", href: about.linkedin, cls: "border-neon-blue/30 hover:border-neon-blue text-neon-blue" },
              { icon: <Github size={20} />, label: "GitHub", value: "github.com/saifdababseh", href: about.github, cls: "border-neon-purple/30 hover:border-neon-purple text-neon-purple" },
              { icon: <MessageCircle size={20} />, label: "WhatsApp", value: about.whatsapp, href: `https://wa.me/${about.whatsapp.replace(/\D/g, "")}`, cls: "border-neon-cyan/30 hover:border-neon-cyan text-neon-cyan" },
            ].map((c, i) => (
              <motion.a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className={`p-6 border bg-surface flex flex-col items-center text-center gap-3 transition-all duration-300 group ${c.cls}`}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">{c.icon}</div>
                <div>
                  <div className="font-display text-xs font-bold tracking-[0.15em] uppercase mb-1">{c.label}</div>
                  <div className="font-mono text-xs text-text-muted break-all leading-relaxed">{c.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
