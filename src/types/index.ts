export interface SiteConfig {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  description: string;
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

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  github?: string;
  link?: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  location: string;
  period: string;
}
