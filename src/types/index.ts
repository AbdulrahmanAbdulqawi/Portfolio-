export interface SiteConfig {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  description: string;
  /** Short intro shown on Home section (console view) */
  homeIntro?: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: { platform: string; url: string; icon: string }[];
  navItems: string[];
}

export interface AboutLink {
  text: string;
  url: string;
}

export interface AboutParagraph {
  text: string;
  link?: AboutLink;
}

export interface AboutContent {
  headline: string;
  paragraphs: AboutParagraph[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const PROJECT_ILLUSTRATION_KINDS = [
  'neural',
  'educationWeb',
  'arcadeGame',
  'cloudPipeline',
  'multiLayerApp',
  'prototypeIdeas',
] as const;

export type ProjectIllustrationKind = (typeof PROJECT_ILLUSTRATION_KINDS)[number];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  /** Optional screenshot or cover (public path or URL). */
  image?: string;
  /** Decorative SVG when `image` is omitted. */
  illustration: ProjectIllustrationKind;
  github?: string;
  link?: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  location: string;
  period: string;
}
