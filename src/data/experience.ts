import type { Experience, Recommendation } from '../types';

export const experiences: Record<'en' | 'ar', Experience[]> = {
  en: [
    {
      period: '2024 — now',
      title: 'Medior Software Developer',
      company: 'DevExperts',
      paragraph:
        'Leads full-stack development of a Product Information Management platform across frontend architecture and backend services. Built a .NET Core PDF generation service that automated CRM document processing, and a synchronisation pipeline migrating JSON into PostgreSQL.',
      chips: ['.NET CORE', 'ANGULAR', 'MICROSERVICES', 'POSTGRESQL'],
      logo: '/devexperts.png',
    },
    {
      period: '2021 — 2023',
      title: 'Co-founder',
      company: 'Student-helper.org',
      paragraph:
        'Founded student-helper.org to help students find opportunities abroad and get through the applications. Shipped the platform, ran the business, and learned project management and entrepreneurship the direct way.',
    },
    {
      period: '2020 — 2022',
      title: 'Associate Software Developer',
      company: 'SAP',
      paragraph:
        "Designed and developed core Gigya-SAP components on SAP's global cloud platform. Built C# microservices on Microsoft Orleans using TPL and the virtual-actor model, shipped API endpoints with NUnit and xUnit coverage, and designed the MySQL schemas and migrations behind them.",
      chips: ['C#', 'MS ORLEANS', 'MYSQL', 'NUNIT / XUNIT'],
      logo: '/sap.png',
    },
  ],
  ar: [
    {
      period: '٢٠٢٤ — الآن',
      title: 'مطوّر برمجيات متوسط',
      company: 'DevExperts',
      paragraph:
        'يقود التطوير الشامل لمنصة إدارة معلومات المنتج على مستوى معمارية الواجهة والخدمات الخلفية. بنى خدمة توليد PDF بـ .NET Core أتمتت معالجة مستندات CRM، وخط مزامنة يرحّل JSON إلى PostgreSQL.',
      chips: ['.NET CORE', 'ANGULAR', 'MICROSERVICES', 'POSTGRESQL'],
      logo: '/devexperts.png',
    },
    {
      period: '٢٠٢١ — ٢٠٢٣',
      title: 'شريك مؤسّس',
      company: 'Student-helper.org',
      paragraph:
        'أسّست student-helper.org لمساعدة الطلاب على إيجاد فرص في الخارج وإكمال طلباتهم. أطلقت المنصة، وأدرت العمل، وتعلّمت إدارة المشاريع وريادة الأعمال بالطريقة المباشرة.',
    },
    {
      period: '٢٠٢٠ — ٢٠٢٢',
      title: 'مطوّر برمجيات مشارك',
      company: 'SAP',
      paragraph:
        'صمّم وطوّر مكوّنات Gigya-SAP الأساسية على منصة SAP السحابية العالمية. بنى ميكروسيرفس بـ C# على Microsoft Orleans باستخدام TPL ونموذج الممثل الافتراضي، وأطلق واجهات API مغطّاة باختبارات NUnit و xUnit، وصمّم مخططات MySQL والترحيلات خلفها.',
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
