import portfolioData from "../../public/data/portfolio.json";

export interface ProjectLink {
  artstation?: string;
  github?: string;
  live?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  year: string;
  status: string;
  featured: boolean;
  thumbnail: string;
  heroImage: string;
  gallery: string[];
  videoUrl: string;
  videoEmbed: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  tools: string[];
  challenges: string;
  results: string;
  links: ProjectLink;
}

export interface SkillItem { name: string; level: number; }
export interface SkillCategory { category: string; items: SkillItem[]; }
export interface Experience { title: string; company: string; period: string; description: string; }
export interface Education { degree: string; institution: string; period: string; focus: string; }

export interface About {
  name: string; title: string; bio: string; email: string; linkedin: string;
  github: string; whatsapp: string; location: string; availability: string;
  resumeUrl: string; skills: SkillCategory[]; experience: Experience[]; education: Education[];
}

export interface BlogPost {
  id: string; title: string; category: string; date: string;
  readTime: string; excerpt: string; thumbnail: string; tags: string[];
}

export const getAllProjects = (): Project[] => portfolioData.projects as Project[];
export const getFeaturedProjects = (): Project[] => (portfolioData.projects as Project[]).filter((p) => p.featured);
export const getProjectById = (id: string): Project | undefined => (portfolioData.projects as Project[]).find((p) => p.id === id);
export const getAbout = (): About => portfolioData.about as About;
export const getBlogPosts = (): BlogPost[] => portfolioData.blog as BlogPost[];
export const getBlogPostById = (id: string): BlogPost | undefined => (portfolioData.blog as BlogPost[]).find((p) => p.id === id);
export const getRelatedProjects = (currentId: string, category: string, limit = 2): Project[] =>
  (portfolioData.projects as Project[]).filter((p) => p.id !== currentId && p.category === category).slice(0, limit);
