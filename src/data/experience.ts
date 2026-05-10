import type { Experience } from '../types';

export const experiences: Record<'en' | 'ar', Experience[]> = {
  en: [
    {
      title: 'Medior Software Developer',
      company: 'DevExperts',
      period: 'March 2024 – Present',
      location: 'Netherlands',
      responsibilities: [
        'Develop microservice applications with .NET Core and Angular to improve modularity.',
        'Build a PDF generation service with .NET Core Web API to automate CRM document processing.',
        'Create a data synchronization pipeline with .NET Core for JSON-to-PostgreSQL migration.',
        'Lead full-stack development (Angular, .NET Core) of a Product Information Management system across frontend architecture and backend services.',
      ],
      logo: '/devexperts.png',
    },
    {
      title: 'Co-founder',
      company: 'Student-helper.org',
      period: 'Dec 2021 – Apr 2023',
      location: 'Remote',
      responsibilities: [
        'Founded student-helper.org to help students find opportunities abroad and complete applications.',
        'Delivered the platform with Wix, HTML, CSS, and JavaScript while learning project management and entrepreneurship.',
        'Combined online guidance with practical support for international study paths.',
      ],
      logo: undefined,
    },
    {
      title: 'Associate Software Developer',
      company: 'SAP',
      period: 'Dec 2020 – Jun 2022',
      location: 'Hungary',
      responsibilities: [
        "Design and develop core Gigya-SAP components on SAP's global cloud platform.",
        'Build microservices in modern C# with TPL and the virtual-actor model on Microsoft Orleans.',
        'Create and implement API endpoints; write unit, functional, and integration tests with NUnit and xUnit.',
        'Design MySQL databases, tables, and migrations; collaborate with TargetProcess and GitLab.',
      ],
      logo: '/sap.png',
    },
  ],
  ar: [
    {
      title: 'مطوّر برمجيات متوسط',
      company: 'DevExperts',
      period: 'مارس 2024 – الحاضر',
      location: 'هولندا',
      responsibilities: [
        'تطوير تطبيقات ميكروسيرفس باستخدام .NET Core و Angular لتحسين التقسيم المعياري.',
        'بناء خدمة توليد PDF بواجهة .NET Core Web API لأتمتة مستندات CRM.',
        'إنشاء خط مزامنة بيانات باستخدام .NET Core لترحيل JSON إلى PostgreSQL.',
        'قيادة تطوير full-stack (Angular، .NET Core) لنظام إدارة معلومات المنتج على الواجهة والخدمات الخلفية.',
      ],
      logo: '/devexperts.png',
    },
    {
      title: 'شريك مؤسّس',
      company: 'Student-helper.org',
      period: 'ديسمبر 2021 – أبريل 2023',
      location: 'عن بُعد',
      responsibilities: [
        'تأسيس student-helper.org لمساعدة الطلاب على إيجاد فرص في الخارج وإكمال طلباتهم.',
        'تسليم المنصة عبر Wix و HTML و CSS و JavaScript مع تعلّم إدارة المشاريع وريادة الأعمال.',
        'دمج الإرشاد عبر الإنترنت مع دعم عملي لمسارات الدراسة الدولية.',
      ],
      logo: undefined,
    },
    {
      title: 'مطوّر برمجيات مشارك',
      company: 'SAP',
      period: 'ديسمبر 2020 – يونيو 2022',
      location: 'المجر',
      responsibilities: [
        'تصميم وتطوير مكوّنات Gigya-SAP الأساسية على منصة SAP السحابية العالمية.',
        'بناء ميكروسيرفس بـ C# الحديثة مع TPL ونموذج الممثل الافتراضي على Microsoft Orleans.',
        'إنشاء وتنفيذ واجهات API؛ كتابة اختبارات الوحدة والوظيفية والتكامل بـ NUnit و xUnit.',
        'تصميم قواعد بيانات MySQL والجداول والترحيلات؛ التعاون عبر TargetProcess و GitLab.',
      ],
      logo: '/sap.png',
    },
  ],
};
