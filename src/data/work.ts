import type { AlsoBuiltItem, WorkCase } from '../types';

export const workCases: Record<'en' | 'ar', WorkCase[]> = {
  en: [
    {
      number: '01',
      name: 'Nabdah',
      stackLine: 'Nabdah · Angular · Meta Graph API · AaMa Development',
      headline: 'Someone comments a keyword, and the link they asked for arrives as a DM.',
      description:
        "The product I run at AaMa Development. You pick a keyword, write the reply once, and everyone who comments that word gets it as a direct message, with an optional follow-gate and a log of who received what. It connects through Meta's official API, so no passwords are involved and you can disconnect it at any time. I built it because I was sending the same link by hand to everyone who asked for it in my comments. The numbers below are from running it on my own account, in public.",
      repoUrl: 'https://nabddah.com',
      panel: {
        kind: 'stats',
        stats: [
          { value: 'LIVE', label: 'IN PRODUCTION' },
          { value: '300K', label: 'ACCOUNTS REACHED' },
          { value: '4.8K', label: 'COMMENTS' },
          { value: 'AR · EN', label: 'BILINGUAL' },
        ],
      },
    },
    {
      number: '02',
      name: 'iDaara',
      stackLine: 'iDaara · Angular 19 · .NET 10 · MediatR · PostgreSQL · Flutter',
      headline: 'A multi-tenant ERP where 17 modules share one auth and audit pipeline.',
      description:
        'An ERP covering everything from sales through to point of sale, built for multiple tenants. I designed the architecture and used CQRS through MediatR in every module. Stripe billing, a website builder and a Flutter client came later. It stays manageable because of 488 xUnit tests and conventions consistent enough for an AI agent to follow.',
      repoUrl: '', // closed source
      panel: {
        kind: 'stats',
        stats: [
          { value: '17', label: 'MODULES' },
          { value: '488', label: 'XUNIT TESTS' },
          { value: '2', label: 'CLIENTS · WEB + FLUTTER' },
          { value: 'RTL', label: 'MULTI-LANGUAGE' },
        ],
      },
    },
    {
      number: '03',
      name: 'ReelHub',
      stackLine: 'ReelHub · .NET 8 Aspire · Hangfire · Angular 18 · Serilog',
      headline: 'Posts go out on schedule, retry when they fail, and report back.',
      description:
        'An Aspire AppHost running Postgres, an API and a Hangfire worker together. Two jobs do the actual work: one publishes, the other checks status against the Get Late API and reconciles whatever it finds. The dashboard collects logs, metrics and traces from every service in one place.',
      repoUrl: '', // closed source
      panel: { kind: 'image', src: '/projects/reelhub.svg', alt: 'ReelHub' },
    },
    {
      number: '04',
      name: 'StackMap',
      stackLine: 'StackMap · Python · Roslyn · ts-morph · FastAPI · Mermaid',
      headline: 'Tells you which frontend code calls which backend route.',
      description:
        'A static analyser that runs ts-morph over the frontend and Roslyn over the .NET side, then matches HttpClient calls to the routes that serve them. It flags components nothing references any more. Reports come out as Markdown, Mermaid or Graphviz from a local web UI that shows progress as it runs.',
      repoUrl: 'https://github.com/AbdulrahmanAbdulqawi/StackMap',
      panel: {
        kind: 'terminal',
        lines: [
          { text: '$ stackmap analyze ./repo', accent: true },
          { text: '→ 412 components scanned' },
          { text: '→ 89 http calls correlated' },
          { text: '→ 14 orphaned routes' },
          { text: 'report.md · graph.mmd · graph.dot' },
        ],
      },
    },
  ],
  ar: [
    {
      number: '٠١',
      name: 'Nabdah',
      stackLine: 'Nabdah · Angular · Meta Graph API · AaMa Development',
      headline: 'أحدهم يكتب كلمة في التعليقات، فيصله الرابط الذي طلبه في رسالة خاصة.',
      description:
        'المنتج الذي أديره في AaMa Development. تختار كلمة، وتكتب الرد مرة واحدة، فيصل كل من علّق بتلك الكلمة رسالة خاصة بالرد نفسه، مع إمكانية اشتراط المتابعة وسجل يبيّن من استلم ماذا. يتصل عبر واجهة Meta الرسمية، فلا كلمات مرور في الأمر ويمكنك فصله متى شئت. بنيته لأنني كنت أرسل الرابط نفسه يدوياً لكل من يطلبه في تعليقاتي. الأرقام أدناه من تشغيله على حسابي الشخصي علناً.',
      repoUrl: 'https://nabddah.com',
      panel: {
        kind: 'stats',
        stats: [
          { value: 'مباشر', label: 'قيد التشغيل' },
          { value: '٣٠٠ ألف', label: 'حساب تم الوصول إليه' },
          { value: '٤٨٠٠', label: 'تعليق' },
          { value: 'عربي · إنجليزي', label: 'ثنائي اللغة' },
        ],
      },
    },
    {
      number: '٠٢',
      name: 'iDaara',
      stackLine: 'iDaara · Angular 19 · .NET 10 · MediatR · PostgreSQL · Flutter',
      headline: 'نظام ERP متعدد المستأجرين تتشارك فيه ١٧ وحدة قناة مصادقة وتدقيق واحدة.',
      description:
        'نظام ERP يغطي من المبيعات حتى نقاط البيع، مبني لعدة مستأجرين. صممت المعمارية واستخدمت CQRS عبر MediatR في كل وحدة. جاءت بعد ذلك فوترة Stripe ومنشئ المواقع وتطبيق Flutter. ويبقى النظام قابلاً للإدارة بفضل ٤٨٨ اختبار xUnit وأعراف متسقة بما يكفي ليتّبعها وكيل ذكاء اصطناعي.',
      repoUrl: '', // closed source
      panel: {
        kind: 'stats',
        stats: [
          { value: '١٧', label: 'وحدة' },
          { value: '٤٨٨', label: 'اختبار xUnit' },
          { value: '٢', label: 'عميل · ويب + Flutter' },
          { value: 'RTL', label: 'متعدد اللغات' },
        ],
      },
    },
    {
      number: '٠٣',
      name: 'ReelHub',
      stackLine: 'ReelHub · .NET 8 Aspire · Hangfire · Angular 18 · Serilog',
      headline: 'المنشورات تخرج في موعدها، وتعيد المحاولة عند الفشل، وتبلّغ عن حالتها.',
      description:
        'AppHost بـ Aspire يشغّل PostgreSQL وواجهة API وعامل Hangfire معاً. مهمتان تقومان بالعمل الفعلي: واحدة تنشر، والأخرى تتحقق من الحالة عبر Get Late API وتطابق ما تجده. تجمع اللوحة السجلات والمقاييس والتتبع من كل خدمة في مكان واحد.',
      repoUrl: '', // closed source
      panel: { kind: 'image', src: '/projects/reelhub.svg', alt: 'ReelHub' },
    },
    {
      number: '٠٤',
      name: 'StackMap',
      stackLine: 'StackMap · Python · Roslyn · ts-morph · FastAPI · Mermaid',
      headline: 'يخبرك أي كود في الواجهة يستدعي أي مسار في الخلفية.',
      description:
        'محلّل ثابت يشغّل ts-morph على الواجهة و Roslyn على جانب .NET، ثم يطابق نداءات HttpClient بالمسارات التي تخدمها. يكشف المكوّنات التي لم يعد أحد يشير إليها. تخرج التقارير بصيغة Markdown أو Mermaid أو Graphviz من واجهة محلية تعرض التقدّم أثناء العمل.',
      repoUrl: 'https://github.com/AbdulrahmanAbdulqawi/StackMap',
      panel: {
        kind: 'terminal',
        lines: [
          { text: '$ stackmap analyze ./repo', accent: true },
          { text: '→ 412 components scanned' },
          { text: '→ 89 http calls correlated' },
          { text: '→ 14 orphaned routes' },
          { text: 'report.md · graph.mmd · graph.dot' },
        ],
      },
    },
  ],
};

const gh = 'https://github.com/AbdulrahmanAbdulqawi/';

/** An empty url means there is nothing public to link: the repo is closed source, or the
 * project predates GitHub. The Work page renders those as plain names rather than links,
 * so no chip sends a visitor to a 404. */
export const alsoBuilt: Record<'en' | 'ar', AlsoBuiltItem[]> = {
  en: [
    { name: 'Agent', url: gh + 'Agent' },
    { name: 'Yemeni Driver', url: gh + 'Yemeni-Driver' },
    { name: 'Connect SAPiers', url: gh + 'C2S' },
    { name: 'Tobacco Shop', url: gh + 'Appliactions' },
    { name: 'Pacman (WPF)', url: gh + 'Games' },
    { name: 'TicketHub', url: '' },
    { name: 'YemeniCommunity', url: '' },
    { name: 'RefugeeHub', url: '' },
    { name: 'AIModel', url: '' },
    { name: 'Daar', url: '' },
    { name: 'Employee Registration', url: '' },
    { name: 'Neural Network Models', url: '' },
    { name: 'Student Helper', url: '' },
  ],
  ar: [
    { name: 'Agent', url: gh + 'Agent' },
    { name: 'Yemeni Driver', url: gh + 'Yemeni-Driver' },
    { name: 'Connect SAPiers', url: gh + 'C2S' },
    { name: 'تطبيق متجر التبغ', url: gh + 'Appliactions' },
    { name: 'لعبة باكمان', url: gh + 'Games' },
    { name: 'TicketHub', url: '' },
    { name: 'YemeniCommunity', url: '' },
    { name: 'RefugeeHub', url: '' },
    { name: 'AIModel', url: '' },
    { name: 'دار', url: '' },
    { name: 'تطبيق تسجيل الموظفين', url: '' },
    { name: 'نماذج شبكات عصبية', url: '' },
    { name: 'موقع مساعد الطالب', url: '' },
  ],
};
