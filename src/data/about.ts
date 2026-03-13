import type { AboutContent } from '../types';

export const aboutContent: Record<'en' | 'ar', AboutContent> = {
  en: {
    headline: 'About Me',
    paragraphs: [
      { text: 'Passionate Software Developer & Content Creator' },
      { text: 'I am an enthusiastic and results-driven Software Developer with a strong background in C#, .NET Core, and SQL. My journey in software development has been marked by a commitment to designing and implementing innovative solutions that make a real difference.' },
      { text: 'Currently based in Amersfoort, Netherlands, I bring a global perspective to my work, having studied and worked across different countries. This international experience has enhanced my ability to collaborate in diverse teams and adapt to various working environments.' },
      { text: "Beyond coding, I'm a passionate content creator. I host 'Beyond Concepts' with my friend Rasheed, where we delve into the complexities of life, culture, and personal growth. Through meaningful conversations, we explore topics that challenge perspectives, inspire self-discovery, and foster understanding.", link: { text: 'YouTube', url: 'https://youtube.com' } },
      { text: "I'm also a hobby writer, using storytelling to explore themes of culture, identity, and social issues.", link: { text: 'Substack newsletter', url: 'https://substack.com' } },
    ],
  },
  ar: {
    headline: 'عني',
    paragraphs: [
      { text: 'مطور برمجيات ومبدع محتوى شغوف' },
      { text: 'أنا مطور برمجيات متحمس وموجه نحو النتائج بخلفية قوية في C# و .NET Core و SQL. تميزت رحلتي في تطوير البرمجيات بالالتزام بتصميم وتنفيذ حلول مبتكرة تحدث فرقاً حقيقياً.' },
      { text: 'مقيم حالياً في أمرسفورت، هولندا، أقدم منظوراً عالمياً لعملي بعد الدراسة والعمل في دول مختلفة. هذه التجربة الدولية عززت قدرتي على التعاون في فرق متنوعة والتكيف مع بيئات عمل متعددة.' },
      { text: "بعيداً عن البرمجة، أنا مبدع محتوى شغوف. أقدم 'Beyond Concepts' مع صديقي راشد، حيث نخوض في تعقيدات الحياة والثقافة والنمو الشخصي. من خلال حوارات هادفة نستكشف مواضيع تتحدى التصورات وتلهم اكتشاف الذات وتعزز التفاهم.", link: { text: 'يوتيوب', url: 'https://youtube.com' } },
      { text: 'أنا أيضاً كاتب هاوٍ، أستخدم السرد لاستكشاف مواضيع الثقافة والهوية والقضايا الاجتماعية.', link: { text: 'نشرة ساب ستاك', url: 'https://substack.com' } },
    ],
  },
};
