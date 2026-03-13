import type { Project } from '../types';

export const projectCategories = ['all', 'web', 'desktop', 'fullstack'] as const;

export const projects: Record<'en' | 'ar', Project[]> = {
  en: [
    {
      title: 'ASP.NET Core Identity Authentication',
      description: 'A comprehensive authentication system built with ASP.NET Core Identity, featuring user management, role-based authorization, and secure password handling.',
      technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'JWT', 'Identity'],
      category: 'fullstack',
    },
    {
      title: 'Explainable Neural Networks Development',
      description: 'Thesis project utilizing Python to conduct experiments. The goal was to create neural network models that are simpler and easier to interpret.',
      technologies: ['Python', 'Deep Learning', 'Neural Networks'],
      category: 'fullstack',
    },
    {
      title: 'Student Helper Website',
      description: 'Educational platform built with modern web technologies to help students find opportunities abroad and provide online courses.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
    },
    {
      title: 'Pacman Game',
      description: 'A classic Pacman game developed from scratch using WPF, demonstrating strong object-oriented programming principles.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
    },
    {
      title: 'Employee Registration App',
      description: 'Full-stack application with CI/CD pipeline implementation, showcasing modern cloud deployment practices.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
    },
  ],
  ar: [
    {
      title: 'مصادقة ASP.NET Core Identity',
      description: 'نظام مصادقة شامل مبني على ASP.NET Core Identity، يتضمن إدارة المستخدمين والتفويض القائم على الأدوار ومعالجة كلمات المرور بشكل آمن.',
      technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'JWT', 'Identity'],
      category: 'fullstack',
    },
    {
      title: 'تطوير شبكات عصبية قابلة للتفسير',
      description: 'مشروع أطروحة باستخدام Python لإجراء تجارب. الهدف كان إنشاء نماذج شبكات عصبية أبسط وأسهل تفسيراً.',
      technologies: ['Python', 'Deep Learning', 'Neural Networks'],
      category: 'fullstack',
    },
    {
      title: 'موقع مساعد الطالب',
      description: 'منصة تعليمية مبنية بتقنيات ويب حديثة لمساعدة الطلاب في إيجاد فرص في الخارج وتقديم دورات عبر الإنترنت.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
    },
    {
      title: 'لعبة باكمان',
      description: 'لعبة باكمان كلاسيكية مطورة من الصفر باستخدام WPF، تعرض مبادئ برمجة كائنية التوجه قوية.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
    },
    {
      title: 'تطبيق تسجيل الموظفين',
      description: 'تطبيق full-stack مع تنفيذ خط أنابيب CI/CD، يعرض ممارسات النشر السحابي الحديثة.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
    },
  ],
};
