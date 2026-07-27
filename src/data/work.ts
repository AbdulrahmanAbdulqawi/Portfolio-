import type { AlsoBuiltItem, WorkCase } from '../types';

export const workCases: Record<'en' | 'ar', WorkCase[]> = {
  en: [
    {
      number: '01',
      name: 'iDaara',
      stackLine: 'iDaara · Angular 19 · .NET 10 · MediatR · PostgreSQL · Flutter',
      headline: 'Seventeen ERP modules that share one auth, audit and import pipeline.',
      description:
        'A multi-tenant ERP covering sales through POS. I designed the architecture, implemented CQRS via MediatR across every module, added Stripe billing, a website builder and a Flutter client — then held the whole thing together with 488 xUnit tests and conventions an AI agent can follow.',
      repoUrl: 'https://github.com/AbdulrahmanAbdulqawi/iDaara',
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
      number: '02',
      name: 'ReelHub',
      stackLine: 'ReelHub · .NET 8 Aspire · Hangfire · Angular 18 · Serilog',
      headline: 'Scheduled posts that publish themselves, with retries and a live status feed.',
      description:
        'An Aspire AppHost orchestrating Postgres, an API and a Hangfire worker. Two jobs do the real work — one posts, one reconciles status against the Get Late API — and the dashboard puts logs, metrics and traces for every service in one place.',
      repoUrl: 'https://github.com/AbdulrahmanAbdulqawi/ReelHub',
      panel: { kind: 'image', src: '/projects/reelhub.svg', alt: 'ReelHub' },
    },
    {
      number: '03',
      name: 'StackMap',
      stackLine: 'StackMap · Python · Roslyn · ts-morph · FastAPI · Mermaid',
      headline: 'Answers "who calls this API?" in a monorepo, in seconds.',
      description:
        'A static analyser that drives ts-morph for the front end and Roslyn for .NET, correlates HttpClient calls with backend routes, flags orphaned components, and exports Markdown, Mermaid and Graphviz reports from a local web UI with live progress.',
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
      name: 'iDaara',
      stackLine: 'iDaara · Angular 19 · .NET 10 · MediatR · PostgreSQL · Flutter',
      headline: 'سبع عشرة وحدة ERP تتشارك مصادقة وتدقيقاً وقناة استيراد واحدة.',
      description:
        'نظام ERP متعدد المستأجرين يغطي المبيعات حتى نقاط البيع. صممت المعمارية، ونفّذت CQRS عبر MediatR في كل وحدة، وأضفت فوترة Stripe ومنشئ مواقع وتطبيق Flutter — ثم ثبّتُّ كل ذلك بـ ٤٨٨ اختبار xUnit وأعراف يستطيع وكيل ذكاء اصطناعي اتباعها.',
      repoUrl: 'https://github.com/AbdulrahmanAbdulqawi/iDaara',
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
      number: '٠٢',
      name: 'ReelHub',
      stackLine: 'ReelHub · .NET 8 Aspire · Hangfire · Angular 18 · Serilog',
      headline: 'منشورات مجدولة تنشر نفسها، مع إعادة محاولة وتحديث حالة لحظي.',
      description:
        'AppHost بـ Aspire ينسّق PostgreSQL وواجهة API وعامل Hangfire. مهمتان تقومان بالعمل الحقيقي — واحدة تنشر وأخرى تطابق الحالة مع Get Late API — واللوحة تجمع السجلات والمقاييس والتتبع لكل خدمة في مكان واحد.',
      repoUrl: 'https://github.com/AbdulrahmanAbdulqawi/ReelHub',
      panel: { kind: 'image', src: '/projects/reelhub.svg', alt: 'ReelHub' },
    },
    {
      number: '٠٣',
      name: 'StackMap',
      stackLine: 'StackMap · Python · Roslyn · ts-morph · FastAPI · Mermaid',
      headline: 'يجيب عن سؤال «من يستدعي هذا الـ API؟» في ثوانٍ.',
      description:
        'محلّل ثابت يقود ts-morph للواجهة و Roslyn لـ .NET، يربط نداءات HttpClient بمسارات الخلفية، يكشف المكونات اليتيمة، ويصدّر تقارير Markdown و Mermaid و Graphviz من واجهة محلية بتقدّم لحظي.',
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

export const alsoBuilt: Record<'en' | 'ar', AlsoBuiltItem[]> = {
  en: [
    { name: 'Agent', url: gh + 'Agent' },
    { name: 'TicketHub', url: gh + 'TicketHub' },
    { name: 'YemeniCommunity', url: gh + 'YemeniCommunity' },
    { name: 'RefugeeHub', url: gh + 'RefugeeHub' },
    { name: 'AIModel', url: gh + 'AIModel' },
    { name: 'Daar', url: gh + 'Daar' },
    { name: 'Employee Registration', url: '/work' },
    { name: 'Neural Network Models', url: '/work' },
    { name: 'Tobacco Shop', url: '/work' },
    { name: 'Pacman (WPF)', url: '/work' },
    { name: 'Student Helper', url: '/work' },
    { name: 'Yemeni Driver', url: '/work' },
    { name: 'Connect SAPiers', url: '/work' },
  ],
  ar: [
    { name: 'Agent', url: gh + 'Agent' },
    { name: 'TicketHub', url: gh + 'TicketHub' },
    { name: 'YemeniCommunity', url: gh + 'YemeniCommunity' },
    { name: 'RefugeeHub', url: gh + 'RefugeeHub' },
    { name: 'AIModel', url: gh + 'AIModel' },
    { name: 'دار', url: gh + 'Daar' },
    { name: 'تطبيق تسجيل الموظفين', url: '/work' },
    { name: 'نماذج شبكات عصبية', url: '/work' },
    { name: 'تطبيق متجر التبغ', url: '/work' },
    { name: 'لعبة باكمان', url: '/work' },
    { name: 'موقع مساعد الطالب', url: '/work' },
    { name: 'Yemeni Driver', url: '/work' },
    { name: 'Connect SAPiers', url: '/work' },
  ],
};
