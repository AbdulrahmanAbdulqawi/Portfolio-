export interface WritingLink {
  label: string;
  url: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

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
  /** Public path or URL to résumé PDF (e.g. `/resume.pdf` in `public/`). */
  resumeUrl?: string;
  /** One line: roles, stack, location / remote — shown in hero. */
  availabilityLine?: string;
  writingLinks?: WritingLink[];
  testimonials?: Testimonial[];
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
  'agent',
  'aiTraining',
  'realEstate',
  'codeGraph',
  'erp',
  'community',
  'refugee',
  'ticket',
  'reel',
] as const;

export type ProjectIllustrationKind = (typeof PROJECT_ILLUSTRATION_KINDS)[number];

export interface ProjectCaseStudy {
  context: string;
  contribution: string;
  outcome: string;
}

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
  /** Optional short line: where to look in the repo (README, folder, etc.). */
  repoNote?: string;
  caseStudy?: ProjectCaseStudy;
}

export interface EducationEntry {
  school: string;
  degree: string;
  location: string;
  period: string;
}
