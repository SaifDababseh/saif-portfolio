"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { type Project } from "@/lib/data";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag, SectionTitle, Button } from "@/components/ui";

interface Props { projects: Project[]; }

export function FeaturedProjects({ projects }: Props) {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionTitle
            label="Selected Work"
            title="Featured Projects"
            subtitle="A selection of environments, games, and interactive experiences."
          />
          <div className="hidden md:block flex-shrink-0 mb-12">
            <Button href="/projects" variant="ghost" size="sm" icon={<ArrowRight size={13} />}>
              All Projects
            </Button>
          </div>
        </div>

        <div className="grid gap-5">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center md:hidden"
        >
          <Button href="/projects" variant="ghost" size="sm" icon={<ArrowRight size={13} />}>
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLarge = index === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={`/projects/${project.id}`} className="group block">
        <div className={`relative overflow-hidden border border-border hover:border-neon-blue/40 transition-all duration-500 project-card ${isLarge ? "aspect-[16/7]" : "aspect-[16/6]"}`}>
          <ProjectImage src={project.thumbnail} alt={project.title} fill className="transition-transform duration-700 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <Tag color="blue">{project.category}</Tag>
              <Tag color="default">{project.year}</Tag>
            </div>
            <h3 className={`font-display font-bold text-text-primary mb-2 leading-tight group-hover:text-neon-blue transition-colors duration-300 ${isLarge ? "text-2xl md:text-4xl lg:text-5xl" : "text-xl md:text-2xl lg:text-3xl"}`}>
              {project.title}
            </h3>
            <p className="font-accent text-text-secondary text-sm md:text-base mb-4 max-w-xl leading-relaxed hidden md:block">
              {project.shortDescription}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="font-mono text-xs text-text-muted border border-border/60 px-2 py-1">{tag}</span>
              ))}
              <span className="ml-auto flex items-center gap-2 text-neon-blue font-accent text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View <ExternalLink size={13} />
              </span>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-neon-blue/0 group-hover:border-neon-blue/60 transition-all duration-500 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-neon-purple/0 group-hover:border-neon-purple/60 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}
