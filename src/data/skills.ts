import type { SkillCategory } from '../types';

export const skillCategories: Record<'en' | 'ar', SkillCategory[]> = {
  en: [
    {
      title: 'Languages & Frameworks',
      icon: 'Code',
      skills: [
        { name: 'C# / .NET Core', level: 'Expert' },
        { name: 'SQL', level: 'Expert' },
        { name: 'React / TypeScript', level: 'Solid' },
        { name: 'ASP.NET Core', level: 'Expert' },
        { name: 'REST APIs', level: 'Expert' },
        { name: 'JavaScript / HTML / CSS', level: 'Solid' },
      ],
    },
    {
      title: 'Databases',
      icon: 'Database',
      skills: [
        { name: 'SQL Server', level: 'Expert' },
        { name: 'Entity Framework Core', level: 'Expert' },
        { name: 'T-SQL', level: 'Expert' },
        { name: 'Database design & optimization', level: 'Solid' },
      ],
    },
    {
      title: 'Cloud & DevOps',
      icon: 'Server',
      skills: [
        { name: 'Azure', level: 'Solid' },
        { name: 'Azure DevOps', level: 'Solid' },
        { name: 'CI/CD pipelines', level: 'Solid' },
        { name: 'Docker', level: 'Familiar' },
      ],
    },
    {
      title: 'Tools & Practices',
      icon: 'Code',
      skills: [
        { name: 'Git', level: 'Expert' },
        { name: 'Visual Studio / VS Code', level: 'Expert' },
        { name: 'Agile / Scrum', level: 'Solid' },
        { name: 'Unit testing (xUnit, NUnit)', level: 'Solid' },
      ],
    },
  ],
  ar: [
    {
      title: 'اللغات والأطر',
      icon: 'Code',
      skills: [
        { name: 'C# / .NET Core', level: 'Expert' },
        { name: 'SQL', level: 'Expert' },
        { name: 'React / TypeScript', level: 'Solid' },
        { name: 'ASP.NET Core', level: 'Expert' },
        { name: 'واجهات REST', level: 'Expert' },
        { name: 'JavaScript / HTML / CSS', level: 'Solid' },
      ],
    },
    {
      title: 'قواعد البيانات',
      icon: 'Database',
      skills: [
        { name: 'SQL Server', level: 'Expert' },
        { name: 'Entity Framework Core', level: 'Expert' },
        { name: 'T-SQL', level: 'Expert' },
        { name: 'تصميم وتحسين قواعد البيانات', level: 'Solid' },
      ],
    },
    {
      title: 'السحابة و DevOps',
      icon: 'Server',
      skills: [
        { name: 'Azure', level: 'Solid' },
        { name: 'Azure DevOps', level: 'Solid' },
        { name: 'أنابيب CI/CD', level: 'Solid' },
        { name: 'Docker', level: 'Familiar' },
      ],
    },
    {
      title: 'الأدوات والممارسات',
      icon: 'Code',
      skills: [
        { name: 'Git', level: 'Expert' },
        { name: 'Visual Studio / VS Code', level: 'Expert' },
        { name: 'Agile / Scrum', level: 'Solid' },
        { name: 'اختبار الوحدات (xUnit, NUnit)', level: 'Solid' },
      ],
    },
  ],
};
