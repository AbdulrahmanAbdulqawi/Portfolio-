import type { Experience } from '../types';

export const experiences: Record<'en' | 'ar', Experience[]> = {
  en: [
    {
      title: 'Software Developer',
      company: 'DevExperts',
      period: '2022 – Present',
      location: 'Netherlands, Amersfoort',
      responsibilities: [
        'Design and develop scalable .NET Core applications and REST APIs for client projects.',
        'Implement and optimize SQL Server databases, stored procedures, and Entity Framework Core models.',
        'Collaborate with cross-functional teams (product, QA, design) in an Agile environment.',
        'Participate in code reviews, refactoring, and maintaining high code quality standards.',
        'Integrate Azure services for deployment, monitoring, and cloud-based solutions.',
      ],
      logo: '/devexperts.png',
    },
    {
      title: 'Software Developer',
      company: 'SAP',
      period: '2020 – 2022',
      location: 'Remote',
      responsibilities: [
        'Developed and maintained enterprise-grade solutions using C#, .NET, and SQL Server.',
        'Contributed to internal tools and automation that improved team productivity.',
        'Worked with legacy and modern codebases, following best practices and documentation.',
        'Supported bug fixes, performance tuning, and deployment pipelines.',
      ],
      logo: '/sap.png',
    },
    {
      title: 'Junior Developer',
      company: 'Tech Solutions',
      period: '2019 – 2020',
      location: 'Netherlands',
      responsibilities: [
        'Built and maintained web applications using ASP.NET MVC and SQL Server.',
        'Wrote unit tests and assisted with integration and deployment processes.',
        'Learned and applied Agile methodologies and version control with Git.',
      ],
      logo: undefined,
    },
  ],
  ar: [
    {
      title: 'مطور برمجيات',
      company: 'DevExperts',
      period: '2022 – الحاضر',
      location: 'هولندا، أمرسفورت',
      responsibilities: [
        'تصميم وتطوير تطبيقات .NET Core وواجهات REST قابلة للتوسع لمشاريع العملاء.',
        'تنفيذ وتحسين قواعد بيانات SQL Server والإجراءات المخزنة ونماذج Entity Framework Core.',
        'التعاون مع فرق متعددة الوظائف (المنتج، ضمان الجودة، التصميم) في بيئة Agile.',
        'المشاركة في مراجعة الكود وإعادة الهيكلة والحفاظ على معايير جودة عالية.',
        'دمج خدمات Azure للنشر والمراقبة والحلول السحابية.',
      ],
      logo: '/devexperts.png',
    },
    {
      title: 'مطور برمجيات',
      company: 'SAP',
      period: '2020 – 2022',
      location: 'عن بُعد',
      responsibilities: [
        'تطوير وصيانة حلول على مستوى المؤسسات باستخدام C# و .NET و SQL Server.',
        'المساهمة في الأدوات الداخلية والأتمتة لتحسين إنتاجية الفريق.',
        'العمل على أكواد قديمة وحديثة مع اتباع أفضل الممارسات والتوثيق.',
        'دعم إصلاح الأخطاء وتحسين الأداء وأنابيب النشر.',
      ],
      logo: '/sap.png',
    },
    {
      title: 'مطور مبتدئ',
      company: 'Tech Solutions',
      period: '2019 – 2020',
      location: 'هولندا',
      responsibilities: [
        'بناء وصيانة تطبيقات ويب باستخدام ASP.NET MVC و SQL Server.',
        'كتابة اختبارات الوحدات والمساعدة في عمليات التكامل والنشر.',
        'تعلم وتطبيق منهجيات Agile والتحكم بالإصدارات باستخدام Git.',
      ],
      logo: undefined,
    },
  ],
};
