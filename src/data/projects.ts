import type { Project } from '../types';

export const projectCategories = ['all', 'web', 'desktop', 'fullstack'] as const;

export const projects: Record<'en' | 'ar', Project[]> = {
  en: [
    {
      title: 'Neural Network Models (thesis)',
      description:
        'Thesis work in Python to run experiments and build machine learning models that are simpler and easier to interpret than conventional black-box approaches.',
      technologies: ['Python', 'Deep Learning', 'Neural Networks'],
      category: 'fullstack',
      illustration: 'neural',
    },
    {
      title: 'Employee Registration App',
      description:
        'Employee registration solution using ASP.NET Core and Azure with a CI/CD pipeline, demonstrating end-to-end delivery and cloud deployment practices.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
      illustration: 'cloudPipeline',
    },
    {
      title: 'Student Helper Website',
      description:
        'Built on the Wix platform with HTML, CSS, and JavaScript as a first business attempt—combining student support abroad with learning in project management, leadership, and entrepreneurship.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'Pacman Game',
      description:
        'Classic Pacman-style game developed entirely from scratch without a dedicated game engine or third-party game libraries, using WPF and strong object-oriented design.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
      illustration: 'arcadeGame',
    },
    {
      title: 'Tobacco Shop Application',
      description:
        'Multi-surface application spanning console, WPF desktop, ASP web, and ASP.NET Core API layers to practice layered architecture and software engineering principles across C# and Java.',
      technologies: ['C#', 'Java', 'WPF', 'ASP.NET', 'API'],
      category: 'fullstack',
      illustration: 'multiLayerApp',
    },
    {
      title: 'Yemeni Driver',
      description:
        'Web project built with ASP.NET Core, C#, HTML, CSS, and JavaScript to support a practical use case in the Yemeni Driver domain.',
      technologies: ['ASP.NET Core', 'C#', 'HTML', 'CSS', 'JavaScript'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'Connect SAPiers',
      description:
        'Event-style project focused on brainstorming and prototyping new ideas within the Connect SAPiers initiative.',
      technologies: ['Prototyping', 'Workshop', 'SAP community'],
      category: 'fullstack',
      illustration: 'prototypeIdeas',
    },
  ],
  ar: [
    {
      title: 'نماذج شبكات عصبية (أطروحة)',
      description:
        'عمل أطروحة بـ Python لتجارب وبناء نماذج تعلم آلي أبسط وأسهل تفسيراً مقارنةً بالصناديق السوداء التقليدية.',
      technologies: ['Python', 'Deep Learning', 'Neural Networks'],
      category: 'fullstack',
      illustration: 'neural',
    },
    {
      title: 'تطبيق تسجيل الموظفين',
      description:
        'حل لتسجيل الموظفين باستخدام ASP.NET Core و Azure مع خط CI/CD، يوضح التسليم الشامل وممارسات النشر السحابي.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
      illustration: 'cloudPipeline',
    },
    {
      title: 'موقع مساعد الطالب',
      description:
        'مبني على منصة Wix مع HTML و CSS و JavaScript كمحاولة أولى لإطلاق عمل—يدمج دعم الطلاب في الخارج مع تعلم إدارة المشاريع والقيادة وريادة الأعمال.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'لعبة باكمان',
      description:
        'لعبة على نمط باكمان طُورت بالكامل من الصفر دون محرك ألعاب جاهز أو مكتبات ألعاب خارجية، باستخدام WPF وتصميم كائني التوجه قوي.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
      illustration: 'arcadeGame',
    },
    {
      title: 'تطبيق متجر التبغ',
      description:
        'تطبيق متعدد الواجهات يشمل كونسول و WPF سطح مكتب وويب ASP وطبقة API بـ ASP.NET Core لممارسة الهندسة الطبقات ومبادئ هندسة البرمجيات عبر C# و Java.',
      technologies: ['C#', 'Java', 'WPF', 'ASP.NET', 'API'],
      category: 'fullstack',
      illustration: 'multiLayerApp',
    },
    {
      title: 'Yemeni Driver',
      description:
        'مشروع ويب باستخدام ASP.NET Core و C# و HTML و CSS و JavaScript لدعم حالة استخدام عملية في مجال السائق اليمني.',
      technologies: ['ASP.NET Core', 'C#', 'HTML', 'CSS', 'JavaScript'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'Connect SAPiers',
      description:
        'مشروع بأسلوب فعاليات يركز على العصف الذهني والنماذج الأولية لأفكار جديدة ضمن مبادرة Connect SAPiers.',
      technologies: ['Prototyping', 'Workshop', 'SAP community'],
      category: 'fullstack',
      illustration: 'prototypeIdeas',
    },
  ],
};
