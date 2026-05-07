"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getAllProjects } from "@/lib/data";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { SectionTitle, Tag } from "@/components/ui";
import { ExternalLink } from "lucide-react";

const CATEGORIES = ["All", "Environment Art", "Game Design"];

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Portfolio" title="All Projects"
          subtitle="Game environments, interactive systems, and design explorations." />

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-12 -mt-4">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? allProjects.length : allProjects.filter((p) => p.category === cat).length;
            return (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-5 py-2 font-accent font-semibold text-sm tracking-[0.12em] uppercase border transition-all duration-300 ${
                  active === cat
                    ? "border-neon-blue text-neon-blue bg-neon-blue/10"
                    : "border-border text-text-muted hover:border-border-bright hover:text-text-secondary"
                }`}
              >
                {cat}
                <span className="ml-2 font-mono text-xs opacity-50">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {filtered.map((project, i) => (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link href={`/projects/${project.id}`} className="group block h-full">
                  <div className="h-full border border-border hover:border-neon-blue/40 transition-all duration-500 project-card overflow-hidden bg-surface">
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden">
                      <ProjectImage src={project.thumbnail} alt={project.title} fill
                        className="transition-transform duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 right-4">
                        <span className="font-mono text-xs px-2 py-1 border border-neon-blue/30 text-neon-blue bg-background/80 backdrop-blur-sm">
                          {project.status}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-neon-blue text-background font-accent font-bold text-sm tracking-widest uppercase">
                          View Project <ExternalLink size={13} />
                        </div>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Tag color="blue">{project.category}</Tag>
                        <Tag color="default">{project.year}</Tag>
                      </div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-2 group-hover:text-neon-blue transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="font-mono text-xs text-text-muted border border-border px-2 py-0.5">{tag}</span>
                        ))}
                      </div>
                    </div>
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-neon-blue/0 group-hover:border-neon-blue/60 transition-all duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-neon-purple/0 group-hover:border-neon-purple/60 transition-all duration-500 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="text-center py-20 font-mono text-text-muted">No projects in this category yet.</p>
        )}
      </div>
    </div>
  );
}
