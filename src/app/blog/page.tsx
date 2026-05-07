"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/data";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { SectionTitle, Tag } from "@/components/ui";
import { formatDate } from "@/lib/utils";

const CAT_COLORS: Record<string, "blue" | "purple" | "cyan" | "default"> = {
  "Environment Art": "blue",
  "Game Design": "purple",
  "Technical": "cyan",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Writing" title="Blog & Articles"
          subtitle="Thoughts on game design, environment art, and technical deep-dives from production." />

        {/* Featured */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10">
            <Link href={`/blog/${featured.id}`} className="group block">
              <div className="grid md:grid-cols-2 border border-border hover:border-neon-blue/40 transition-all duration-500 overflow-hidden bg-surface">
                <div className="aspect-video md:aspect-auto relative overflow-hidden min-h-[220px]">
                  <ProjectImage src={featured.thumbnail} alt={featured.title} fill className="transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/40 hidden md:block" />
                </div>
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs text-neon-blue border border-neon-blue/30 px-2 py-0.5 bg-neon-blue/5">FEATURED</span>
                    <Tag color={CAT_COLORS[featured.category] || "default"}>{featured.category}</Tag>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-text-primary mb-4 leading-tight group-hover:text-neon-blue transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="font-body text-text-secondary leading-relaxed mb-6 text-sm md:text-base">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-text-muted font-mono text-xs">
                      <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(featured.date)}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{featured.readTime}</span>
                    </div>
                    <span className="flex items-center gap-2 text-neon-blue font-accent text-sm font-semibold tracking-wide group-hover:gap-3 transition-all duration-300">
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.id}`} className="group block h-full">
                  <div className="h-full border border-border hover:border-neon-blue/40 bg-surface transition-all duration-500 overflow-hidden flex flex-col project-card">
                    <div className="aspect-video relative overflow-hidden">
                      <ProjectImage src={post.thumbnail} alt={post.title} fill className="transition-transform duration-700 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent opacity-70" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Tag color={CAT_COLORS[post.category] || "default"}>{post.category}</Tag>
                      </div>
                      <h3 className="font-display text-base md:text-lg font-bold text-text-primary mb-3 leading-snug group-hover:text-neon-blue transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed mb-5 flex-1 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 text-text-muted font-mono text-xs">
                          <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(post.date)}</span>
                          <span className="flex items-center gap-1"><Clock size={10} />{post.readTime}</span>
                        </div>
                        <ArrowRight size={13} className="text-neon-blue opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <p className="text-center py-20 font-mono text-text-muted">Articles coming soon.</p>
        )}
      </div>
    </div>
  );
}
