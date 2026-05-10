import type { SiteConfig } from '../types';

export const siteConfig: Record<'en' | 'ar', SiteConfig> = {
  en: {
    name: 'Abdulrahman Abdulqawi',
    initials: 'AA',
    title: 'Abdulrahman Abdulqawi | Software Developer',
    tagline: 'Software developer specializing in C#, .NET Core, SQL, and Angular. Building microservices, APIs, and full-stack solutions.',
    description: 'Portfolio of Abdulrahman Abdulqawi — Software developer with experience across SAP cloud platforms, .NET microservices, and student-focused products.',
    homeIntro: 'I am a software developer based in Amersfoort, Netherlands. I build .NET Core and Angular applications, microservices, and integrations—from CRM automation to cloud data pipelines. Explore the sections below for experience, skills, and selected projects.',
    email: 'abdulrahmanabdulqawi76@gmail.com',
    phone: '+31687269021',
    location: 'Netherlands, Amersfoort',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/AbdulrahmanAbdulqawi', icon: 'Github' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/abdulrahman-abdulqawi', icon: 'Linkedin' },
      { platform: 'email', url: 'mailto:abdulrahmanabdulqawi76@gmail.com', icon: 'Mail' },
      { platform: 'phone', url: 'tel:+31687269021', icon: 'Phone' },
    ],
    navItems: ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'],
  },
  ar: {
    name: 'عبدالرحمن عبدالقوي',
    initials: 'ع ع',
    title: 'عبدالرحمن عبدالقوي | مطور برمجيات',
    tagline: 'مطور برمجيات متخصص في C# و .NET Core و SQL و Angular. أبني ميكروسيرفس وواجهات برمجة وحلولاً شاملة.',
    description: 'معرض أعمال عبدالرحمن عبدالقوي — مطور برمجيات بخبرة في منصات SAP السحابية وميكروسيرفس .NET ومنتجات موجهة للطلاب.',
    homeIntro: 'مطور برمجيات مقيم في أمرسفورت بهولندا. أبني تطبيقات .NET Core و Angular وميكروسيرفس وتكاملاً—من أتمتة CRM إلى خطوط بيانات سحابية. استكشف الأقسام أدناه للخبرة والمهارات والمشاريع.',
    email: 'abdulrahmanabdulqawi76@gmail.com',
    phone: '+31687269021',
    location: 'هولندا، أمرسفورت',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/AbdulrahmanAbdulqawi', icon: 'Github' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/abdulrahman-abdulqawi', icon: 'Linkedin' },
      { platform: 'email', url: 'mailto:abdulrahmanabdulqawi76@gmail.com', icon: 'Mail' },
      { platform: 'phone', url: 'tel:+31687269021', icon: 'Phone' },
    ],
    navItems: ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'],
  },
};
