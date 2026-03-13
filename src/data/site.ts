import type { SiteConfig } from '../types';

export const siteConfig: Record<'en' | 'ar', SiteConfig> = {
  en: {
    name: 'Abdulrahman Abdulqawi',
    initials: 'AA',
    title: 'Abdulrahman Abdulqawi | Software Developer',
    tagline: 'Software Developer specializing in C#, .NET Core, and SQL. Building innovative solutions with modern technologies.',
    description: 'Portfolio of Abdulrahman Abdulqawi — Software Developer specializing in C#, .NET Core, SQL, and cloud technologies.',
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
    tagline: 'مطور برمجيات متخصص في C# و .NET Core و SQL. أبني حلولاً مبتكرة باستخدام أحدث التقنيات.',
    description: 'معرض أعمال عبدالرحمن عبدالقوي — مطور برمجيات متخصص في C# و .NET Core و SQL والتقنيات السحابية.',
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
