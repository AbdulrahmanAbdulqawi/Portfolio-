import type { AboutContent } from '../types';

export const aboutContent: Record<'en' | 'ar', AboutContent> = {
  en: {
    headline: 'Passionate Software Developer & Content Creator',
    paragraphs: [
      {
        text: `I am an enthusiastic and results-driven Software Developer with a strong background in C#, .NET Core, and SQL. My journey in software development has been marked by a commitment to designing and implementing innovative solutions that make a real difference.`,
      },
      {
        text: `Currently based in Amersfoort, Netherlands, I bring a global perspective to my work, having studied and worked across different countries. This international experience has enhanced my ability to collaborate in diverse teams and adapt to various working environments.`,
      },
      {
        text: `Beyond coding, I'm a passionate content creator. I host 'Beyond Concepts' with my friend Rasheed, where we try to delve into the complexities of life, culture, and personal growth. Through meaningful conversations, we explore topics that challenge perspectives, inspire self-discovery, and foster understanding.`,
        link: { text: 'YouTube', url: 'https://www.youtube.com/@BeyondConcepts' },
      },
      {
        text: `I'm also a hobby writer, using storytelling to explore themes of culture, identity, and social issues.`,
        link: { text: 'Substack newsletter', url: 'https://substack.com/@abdulrahmanabdulqawi' },
      },
    ],
  },
  ar: {
    headline: 'مطور برمجيات وصانع محتوى شغوف',
    paragraphs: [
      {
        text: `أنا مطور برمجيات متحمس ومدفوع بالنتائج مع خلفية قوية في C# و .NET Core و SQL. تميزت مسيرتي في تطوير البرمجيات بالتزامي بتصميم وتنفيذ حلول مبتكرة تحدث فرقاً حقيقياً.`,
      },
      {
        text: `أعيش حالياً في أمرسفورت، هولندا، وأحمل منظوراً عالمياً في عملي، بعد أن درست وعملت في بلدان مختلفة. عززت هذه التجربة الدولية قدرتي على التعاون في فرق متنوعة والتكيف مع بيئات العمل المختلفة.`,
      },
      {
        text: `بعيداً عن البرمجة، أنا صانع محتوى شغوف. أقدم برنامج 'Beyond Concepts' مع صديقي رشيد، حيث نتعمق في تعقيدات الحياة والثقافة والنمو الشخصي. من خلال حوارات هادفة، نستكشف مواضيع تتحدى وجهات النظر وتلهم اكتشاف الذات وتعزز التفاهم.`,
        link: { text: 'يوتيوب', url: 'https://www.youtube.com/@BeyondConcepts' },
      },
      {
        text: `أنا أيضاً كاتب هاوٍ، أستخدم سرد القصص لاستكشاف مواضيع الثقافة والهوية والقضايا الاجتماعية.`,
        link: { text: 'نشرة Substack', url: 'https://substack.com/@abdulrahmanabdulqawi' },
      },
    ],
  },
};
