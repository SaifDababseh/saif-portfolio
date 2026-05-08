"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag as TagIcon, ArrowRight } from "lucide-react";
import { type BlogPost, getBlogPosts } from "@/lib/data";
import { ProjectImage } from "@/components/ui/ProjectImage";
import { Tag } from "@/components/ui";
import { formatDate } from "@/lib/utils";

const CAT_COLORS: Record<string, "blue" | "purple" | "cyan" | "default"> = {
  "Environment Art": "blue",
  "Game Design": "purple",
  "Technical": "cyan",
};

export function BlogPostClient({ post }: { post: BlogPost }) {
  const related = getBlogPosts().filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <article className="min-h-screen pt-28 md:pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <Link href="/blog" className="group inline-flex items-center gap-2 font-accent text-sm tracking-wider uppercase text-text-secondary hover:text-neon-blue transition-colors duration-300">
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex flex-wrap gap-2 mb-5">
            <Tag color={CAT_COLORS[post.category] || "default"}>{post.category}</Tag>
          </div>
          <h1 className="font-display text-2xl md:text-4xl font-black text-text-primary leading-tight mb-5">{post.title}</h1>
          <div className="flex items-center gap-5 text-text-muted font-mono text-xs mb-8">
            <span className="flex items-center gap-1.5"><Calendar size={11} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
          </div>
          <div className="aspect-video relative overflow-hidden border border-border mb-12">
            <ProjectImage src={post.thumbnail} alt={post.title} fill priority />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="p-8 border border-neon-blue/20 bg-surface text-center mb-12">
            <div className="font-mono text-xs text-neon-blue mb-3 tracking-widest uppercase">{/* Article Content */}</div>
            <p className="font-body text-text-secondary leading-relaxed mb-4">{post.excerpt}</p>
            <p className="font-mono text-xs text-text-muted leading-relaxed">
              Full article content goes here. Add a{" "}
              <code className="text-neon-blue px-1 bg-neon-blue/10">content</code> field to{" "}
              <code className="text-neon-blue px-1 bg-neon-blue/10">/public/data/portfolio.json</code>{" "}
              or connect a CMS like Sanity or Contentful.
            </p>
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-border">
            <div className="flex items-center gap-3 flex-wrap">
              <TagIcon size={13} className="text-text-muted" />
              {post.tags.map((tag) => <Tag key={tag} color="default">{tag}</Tag>)}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14 pt-10 border-t border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-sm font-bold text-text-secondary tracking-[0.12em] uppercase">More Articles</h3>
                <Link href="/blog" className="flex items-center gap-1 font-mono text-xs text-text-muted hover:text-neon-blue transition-colors">
                  All <ArrowRight size={11} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.id}`} className="group block border border-border hover:border-neon-blue/40 bg-surface transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      <ProjectImage src={p.thumbnail} alt={p.title} fill className="transition-transform duration-500 group-hover:scale-[1.04]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-display text-sm font-bold text-text-primary group-hover:text-neon-blue transition-colors duration-300 mb-1 leading-snug">{p.title}</h4>
                      <span className="font-mono text-xs text-text-muted">{p.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </article>
  );
}
