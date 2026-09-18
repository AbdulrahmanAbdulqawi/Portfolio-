import type { AboutContent } from '../types';

export const aboutContent: Record<'en' | 'ar', AboutContent> = {
  en: {
    headline: 'I build software, and I write.',
    paragraphs: [
      "I work in C#, .NET Core and SQL, mostly on the backend. I grew up in Ibb and studied in Budapest. I live in Amersfoort now, and I've been at DevExperts since 2024.",
      "A lot of what I end up building is about closing a gap between people who can't easily reach each other. A forum for the Yemeni community here. A hub for refugees. An ERP that handles Arabic properly instead of bolting it on at the end.",
      "In 2026 I registered AaMa Development with the Dutch Chamber of Commerce and started building products under it. The first one is Nabdah. It began because I got tired of sending the same link by hand to everyone who asked for it in my Instagram comments.",
      "Outside work I write about culture, identity and displacement. It's the same habit as the code: take something complicated and make it make sense to someone who wasn't there.",
      'I like teams where you can argue about architecture and nobody treats tests as optional.',
    ],
  },
  ar: {
    headline: 'أبني برمجيات، وأكتب.',
    paragraphs: [
      'أعمل بـ C# و .NET Core و SQL، في الأنظمة الخلفية غالباً. نشأت في إب ودرست في بودابست. أعيش الآن في أمرسفورت، وأعمل في DevExperts منذ ٢٠٢٤.',
      'كثير مما أبنيه ينتهي به الأمر إلى سدّ فجوة بين أناس لا يصلون إلى بعضهم بسهولة. منتدى للجالية اليمنية هنا. منصة للاجئين. نظام ERP يتعامل مع العربية كما ينبغي بدل إضافتها في آخر الطريق.',
      'في ٢٠٢٦ سجّلت AaMa Development في غرفة التجارة الهولندية وبدأت أبني منتجات تحتها. أولها نبضة، وقد بدأت لأنني سئمت إرسال الرابط نفسه يدوياً لكل من يطلبه في تعليقات إنستغرام.',
      'خارج العمل أكتب عن الثقافة والهوية والنزوح. هي العادة نفسها التي في الكود: أن تأخذ شيئاً معقّداً وتجعله مفهوماً لمن لم يكن هناك.',
      'أفضّل الفرق التي يمكنك أن تتجادل فيها حول المعمارية ولا يعامل فيها أحد الاختبارات على أنها اختيارية.',
    ],
  },
};
