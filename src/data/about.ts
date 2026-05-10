import type { AboutContent } from '../types';

export const aboutContent: Record<'en' | 'ar', AboutContent> = {
  en: {
    headline: 'About Me',
    paragraphs: [
      { text: 'Software Developer & Writer' },
      {
        text: 'Enthusiastic software developer with expertise in C#, .NET Core, and SQL, dedicated to building user-centered solutions that address real-world needs.',
      },
      {
        text: 'My journey as a Yemeni living in the Netherlands has shaped my approach, motivating me to create impactful tools that bridge cultural divides.',
      },
      {
        text: 'Beyond tech, I am a passionate writer, using storytelling to explore themes of culture, identity, and social issues. Through my writing, I aim to highlight the beauty and challenges of my background, offering insights on integration, political upheaval, and navigating diverse worlds. I believe that stories have the power to connect us, and I\'m driven to foster empathy and understanding by sharing narratives that resonate.',
      },
      {
        text: 'I thrive in collaborative environments and am excited to bring my technical skills, problem-solving abilities, and passion for storytelling to a team focused on making a difference.',
      },
    ],
  },
  ar: {
    headline: 'عني',
    paragraphs: [
      { text: 'مطوّر برمجيات وكاتب' },
      {
        text: 'مطوّر برمجيات شغوف بخبرة في C# و .NET Core و SQL، ملتزم ببناء حلول تركز على المستخدم وتلبّي احتياجات واقعية.',
      },
      {
        text: 'رحلتي كيمني أعيش في هولندا شكّلت أسلوب عملي، وتحفّزني لأبني أدوات مؤثّرة تسدّ فجوات ثقافية.',
      },
      {
        text: 'خارج التقنية، كاتب شغوف أستخدم السرد لاستكشاف ثقافة وهوية وقضايا اجتماعية. عبر كتابتي أسعى لإبراز جمال وتحديات خلفيتي، مع تقديم رؤى حول الاندماج والاضطراب السياسي والتنقّل بين عوالم متنوعة. أؤمن بأن للقصص قوة تواصلنا، وأسعى لتعزيز التعاطف والفهم عبر سرديات تلامس القارئ.',
      },
      {
        text: 'أزدهر في بيئات تعاونية ومتحمّس لأقدّم مهاراتي التقنية وقدرتي على حل المشكلات وشغفي بالسرد لفريق يركّز على صنع فرق حقيقي.',
      },
    ],
  },
};
