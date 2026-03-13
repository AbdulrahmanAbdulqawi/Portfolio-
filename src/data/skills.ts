import type { SkillCategory } from '../types';

export const skillCategories: Record<'en' | 'ar', SkillCategory[]> = {
  en: [
    {
      title: 'Programming Languages',
      icon: 'Code',
      skills: [
        { name: '.NET (C#, ASP.NET, WPF)', level: 'Expert' },
        { name: 'TypeScript/JavaScript', level: 'Solid' },
        { name: 'HTML/CSS', level: 'Solid' },
        { name: 'Angular', level: 'Solid' },
      ],
    },
    {
      title: 'Databases',
      icon: 'Database',
      skills: [
        { name: 'SQL (MySQL, PostgreSQL)', level: 'Expert' },
        { name: 'Oracle', level: 'Solid' },
        { name: 'CouchDB', level: 'Solid' },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'Server',
      skills: [
        { name: 'AWS', level: 'Solid' },
        { name: 'Azure Cloud', level: 'Solid' },
        { name: 'CI/CD Pipelines', level: 'Solid' },
        { name: 'Docker', level: 'Solid' },
      ],
    },
    {
      title: 'Other Technologies',
      icon: 'Globe',
      skills: [
        { name: 'Git (GitHub, GitLab)', level: 'Expert' },
        { name: 'Agile/Scrum', level: 'Solid' },
        { name: 'Network Administration', level: 'Solid' },
        { name: 'Linux/Windows Server', level: 'Solid' },
      ],
    },
  ],
  ar: [
    {
      title: 'لغات البرمجة',
      icon: 'Code',
      skills: [
        { name: '.NET (C#, ASP.NET, WPF)', level: 'Expert' },
        { name: 'TypeScript/JavaScript', level: 'Solid' },
        { name: 'HTML/CSS', level: 'Solid' },
        { name: 'Angular', level: 'Solid' },
      ],
    },
    {
      title: 'قواعد البيانات',
      icon: 'Database',
      skills: [
        { name: 'SQL (MySQL, PostgreSQL)', level: 'Expert' },
        { name: 'Oracle', level: 'Solid' },
        { name: 'CouchDB', level: 'Solid' },
      ],
    },
    {
      title: 'السحابة و DevOps',
      icon: 'Server',
      skills: [
        { name: 'AWS', level: 'Solid' },
        { name: 'Azure Cloud', level: 'Solid' },
        { name: 'CI/CD Pipelines', level: 'Solid' },
        { name: 'Docker', level: 'Solid' },
      ],
    },
    {
      title: 'تقنيات أخرى',
      icon: 'Globe',
      skills: [
        { name: 'Git (GitHub, GitLab)', level: 'Expert' },
        { name: 'Agile/Scrum', level: 'Solid' },
        { name: 'Network Administration', level: 'Solid' },
        { name: 'Linux/Windows Server', level: 'Solid' },
      ],
    },
  ],
};
