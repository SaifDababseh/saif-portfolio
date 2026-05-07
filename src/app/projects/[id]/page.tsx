import { notFound } from "next/navigation";
import { getProjectById, getAllProjects } from "@/lib/data";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const project = getProjectById(params.id);
  if (!project) return {};
  return {
    title: `${project.title} | Saif Dababseh`,
    description: project.shortDescription,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectById(params.id);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
