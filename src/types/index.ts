export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FactBarEntry {
  label: string;
  value: string;
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
  /** Public path or URL to résumé PDF (e.g. `/resume.pdf` in `public/`). */
  resumeUrl?: string;
  /** Hero portrait. Undefined means "use the bundled default photo" (public/profile.jpg). */
  heroImage?: string;
  /** Availability line shown above the hero h1, e.g. "Open to backend / full-stack roles". */
  availabilityLine: string;
  /** Hero h1, authored as separate lines (rendered with <br /> between them). */
  heroHeadlineLines: string[];
  heroSubline: string;
  factBar: FactBarEntry[];
  contactIntro: string;
  contactMeta: string;
  footerCopyright: string;
}

export interface AboutContent {
  headline: string;
  paragraphs: string[];
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  paragraph: string;
  chips?: string[];
  logo?: string;
}

export interface Recommendation {
  short: string;
  full: string;
  author: string;
  meta: string;
}

export type SkillLevel = 'Daily' | 'Solid' | 'Familiar';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface StackGroup {
  title: string;
  skills: Skill[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  location: string;
  period: string;
}

export type WorkPanel =
  | { kind: 'stats'; stats: { value: string; label: string }[] }
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'terminal'; lines: { text: string; accent?: boolean }[] };

export interface WorkCase {
  number: string;
  name: string;
  stackLine: string;
  headline: string;
  description: string;
  repoUrl: string;
  panel: WorkPanel;
}

export interface AlsoBuiltItem {
  name: string;
  url: string;
}
