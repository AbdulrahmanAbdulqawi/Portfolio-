import type { AboutContent } from '../types';

export const aboutContent: Record<'en' | 'ar', AboutContent> = {
  en: {
    headline: 'About Me',
    paragraphs: [
      { text: 'Software developer with a focus on C#, .NET Core, and SQL.' },
      { text: 'I build and maintain robust applications and enjoy sharing knowledge through content.', link: { text: 'YouTube', url: 'https://youtube.com' } },
      { text: 'I also write about tech and development.', link: { text: 'Substack', url: 'https://substack.com' } },
    ],
  },
  ar: {
    headline: 'عني',
    paragraphs: [
      { text: 'مطور برمجيات متخصص في C# و .NET Core و SQL.' },
      { text: 'أبني وأحافظ على تطبيقات قوية وأشارك المعرفة عبر المحتوى.', link: { text: 'يوتيوب', url: 'https://youtube.com' } },
      { text: 'أكتب أيضاً عن التقنية والتطوير.', link: { text: 'ساب ستاك', url: 'https://substack.com' } },
    ],
  },
};
