import type { AboutContent } from '../types';

export const aboutContent: Record<'en' | 'ar', AboutContent> = {
  en: {
    headline: 'A developer who writes — and a writer who ships.',
    paragraphs: [
      "I build user-centred systems in C#, .NET Core and SQL. My route here ran from Ibb to Budapest to Amersfoort, and that route is why I keep building tools that close gaps between people — a community forum, a refugee hub, an ERP that speaks Arabic properly.",
      'Outside code I write about culture, identity and displacement. Storytelling is the other half of the same instinct: make something complicated legible to someone who wasn\'t there.',
      'I work best on teams where the architecture conversation is welcome and the tests are not optional.',
    ],
  },
  ar: {
    headline: 'مطوّر يكتب — وكاتب يُطلق منتجات.',
    paragraphs: [
      'أبني أنظمة تركّز على المستخدم بـ C# و .NET Core و SQL. طريقي إلى هنا مرّ من إب إلى بودابست إلى أمرسفورت، وهذا الطريق هو سبب استمراري في بناء أدوات تسدّ الفجوات بين الناس — منتدى للجالية، منصة للاجئين، ونظام ERP يتحدث العربية كما ينبغي.',
      'خارج الكود أكتب عن الثقافة والهوية والنزوح. السرد هو النصف الآخر من الغريزة نفسها: أن تجعل شيئاً معقّداً مفهوماً لمن لم يكن هناك.',
      'أعمل في أفضل حالاتي ضمن فرق يكون فيها نقاش المعمارية مرحّباً به والاختبارات ليست اختيارية.',
    ],
  },
};
