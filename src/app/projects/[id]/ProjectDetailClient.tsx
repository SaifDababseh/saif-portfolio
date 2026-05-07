"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Layers, User, Wrench, Zap, Trophy, Play, ArrowRight } from "lucide-react";
import { type Project, getRelatedProjects } from "@/lib/data";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag, Button, CornerFrame } from "@/components/ui";

interface Props { project: Project; }

export function ProjectDetailClient({ project }: Props) {
  const [activeGallery, setActiveGallery] = useState(0);
  const related = getRelatedProjects(project.id, project.category);

  return (
    <article className="min-h-screen">
      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <ProjectImage src={project.heroImage} alt={project.title} fill priority className="transition-transform duration-1000 scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        <div className="absolute top-24 md:top-28 left-6 md:left-10">
          <Link href="/projects" className="group inline-flex items-center gap-2 font-accent text-sm tracking-wider uppercase text-text-secondary hover:text-neon-blue transition-colors duration-300">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
            <div className="flex flex-wrap gap-2 mb-4">
              <Tag color="blue">{project.category}</Tag>
              <Tag color="default">{project.year}</Tag>
              <Tag color="purple">{project.status}</Tag>
            </div>
            <h1 className="font-display font-black text-text-primary leading-none mb-2" style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}>
              {project.title}
            </h1>
            <p className="font-accent text-base md:text-xl text-neon-blue tracking-wide">{project.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">

        {/* External links */}
        {(project.links.artstation || project.links.github || project.links.live) && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-14 pb-14 border-b border-border"
          >
            {project.links.artstation && <Button href={project.links.artstation} variant="primary" size="sm" external icon={<ExternalLink size={12} />}>ArtStation</Button>}
            {project.links.github && <Button href={project.links.github} variant="ghost" size="sm" external icon={<Github size={12} />}>GitHub</Button>}
            {project.links.live && <Button href={project.links.live} variant="secondary" size="sm" external icon={<ExternalLink size={12} />}>Live Demo</Button>}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* ── Left: main ─────────────── */}
          <div className="lg:col-span-2 space-y-14">

            {/* Overview */}
            <Section icon={<Layers size={17} />} title="Project Overview" delay={0.05}>
              <p className="font-body text-text-secondary leading-relaxed text-base md:text-lg">{project.fullDescription}</p>
            </Section>

            {/* Gallery */}
            {project.gallery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                <SectionLabel icon={<Layers size={17} />} title="Gallery" />
                <div className="aspect-video relative overflow-hidden border border-border mb-3 cursor-zoom-in">
                  <ProjectImage src={project.gallery[activeGallery]} alt={`${project.title} gallery ${activeGallery + 1}`} fill className="transition-all duration-500" />
                </div>
                {project.gallery.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {project.gallery.map((img, i) => (
                      <button key={i} onClick={() => setActiveGallery(i)}
                        className={`aspect-video relative overflow-hidden border transition-all duration-300 ${activeGallery === i ? "border-neon-blue shadow-neon-blue" : "border-border hover:border-border-bright"}`}
                      >
                        <ProjectImage src={img} alt={`Thumb ${i + 1}`} fill className={`transition-opacity duration-300 ${activeGallery === i ? "opacity-100" : "opacity-50 hover:opacity-80"}`} />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Video */}
            {(project.videoUrl || project.videoEmbed) && (
              <Section icon={<Play size={17} />} title="Video" delay={0.1}>
                {project.videoEmbed ? (
                  <div className="aspect-video w-full border border-border overflow-hidden" dangerouslySetInnerHTML={{ __html: project.videoEmbed }} />
                ) : (
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 border border-border hover:border-neon-blue/40 transition-colors duration-300 group"
                  >
                    <div className="w-9 h-9 bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center flex-shrink-0">
                      <Play size={15} className="text-neon-blue" />
                    </div>
                    <span className="font-accent text-text-secondary group-hover:text-neon-blue transition-colors text-sm">Watch Video</span>
                    <ExternalLink size={13} className="ml-auto text-text-muted" />
                  </a>
                )}
              </Section>
            )}

            {/* Challenges */}
            <Section icon={<Zap size={17} />} title="Challenges Solved" delay={0.1}>
              <CornerFrame className="bg-surface border border-border">
                <p className="font-body text-text-secondary leading-relaxed text-sm md:text-base">{project.challenges}</p>
              </CornerFrame>
            </Section>

            {/* Results */}
            <Section icon={<Trophy size={17} />} title="Results & Impact" delay={0.1}>
              <CornerFrame className="bg-surface border border-neon-blue/20">
                <p className="font-body text-text-secondary leading-relaxed text-sm md:text-base">{project.results}</p>
              </CornerFrame>
            </Section>
          </div>

          {/* ── Right: sidebar ─────────── */}
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Sidebar icon={<User size={15} />} title="My Role" delay={0.15}>
              <p className="font-accent font-semibold text-text-primary text-sm">{project.role}</p>
            </Sidebar>
            <Sidebar icon={<Wrench size={15} />} title="Tools & Tech" delay={0.25}>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => <Tag key={t} color="blue">{t}</Tag>)}
              </div>
            </Sidebar>
            <Sidebar icon={<Layers size={15} />} title="Disciplines" delay={0.35}>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => <Tag key={t} color="default">{t}</Tag>)}
              </div>
            </Sidebar>
          </aside>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mt-20 pt-14 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-lg font-bold text-text-secondary tracking-[0.1em] uppercase">More Projects</h3>
              <Link href="/projects" className="flex items-center gap-2 font-accent text-sm text-text-muted hover:text-neon-blue transition-colors duration-300 tracking-wider uppercase">
                All <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link key={p.id} href={`/projects/${p.id}`} className="group block border border-border hover:border-neon-blue/40 bg-surface transition-all duration-400 overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <ProjectImage src={p.thumbnail} alt={p.title} fill className="transition-transform duration-500 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-base font-bold text-text-primary group-hover:text-neon-blue transition-colors duration-300 mb-1">{p.title}</h4>
                    <p className="font-mono text-xs text-text-muted">{p.category} · {p.year}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function SectionLabel({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="text-neon-blue flex-shrink-0">{icon}</div>
      <h2 className="font-display text-sm font-bold text-text-secondary tracking-[0.15em] uppercase">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
    </div>
  );
}

function Section({ icon, title, delay = 0, children }: { icon: React.ReactNode; title: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
      <SectionLabel icon={icon} title={title} />
      {children}
    </motion.div>
  );
}

function Sidebar({ icon, title, delay = 0, children }: { icon: React.ReactNode; title: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}
      className="p-5 border border-border bg-surface"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="text-neon-blue">{icon}</div>
        <h3 className="font-display text-xs font-bold text-text-secondary tracking-[0.18em] uppercase">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
