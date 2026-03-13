import type { Project } from '../types';

export const projectCategories = ['all', 'web', 'desktop', 'fullstack'] as const;

export const projects: Record<'en' | 'ar', Project[]> = {
  en: [
    { title: 'Portfolio', description: 'This console-style portfolio built with React and TypeScript.', technologies: ['React', 'TypeScript', 'Tailwind'], category: 'web' },
    { title: 'API Project', description: 'REST API with .NET Core and SQL Server.', technologies: ['.NET Core', 'SQL'], category: 'fullstack' },
  ],
  ar: [
    { title: 'المحفظة', description: 'هذه المحفظة بأسلوب الكونسول مبنية بـ React و TypeScript.', technologies: ['React', 'TypeScript', 'Tailwind'], category: 'web' },
    { title: 'مشروع API', description: 'واجهة REST مع .NET Core و SQL Server.', technologies: ['.NET Core', 'SQL'], category: 'fullstack' },
  ],
};
