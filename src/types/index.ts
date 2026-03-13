export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
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
  logo?: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface EducationEntry {
  school: string;
  location: string;
  degree: string;
  period: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: 'web' | 'desktop' | 'fullstack' | 'other';
  github?: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: 'Expert' | 'Solid' | 'Familiar';
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}
