const translations = {
  en: {
    nav: {
      work: '01 Work',
      experience: '02 Experience',
      stack: '03 Stack',
      about: '04 About',
      contact: '05 Contact',
    },
    hero: {
      ctaWork: 'See the work',
      ctaContact: 'Get in touch',
    },
    console: {
      hint: 'press ~ anywhere to open the console',
    },
    work: {
      title: 'Work',
      meta: '3 headline cases · 13 more in the index',
      alsoBuilt: 'Also built — 13 more',
      repository: 'Repository',
    },
    experience: {
      title: 'Experience',
      meta: '2020 — now',
      showFull: 'Show the full recommendation +',
      showLess: 'Show less −',
    },
    stack: {
      title: 'Stack',
      meta: 'Daily = I ship with it every week',
      daily: 'DAILY',
      solid: 'SOLID',
      familiar: 'FAMILIAR',
    },
    about: {
      title: 'About',
      educationLabel: 'Education',
      certificatesLabel: 'Scholarships & certificates — 15',
    },
    contact: {
      title: 'Contact',
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      messageLabel: 'Message',
      resumeLabel: 'Résumé',
      downloadPdf: 'Download PDF →',
      send: 'Send message',
      sending: 'Sending…',
      successMsg: "Message sent! I'll get back to you soon.",
      errorMsg: 'Something went wrong. Please try again or email me directly.',
    },
    aria: {
      langToAr: 'Switch to Arabic',
      langToEn: 'Switch to English',
      themeToLight: 'Switch to light mode',
      themeToNight: 'Switch to night mode',
      openConsole: 'Open console',
      closeConsole: 'Close console',
      resumePdf: 'Download résumé as PDF',
    },
  },
  ar: {
    nav: {
      work: '٠١ الأعمال',
      experience: '٠٢ الخبرة',
      stack: '٠٣ التقنيات',
      about: '٠٤ عني',
      contact: '٠٥ تواصل',
    },
    hero: {
      ctaWork: 'شاهد الأعمال',
      ctaContact: 'تواصل معي',
    },
    console: {
      hint: 'اضغط ~ في أي مكان لفتح الكونسول',
    },
    work: {
      title: 'الأعمال',
      meta: '٣ مشاريع رئيسية · و١٣ في الفهرس',
      alsoBuilt: 'مشاريع أخرى — ١٣',
      repository: 'Repository',
    },
    experience: {
      title: 'الخبرة',
      meta: '٢٠٢٠ — الآن',
      showFull: 'عرض التوصية كاملة +',
      showLess: 'عرض أقل −',
    },
    stack: {
      title: 'التقنيات',
      meta: 'يومي = أعمل به كل أسبوع',
      daily: 'يومي',
      solid: 'متمكّن',
      familiar: 'مُلمّ',
    },
    about: {
      title: 'عني',
      educationLabel: 'التعليم',
      certificatesLabel: 'المنح والشهادات — ١٥',
    },
    contact: {
      title: 'تواصل',
      nameLabel: 'الاسم',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      locationLabel: 'الموقع',
      messageLabel: 'الرسالة',
      resumeLabel: 'السيرة الذاتية',
      downloadPdf: 'تحميل PDF ←',
      send: 'إرسال الرسالة',
      sending: 'جارِ الإرسال…',
      successMsg: 'تم إرسال الرسالة! سأتواصل معك قريباً.',
      errorMsg: 'حدث خطأ. يرجى المحاولة مرة أخرى أو مراسلتي مباشرة.',
    },
    aria: {
      langToAr: 'التبديل إلى العربية',
      langToEn: 'التبديل إلى الإنجليزية',
      themeToLight: 'التبديل إلى الوضع الفاتح',
      themeToNight: 'التبديل إلى وضع الليل',
      openConsole: 'فتح الكونسول',
      closeConsole: 'إغلاق الكونسول',
      resumePdf: 'تحميل السيرة الذاتية بصيغة PDF',
    },
  },
} as const;

export function t(lang: 'en' | 'ar') {
  return translations[lang];
}
