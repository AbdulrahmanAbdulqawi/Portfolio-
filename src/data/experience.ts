import type { Experience } from '../types';

export const experiences: Record<'en' | 'ar', Experience[]> = {
  en: [
    {
      title: 'Medior Software Developer',
      company: 'DevExperts',
      logo: '/devexperts.png',
      location: 'Netherlands',
      period: 'March, 2024 - Present',
      responsibilities: [
        'Developed microservice applications using .NET Core and Angular',
        'Built PDF generation service with .NET Core Web API',
        'Created data synchronization pipeline using .NET Core',
        'Led full-stack development of Product Information Management system',
      ],
    },
    {
      title: 'Associate Software Developer',
      company: 'SAP',
      logo: '/sap.png',
      location: 'Hungary',
      period: 'Dec, 2021 - Apr, 2023',
      responsibilities: [
        'Designed and developed core Gigya-SAP components',
        'Worked with C#, TPL and micro-services using virtual actor model',
        'Created and implemented API endpoints',
        'Wrote comprehensive test suites using NUnit and XUnit',
      ],
    },
    {
      title: 'Co-founder',
      company: 'Student-helper.org',
      location: 'Remote',
      period: 'Dec, 2020 - Jun, 2022',
      responsibilities: [
        'Led development of student assistance platform',
        'Provided C# training and certification courses',
        'Managed database and SQL course programs',
        'Coordinated international student opportunities',
      ],
    },
  ],
  ar: [
    {
      title: 'مطور برمجيات متوسط',
      company: 'DevExperts',
      logo: '/devexperts.png',
      location: 'هولندا',
      period: 'مارس ٢٠٢٤ - الحاضر',
      responsibilities: [
        'تطوير تطبيقات الخدمات المصغرة باستخدام .NET Core و Angular',
        'بناء خدمة إنشاء ملفات PDF باستخدام .NET Core Web API',
        'إنشاء خط أنابيب مزامنة البيانات باستخدام .NET Core',
        'قيادة تطوير نظام إدارة معلومات المنتجات بالكامل',
      ],
    },
    {
      title: 'مطور برمجيات مبتدئ',
      company: 'SAP',
      logo: '/sap.png',
      location: 'المجر',
      period: 'ديسمبر ٢٠٢١ - أبريل ٢٠٢٣',
      responsibilities: [
        'تصميم وتطوير مكونات Gigya-SAP الأساسية',
        'العمل مع C# و TPL والخدمات المصغرة باستخدام نموذج الممثل الافتراضي',
        'إنشاء وتنفيذ نقاط نهاية API',
        'كتابة مجموعات اختبار شاملة باستخدام NUnit و XUnit',
      ],
    },
    {
      title: 'مؤسس مشارك',
      company: 'Student-helper.org',
      location: 'عن بُعد',
      period: 'ديسمبر ٢٠٢٠ - يونيو ٢٠٢٢',
      responsibilities: [
        'قيادة تطوير منصة مساعدة الطلاب',
        'تقديم دورات تدريب وشهادات C#',
        'إدارة برامج دورات قواعد البيانات و SQL',
        'تنسيق الفرص الدولية للطلاب',
      ],
    },
  ],
};
