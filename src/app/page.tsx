import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsPreview } from "@/components/sections/SkillsPreview";
import { getFeaturedProjects } from "@/lib/data";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <HeroSection />
      <FeaturedProjects projects={featuredProjects} />
      <SkillsPreview />
    </>
  );
}
