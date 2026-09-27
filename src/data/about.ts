import type { AboutContent } from '../types';

export const aboutContent: Record<'en' | 'ar', AboutContent> = {
  en: {
    headline: 'I build software, and I write.',
    paragraphs: [
      "Most of my work is on the backend, in C#, .NET Core and SQL. I grew up in Ibb, studied in Budapest and now live in Amersfoort, where I've been at DevExperts since 2024.",
      "A lot of what I build ends up connecting people who can't easily reach each other, like a forum for the Yemeni community here and a hub for refugees. I also built an ERP with Arabic support designed in from the start.",
      "In 2026 I registered AaMa Development with the Dutch Chamber of Commerce and started building products under it. The first one is Nabdah. It began because I got tired of sending the same link by hand to everyone who asked for it in my Instagram comments.",
      "Outside work I write about culture, identity and displacement. I approach it much like code, trying to make something complicated clear to someone who wasn't there.",
      'I like teams where you can argue about architecture and nobody treats tests as optional.',
    ],
  },
  ar: {
    headline: 'أبني برمجيات، وأكتب.',
    paragraphs: [
      'معظم عملي في الأنظمة الخلفية بـ C# و .NET Core و SQL. نشأت في إب ودرست في بودابست، وأعيش الآن في أمرسفورت حيث أعمل في DevExperts منذ ٢٠٢٤.',
      'كثير مما أبنيه ينتهي به الأمر إلى الوصل بين أناس لا يصلون إلى بعضهم بسهولة، مثل منتدى للجالية اليمنية هنا ومنصة للاجئين. وبنيت أيضاً نظام ERP صُمّم لدعم العربية من البداية.',
      'في ٢٠٢٦ سجّلت AaMa Development في غرفة التجارة الهولندية وبدأت أبني منتجات تحتها. أولها نبضة، وقد بدأت لأنني سئمت إرسال الرابط نفسه يدوياً لكل من يطلبه في تعليقات إنستغرام.',
      'خارج العمل أكتب عن الثقافة والهوية والنزوح. أتعامل مع الكتابة كما أتعامل مع الكود تقريباً، فأحاول أن أجعل الشيء المعقّد مفهوماً لمن لم يكن هناك.',
      'أفضّل الفرق التي يمكنك أن تتجادل فيها حول المعمارية ولا يعامل فيها أحد الاختبارات على أنها اختيارية.',
    ],
  },
};
