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
    resumeUrl: '/resume.pdf',
    availabilityLine: 'Open to: backend / full-stack (.NET, SQL, Angular) · Netherlands · EU-remote friendly.',
    writingLinks: [],
    testimonials: [
      {
        quote:
          "I had the pleasure of leading Abdul for a year at SAP Labs Hungary, where he worked as a software developer associate. Abdul is an exceptional computing professional with strong analytical skills. He consistently demonstrated his ability to handle complex coding projects, meet tight deadlines, and collaborate effectively with cross-functional teams. As a successful team player, he always respected his colleagues' opinions and contributed positively to team discussions and decisions. He also possesses excellent problem-solving skills and is always eager to learn and grow his skills. His proactive approach and time management helped ensure that we stayed on track and delivered our features on time. In addition to his technical abilities, I want to highlight his polite and positive personality, which earned him recognition and the pleasure of working with us as part of our team. I highly recommend Abdul to any organisation seeking a talented and dedicated software developer.",
        author: 'Janos Zrak',
        role: 'Platform Engineering Manager at SAP · SAP Labs Hungary (managed directly, 1 year) · LinkedIn recommendation, Apr 2023',
      },
    ],
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
    resumeUrl: '/resume.pdf',
    availabilityLine: 'متاح لـ: باكند / فول ستاك (.NET و SQL و Angular) · هولندا · عمل عن بُعد ضمن الاتحاد الأوروبي.',
    writingLinks: [],
    testimonials: [
      {
        quote:
          'تشرفت بقيادة عبدالرحمن لمدة عام في SAP Labs Hungary حيث عمل كمطوّر برمجيات مرتبط. عبدالرحمن محترف استثنائي في الحوسبة بمهارات تحليلية قوية، وأظهر باستمرار قدرته على التعامل مع مشاريع برمجية معقدة واستيفاء مواعيد نهائية ضيقة والتعاون الفعّال مع فرق متعددة التخصصات. كلاعب فريق ناجح احترم آراء زملائه وساهم إيجابياً في النقاشات والقرارات. يمتلك أيضاً مهارات ممتازة في حل المشكلات وحرصاً دائماً على التعلم وتطوير مهاراته؛ ساعدت نزعته الاستباقية وإدارته للوقت على البقاء في المسار وتسليم الميزات في الوقت المحدد. إلى جانب قدراته التقنية أبرز شخصيته المهذبة والإيجابية التي نالت تقدير الفريق. أنصح بشدة بعبدالرحمن لأي منظمة تبحث عن مطوّر موهوب وملتزم.',
        author: 'Janos Zrak',
        role: 'مدير هندسة المنصات في SAP · SAP Labs Hungary (إشراف مباشر، عام واحد) · توصية LinkedIn، أبريل 2023',
      },
    ],
  },
};
