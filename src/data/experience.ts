import type { Experience } from '../types';

export const experiences: Record<'en' | 'ar', Experience[]> = {
  en: [
    {
      title: 'Medior Software Developer',
      company: 'DevExperts',
      period: 'March, 2024 – Present',
      location: 'Netherlands',
      responsibilities: [
        'Developed microservice applications using .NET Core and Angular',
        'Built PDF generation service with .NET Core Web API',
        'Created data synchronization pipeline using .NET Core',
        'Led full-stack development of Product Information Management system',
      ],
      logo: '/devexperts.png',
    },
    {
      title: 'Associate Software Developer',
      company: 'SAP',
      period: 'Dec, 2021 – Apr, 2023',
      location: 'Hungary',
      responsibilities: [
        'Designed and developed core Gigya-SAP components',
        'Worked with C#, TPL, and micro-services using virtual actor model',
        'Created and implemented API endpoints',
        'Wrote comprehensive test suites using NUnit and XUnit',
      ],
      logo: '/sap.png',
    },
    {
      title: 'Co-founder',
      company: 'Student-helper.org',
      period: 'Dec, 2020 – Jun, 2022',
      location: 'Remote',
      responsibilities: [
        'Led development of student assistance platform',
        'Provided C# training and certification courses',
        'Managed database and SQL course programs',
        'Coordinated international student opportunities',
      ],
      logo: undefined,
    },
  ],
  ar: [
    {
      title: 'مطور برمجيات متوسط',
      company: 'DevExperts',
      period: 'مارس 2024 – الحاضر',
      location: 'هولندا',
      responsibilities: [
        'تطوير تطبيقات ميكروسيرفس باستخدام .NET Core و Angular',
        'بناء خدمة توليد PDF بواجهة .NET Core Web API',
        'إنشاء خط أنابيب مزامنة البيانات باستخدام .NET Core',
        'قيادة التطوير full-stack لنظام إدارة معلومات المنتج',
      ],
      logo: '/devexperts.png',
    },
    {
      title: 'مطور برمجيات مشارك',
      company: 'SAP',
      period: 'ديسمبر 2021 – أبريل 2023',
      location: 'المجر',
      responsibilities: [
        'تصميم وتطوير مكونات Gigya-SAP الأساسية',
        'العمل مع C# و TPL والمايكروسيرفس باستخدام نموذج الممثل الافتراضي',
        'إنشاء وتنفيذ نقاط نهاية API',
        'كتابة مجموعات اختبارات شاملة باستخدام NUnit و XUnit',
      ],
      logo: '/sap.png',
    },
    {
      title: 'الشريك المؤسس',
      company: 'Student-helper.org',
      period: 'ديسمبر 2020 – يونيو 2022',
      location: 'عن بُعد',
      responsibilities: [
        'قيادة تطوير منصة مساعدة الطلاب',
        'تقديم تدريب C# ودورات الشهادات',
        'إدارة برامج دورات قواعد البيانات و SQL',
        'تنسيق فرص الطلاب الدولية',
      ],
      logo: undefined,
    },
  ],
};
