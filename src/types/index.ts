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
  /** GitHub repo for open work, or the live product URL for closed-source work.
   * The link label is derived from the host, so both round-trip through the one DB column. */
  repoUrl: string;
  panel: WorkPanel;
}

export interface AlsoBuiltItem {
  name: string;
  url: string;
}

/** `private` means closed source with nothing to link; the UI renders a label, never an anchor.
 * That invariant is enforced server-side too, so a url can't sneak back onto a private row. */
export type ProjectStatus = 'live' | 'private' | 'archived';

export interface Project {
  name: string;
  description: string;
  stackLine: string;
  year: string;
  /** Empty whenever there is nothing public to point at. */
  url: string;
  status: ProjectStatus;
  /** Shown before the reader expands the full index. */
  featured: boolean;
}

export type BlogStatus = 'draft' | 'published';

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: Record<'en' | 'ar', string>;
  excerpt: Record<'en' | 'ar', string>;
  coverImageUrl?: string;
  publishedAt: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  bodyHtml: Record<'en' | 'ar', string>;
}

export interface AdminBlogPostSummary {
  id: string;
  slug: string;
  title: Record<'en' | 'ar', string>;
  status: BlogStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBlogPostDetail extends AdminBlogPostSummary {
  excerpt: Record<'en' | 'ar', string>;
  bodyHtml: Record<'en' | 'ar', string>;
  coverImageUrl?: string;
}

export interface BlogPostWrite {
  slug: string;
  title: Record<'en' | 'ar', string>;
  excerpt: Record<'en' | 'ar', string>;
  bodyHtml: Record<'en' | 'ar', string>;
  coverImageUrl?: string;
  status: BlogStatus;
}
