const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm",
    },
    about: {
      label: 'About Me',
    },
    experience: {
      label: 'Experience',
      title: 'Professional Journey',
    },
    skills: {
      label: 'Skills',
      title: 'Technical Expertise',
      expert: 'Expert',
      solid: 'Solid',
      familiar: 'Familiar',
    },
    projects: {
      label: 'Projects',
      title: 'Featured Work',
      all: 'All',
      web: 'Web',
      desktop: 'Desktop',
      fullstack: 'Full-Stack',
      code: 'Code',
      liveDemo: 'Live Demo',
    },
    education: {
      label: 'Education',
      title: 'Academic Background',
      educationHeading: 'Education',
      certificationsHeading: 'Certifications',
    },
    contact: {
      label: 'Contact',
      title: 'Get In Touch',
      infoHeading: 'Contact Information',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      send: 'Send Message',
      sending: 'Sending',
      successMsg: "Message sent! I'll get back to you soon.",
      errorMsg: 'Something went wrong. Please try again or email me directly.',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    boot: {
      init: 'SYSTEM.init()',
      loading: 'Loading modules...',
      loadingOk: '[OK]',
      mounting: 'Mounting components...',
      mountingOk: '[OK]',
      rendering: 'Rendering portfolio...',
      welcome: 'Welcome, visitor.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      experience: 'الخبرة',
      skills: 'المهارات',
      projects: 'المشاريع',
      education: 'التعليم',
      contact: 'تواصل',
    },
    hero: {
      greeting: 'مرحباً، أنا',
    },
    about: {
      label: 'عني',
    },
    experience: {
      label: 'الخبرة',
      title: 'المسيرة المهنية',
    },
    skills: {
      label: 'المهارات',
      title: 'الخبرة التقنية',
      expert: 'خبير',
      solid: 'متمكن',
      familiar: 'مُلم',
    },
    projects: {
      label: 'المشاريع',
      title: 'أعمال مميزة',
      all: 'الكل',
      web: 'ويب',
      desktop: 'سطح المكتب',
      fullstack: 'فول ستاك',
      code: 'الكود',
      liveDemo: 'عرض مباشر',
    },
    education: {
      label: 'التعليم',
      title: 'الخلفية الأكاديمية',
      educationHeading: 'التعليم',
      certificationsHeading: 'الشهادات',
    },
    contact: {
      label: 'تواصل',
      title: 'تواصل معي',
      infoHeading: 'معلومات التواصل',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      messageLabel: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جارِ الإرسال',
      successMsg: 'تم إرسال الرسالة! سأتواصل معك قريباً.',
      errorMsg: 'حدث خطأ. يرجى المحاولة مرة أخرى أو مراسلتي مباشرة.',
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
    },
    boot: {
      init: 'SYSTEM.init()',
      loading: 'تحميل الوحدات...',
      loadingOk: '[تم]',
      mounting: 'تركيب المكونات...',
      mountingOk: '[تم]',
      rendering: 'عرض المحفظة...',
      welcome: 'مرحباً بك.',
    },
  },
} as const;

export type Translations = typeof translations.en;

export function t(lang: 'en' | 'ar') {
  return translations[lang];
}
