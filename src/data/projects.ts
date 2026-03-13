import type { Project } from '../types';

export const projects: Record<'en' | 'ar', Project[]> = {
  en: [
    {
      title: 'Student Helper Website',
      description: 'Educational platform built with modern web technologies to help students find opportunities abroad and provide online courses.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
      link: 'https://student-helper.org',
    },
    {
      title: 'Packman Game',
      description: 'A classic Packman game developed from scratch using WPF, demonstrating strong object-oriented programming principles.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
      github: 'https://github.com/AbdulrahmanAbdulqawi',
    },
    {
      title: 'Employee Registration App',
      description: 'Full-stack application with CI/CD pipeline implementation, showcasing modern cloud deployment practices.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
      github: 'https://github.com/AbdulrahmanAbdulqawi',
    },
    {
      title: 'Tobacco Shop Application',
      description: 'Multi-layered application demonstrating various architectural patterns and best practices in software development.',
      technologies: ['C#', 'Java', 'WPF', 'ASP.NET Core'],
      category: 'fullstack',
      github: 'https://github.com/AbdulrahmanAbdulqawi',
    },
  ],
  ar: [
    {
      title: 'موقع مساعد الطلاب',
      description: 'منصة تعليمية مبنية بتقنيات ويب حديثة لمساعدة الطلاب في إيجاد فرص في الخارج وتقديم دورات عبر الإنترنت.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
      link: 'https://student-helper.org',
    },
    {
      title: 'لعبة باكمان',
      description: 'لعبة باكمان كلاسيكية تم تطويرها من الصفر باستخدام WPF، تُظهر مبادئ البرمجة الكائنية القوية.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
      github: 'https://github.com/AbdulrahmanAbdulqawi',
    },
    {
      title: 'تطبيق تسجيل الموظفين',
      description: 'تطبيق متكامل مع تنفيذ خط أنابيب CI/CD، يعرض ممارسات النشر السحابي الحديثة.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
      github: 'https://github.com/AbdulrahmanAbdulqawi',
    },
    {
      title: 'تطبيق متجر التبغ',
      description: 'تطبيق متعدد الطبقات يوضح أنماط معمارية مختلفة وأفضل الممارسات في تطوير البرمجيات.',
      technologies: ['C#', 'Java', 'WPF', 'ASP.NET Core'],
      category: 'fullstack',
      github: 'https://github.com/AbdulrahmanAbdulqawi',
    },
  ],
};

export const projectCategories = ['all', 'web', 'desktop', 'fullstack'] as const;
