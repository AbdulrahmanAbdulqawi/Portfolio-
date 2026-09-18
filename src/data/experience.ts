import type { Experience, Recommendation } from '../types';

export const experiences: Record<'en' | 'ar', Experience[]> = {
  en: [
    {
      period: '2026 — now',
      title: 'Founder',
      company: 'AaMa Development',
      paragraph:
        'I registered AaMa Development with the Dutch Chamber of Commerce and build products under it. The first one is Nabdah. I do the product decisions, the code and the support myself, and I share the build publicly as it happens.',
      chips: ['ANGULAR', 'META GRAPH API', 'SAAS'],
    },
    {
      period: '2024 — now',
      title: 'Medior Software Developer',
      company: 'DevExperts',
      paragraph:
        'I lead full-stack work on a Product Information Management platform, across both the frontend architecture and the backend services. I built a .NET Core service that generates PDFs and took manual CRM document handling out of the loop, plus a synchronisation pipeline that moves JSON into PostgreSQL.',
      chips: ['.NET CORE', 'ANGULAR', 'MICROSERVICES', 'POSTGRESQL'],
      logo: '/devexperts.png',
    },
    {
      period: '2021 — 2023',
      title: 'Co-founder',
      company: 'Student-helper.org',
      paragraph:
        'I started student-helper.org to help students find opportunities abroad and get through the applications. I shipped the platform and ran the business side, which is where I actually learned project management.',
    },
    {
      period: '2020 — 2022',
      title: 'Associate Software Developer',
      company: 'SAP',
      paragraph:
        "I worked on core Gigya-SAP components on SAP's global cloud platform. I wrote C# microservices on Microsoft Orleans using TPL and the virtual-actor model, shipped API endpoints covered by NUnit and xUnit, and designed the MySQL schemas behind them.",
      chips: ['C#', 'MS ORLEANS', 'MYSQL', 'NUNIT / XUNIT'],
      logo: '/sap.png',
    },
  ],
  ar: [
    {
      period: '٢٠٢٦ — الآن',
      title: 'مؤسّس',
      company: 'AaMa Development',
      paragraph:
        'سجّلت AaMa Development في غرفة التجارة الهولندية وأبني منتجات تحتها. أولها نبضة. أتولّى قرارات المنتج والكود والدعم بنفسي، وأشارك مراحل البناء علناً أولاً بأول.',
      chips: ['ANGULAR', 'META GRAPH API', 'SAAS'],
    },
    {
      period: '٢٠٢٤ — الآن',
      title: 'مطوّر برمجيات متوسط',
      company: 'DevExperts',
      paragraph:
        'أقود العمل الشامل على منصة إدارة معلومات المنتج، في معمارية الواجهة والخدمات الخلفية معاً. بنيت خدمة بـ .NET Core تولّد ملفات PDF وأخرجت معالجة مستندات CRM اليدوية من المسار، إضافة إلى خط مزامنة ينقل JSON إلى PostgreSQL.',
      chips: ['.NET CORE', 'ANGULAR', 'MICROSERVICES', 'POSTGRESQL'],
      logo: '/devexperts.png',
    },
    {
      period: '٢٠٢١ — ٢٠٢٣',
      title: 'شريك مؤسّس',
      company: 'Student-helper.org',
      paragraph:
        'أسّست student-helper.org لمساعدة الطلاب على إيجاد فرص في الخارج وإكمال طلباتهم. أطلقت المنصة وأدرت الجانب التجاري، وهناك تعلّمت إدارة المشاريع فعلياً.',
    },
    {
      period: '٢٠٢٠ — ٢٠٢٢',
      title: 'مطوّر برمجيات مشارك',
      company: 'SAP',
      paragraph:
        'عملت على مكوّنات Gigya-SAP الأساسية في منصة SAP السحابية العالمية. كتبت ميكروسيرفس بـ C# على Microsoft Orleans باستخدام TPL ونموذج الممثل الافتراضي، وأطلقت واجهات API مغطّاة باختبارات NUnit و xUnit، وصمّمت مخططات MySQL خلفها.',
      chips: ['C#', 'MS ORLEANS', 'MYSQL', 'NUNIT / XUNIT'],
      logo: '/sap.png',
    },
  ],
};

export const recommendation: Record<'en' | 'ar', Recommendation> = {
  en: {
    short:
      'An exceptional computing professional with strong analytical skills. He consistently demonstrated his ability to handle complex coding projects, meet tight deadlines, and collaborate effectively with cross-functional teams.',
    full:
      "I had the pleasure of leading Abdul for a year at SAP Labs Hungary, where he worked as a software developer associate. Abdul is an exceptional computing professional with strong analytical skills. He consistently demonstrated his ability to handle complex coding projects, meet tight deadlines, and collaborate effectively with cross-functional teams. As a successful team player, he always respected his colleagues' opinions and contributed positively to team discussions and decisions. He also possesses excellent problem-solving skills and is always eager to learn and grow his skills. His proactive approach and time management helped ensure that we stayed on track and delivered our features on time. In addition to his technical abilities, I want to highlight his polite and positive personality, which earned him recognition and the pleasure of working with us as part of our team. I highly recommend Abdul to any organisation seeking a talented and dedicated software developer.",
    author: 'Janos Zrak',
    meta: 'Platform Engineering Manager, SAP · managed me directly for a year · LinkedIn recommendation, Apr 2023',
  },
  ar: {
    short:
      'محترف استثنائي في الحوسبة بمهارات تحليلية قوية. أظهر باستمرار قدرته على التعامل مع مشاريع برمجية معقدة، والوفاء بمواعيد ضيقة، والتعاون الفعّال مع فرق متعددة التخصصات.',
    full:
      'تشرفت بقيادة عبدالرحمن لمدة عام في SAP Labs Hungary حيث عمل كمطوّر برمجيات مرتبط. عبدالرحمن محترف استثنائي في الحوسبة بمهارات تحليلية قوية، وأظهر باستمرار قدرته على التعامل مع مشاريع برمجية معقدة واستيفاء مواعيد نهائية ضيقة والتعاون الفعّال مع فرق متعددة التخصصات. كلاعب فريق ناجح احترم آراء زملائه وساهم إيجابياً في النقاشات والقرارات. يمتلك أيضاً مهارات ممتازة في حل المشكلات وحرصاً دائماً على التعلم وتطوير مهاراته؛ ساعدت نزعته الاستباقية وإدارته للوقت على البقاء في المسار وتسليم الميزات في الوقت المحدد. إلى جانب قدراته التقنية أبرز شخصيته المهذبة والإيجابية التي نالت تقدير الفريق. أنصح بشدة بعبدالرحمن لأي منظمة تبحث عن مطوّر موهوب وملتزم.',
    author: 'Janos Zrak',
    meta: 'مدير هندسة المنصات في SAP · أشرف عليّ مباشرة لمدة عام · توصية LinkedIn، أبريل ٢٠٢٣',
  },
};
