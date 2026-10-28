import type { ConsultationContent } from '../types';

/** Consultation offer shown on the Contact page. Each offer's `title` is also the topic sent with the request. */
export const consultation: Record<'en' | 'ar', ConsultationContent> = {
  en: {
    title: 'Book a consultation',
    intro: 'One focused call about your system, your code or your product idea. Pick what fits and tell me a little about it.',
    format: 'Online call · English, Arabic or Dutch',
    offers: [
      {
        title: 'Backend & architecture review',
        description: 'Your .NET API, database or system design, looked at together: what is slowing it down and what to change first.',
      },
      {
        title: 'Code & stack help',
        description: 'Stuck on a C#, .NET, SQL or Angular problem? We work through it on a call and leave with a clear next step.',
      },
      {
        title: 'Building a product',
        description: 'You have an idea or an early version. We plan the stack, the scope and what the first release should do.',
      },
    ],
  },
  ar: {
    title: 'احجز استشارة',
    intro: 'مكالمة مركّزة عن نظامك أو الكود أو فكرة منتجك. اختر ما يناسبك وأخبرني قليلاً عنه.',
    format: 'مكالمة أونلاين · بالعربية أو الإنجليزية أو الهولندية',
    offers: [
      {
        title: 'مراجعة الباكند والمعمارية',
        description: 'ننظر معاً في واجهة .NET أو قاعدة البيانات أو تصميم النظام: ما الذي يبطئه وما الذي يجب تغييره أولاً.',
      },
      {
        title: 'مساعدة في الكود والتقنيات',
        description: 'عالق في مشكلة C# أو .NET أو SQL أو Angular؟ نحلّها معاً في مكالمة وتخرج بخطوة واضحة.',
      },
      {
        title: 'بناء منتج',
        description: 'عندك فكرة أو نسخة أولى. نخطط للتقنيات والنطاق وما يجب أن يفعله الإصدار الأول.',
      },
    ],
  },
};
