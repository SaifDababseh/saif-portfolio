import { notFound } from "next/navigation";
import { getBlogPostById, getBlogPosts } from "@/lib/data";
import { BlogPostClient } from "./BlogPostClient";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return getBlogPosts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const post = getBlogPostById(params.id);
  if (!post) return {};
  return {
    title: `${post.title} | Saif Dababseh`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPostById(params.id);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}
