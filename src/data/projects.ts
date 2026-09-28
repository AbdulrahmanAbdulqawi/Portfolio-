import type { Project } from '../types';

const gh = 'https://github.com/AbdulrahmanAbdulqawi/';

/**
 * The full project index, shown under the four case studies on the Work page.
 *
 * `status: 'private'` carries no url on purpose: those are closed source, and the whole point
 * of this table is that a project can be listed without pretending there is somewhere to click.
 * The API drops the url on a private row too, so the invariant holds from both ends.
 *
 * Descriptions are written from each project's own source: its README, its entities and
 * controllers, or the pages it serves. The few still empty are ones with no readable source.
 */
export const projects: Record<'en' | 'ar', Project[]> = {
  en: [
    {
      name: 'DeployAI',
      description:
        'Connect GitHub once, link Vercel and Railway, pick the folders you want out of a monorepo, and publish the site and the server in one flow.',
      stackLine: 'Angular 18 · .NET 8 · PostgreSQL · Hangfire · SignalR',
      year: '2026',
      url: gh + 'deployAi',
      status: 'live',
      featured: true,
    },
    {
      name: 'TicketHub',
      description:
        'A multi-tenant helpdesk. Each workspace gets its own tickets, labels, time entries and customer portal, and a connected mailbox turns incoming email into tickets on rules you set. Subscriptions, usage counters and an AI assist sit on top.',
      stackLine: '.NET Aspire · Angular · PostgreSQL · Hangfire · OpenAI',
      year: '2026',
      url: '',
      status: 'private',
      featured: true,
    },
    {
      name: 'YemeniCommunity',
      description:
        'A forum for the Yemeni community in the Netherlands, in Arabic, Dutch and English with a right-to-left layout. The public side covers clubs, events and news; behind it is a protected admin for all of it, with media upload.',
      stackLine: 'Angular 21 · .NET · EF Core · PostgreSQL',
      year: '2026',
      url: '',
      status: 'private',
      featured: true,
    },
    {
      name: 'Yemeni Breeze',
      description:
        'A trilingual site for a youth-led Yemeni cultural initiative in Amsterdam. Event registration is capacity-aware: once the seats are gone, new signups go to a waitlist instead.',
      stackLine: 'Angular 20 · .NET 10 · EF Core · Transloco',
      year: '2026',
      url: gh + 'yemeni-breeze',
      status: 'live',
      featured: true,
    },
    {
      name: 'Agent',
      description:
        'Runs on your own machine. You create an agent, give it goals and context, and it works through them on its own using Claude, OpenAI or Cursor.',
      stackLine: 'Angular · .NET 8 · Claude · OpenAI',
      year: '2026',
      url: gh + 'Agent',
      status: 'live',
      featured: true,
    },
    {
      name: 'Roadmap',
      description:
        'An interactive Arabic roadmap for software engineers: ten rules, a four-year study plan, five parallel tracks, and a way to tick off your progress as you go.',
      stackLine: 'HTML · CSS · JavaScript',
      year: '2026',
      url: gh + 'roadmap',
      status: 'live',
      featured: true,
    },
    {
      name: 'proex.bh',
      description:
        'A site for ProEx, a consulting and business development firm. The services are split three ways, across government, private sector and civil society: assessments, communications, events, relationships and training.',
      stackLine: 'HTML · PHP',
      year: '2026',
      url: gh + 'proex.bh',
      status: 'live',
      featured: false,
    },
    {
      name: 'Connect SAPiers',
      description:
        'A services marketplace for SAP colleagues. A .NET API behind a Flutter app: you browse what is on offer, book it, get notified, and leave a review afterwards.',
      stackLine: '.NET · Flutter · Angular',
      year: '2024',
      url: gh + 'C2S',
      status: 'archived',
      featured: false,
    },
    {
      name: 'Yemeni Driver',
      description:
        'Ride-hailing. A rider posts a request, a driver picks it up, and both rate the trip afterwards. Keeps track of vehicles, locations and trip history.',
      stackLine: '.NET · Angular · EF Core',
      year: '2024',
      url: gh + 'Yemeni-Driver',
      status: 'archived',
      featured: false,
    },
    {
      name: 'Student Helper',
      description:
        'A platform I co-founded to help students find opportunities abroad and get through the applications. I shipped it and ran the business side.',
      stackLine: '',
      year: '2021-23',
      url: '',
      status: 'archived',
      featured: false,
    },
    {
      name: 'Tobacco Shop',
      description:
        'Shop inventory built in layers, data to repository to logic, with two clients on top of the same core: a WPF desktop app and a web front.',
      stackLine: 'C# · WPF · ASP.NET',
      year: '2024',
      url: gh + 'Appliactions',
      status: 'archived',
      featured: false,
    },
    {
      name: 'Pacman (WPF)',
      description:
        'Pacman split into model, logic, renderer and control, with unit tests over the logic and high scores that survive between runs.',
      stackLine: 'C# · WPF',
      year: '2021',
      url: gh + 'Games',
      status: 'archived',
      featured: false,
    },
    { name: 'RefugeeHub', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'Daar', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'AIModel', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'Employee Registration', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
    { name: 'Neural Network Models', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
  ],
  ar: [
    {
      name: 'DeployAI',
      description:
        'تربط GitHub مرة واحدة، وتوصّل Vercel و Railway، وتختار المجلدات التي تريدها من المستودع، ثم تنشر الموقع والخادم في خطوة واحدة.',
      stackLine: 'Angular 18 · .NET 8 · PostgreSQL · Hangfire · SignalR',
      year: '٢٠٢٦',
      url: gh + 'deployAi',
      status: 'live',
      featured: true,
    },
    {
      name: 'TicketHub',
      description:
        'نظام دعم فني متعدد المستأجرين. لكل مساحة عمل تذاكرها وتصنيفاتها وسجل أوقاتها وبوابة عملائها، وصندوق البريد الموصول يحوّل الرسائل الواردة إلى تذاكر وفق قواعد تضبطها أنت. وفوق ذلك الاشتراكات وعدادات الاستخدام ومساعد ذكاء اصطناعي.',
      stackLine: '.NET Aspire · Angular · PostgreSQL · Hangfire · OpenAI',
      year: '٢٠٢٦',
      url: '',
      status: 'private',
      featured: true,
    },
    {
      name: 'YemeniCommunity',
      description:
        'منتدى للجالية اليمنية في هولندا، بالعربية والهولندية والإنجليزية مع تخطيط من اليمين إلى اليسار. الواجهة العامة تغطي الأندية والفعاليات والأخبار، وخلفها لوحة إدارة محمية تتحكم بها كلها مع رفع الوسائط.',
      stackLine: 'Angular 21 · .NET · EF Core · PostgreSQL',
      year: '٢٠٢٦',
      url: '',
      status: 'private',
      featured: true,
    },
    {
      name: 'نسمات اليمن',
      description:
        'موقع ثلاثي اللغة لمبادرة ثقافية يمنية شبابية في أمستردام. التسجيل في الفعاليات يراعي سعة المقاعد: حين تنفد، يذهب المسجّلون الجدد إلى قائمة انتظار.',
      stackLine: 'Angular 20 · .NET 10 · EF Core · Transloco',
      year: '٢٠٢٦',
      url: gh + 'yemeni-breeze',
      status: 'live',
      featured: true,
    },
    {
      name: 'Agent',
      description:
        'يعمل على جهازك. تنشئ وكيلاً وتعطيه أهدافاً وسياقاً، فيشتغل عليها وحده عبر Claude أو OpenAI أو Cursor.',
      stackLine: 'Angular · .NET 8 · Claude · OpenAI',
      year: '٢٠٢٦',
      url: gh + 'Agent',
      status: 'live',
      featured: true,
    },
    {
      name: 'خارطة الطريق',
      description:
        'خارطة طريق تفاعلية بالعربية لمهندسي البرمجيات: عشر قواعد، وخطة دراسية لأربع سنوات، وخمسة مسارات موازية، وأداة لتتبع تقدمك أولاً بأول.',
      stackLine: 'HTML · CSS · JavaScript',
      year: '٢٠٢٦',
      url: gh + 'roadmap',
      status: 'live',
      featured: true,
    },
    {
      name: 'proex.bh',
      description:
        'موقع لشركة ProEx للاستشارات وتطوير الأعمال. الخدمات موزّعة على ثلاثة قطاعات: الحكومي والخاص ومنظمات المجتمع المدني، وتشمل التقييم والاتصال والفعاليات والعلاقات والتدريب.',
      stackLine: 'HTML · PHP',
      year: '٢٠٢٦',
      url: gh + 'proex.bh',
      status: 'live',
      featured: false,
    },
    {
      name: 'Connect SAPiers',
      description:
        'سوق خدمات لزملاء SAP. واجهة API بـ .NET خلف تطبيق Flutter: تتصفح المعروض، وتحجز، ويصلك إشعار، ثم تترك تقييماً.',
      stackLine: '.NET · Flutter · Angular',
      year: '٢٠٢٤',
      url: gh + 'C2S',
      status: 'archived',
      featured: false,
    },
    {
      name: 'Yemeni Driver',
      description:
        'تطبيق نقل. الراكب ينشر طلباً، والسائق يستلمه، ويقيّم كل منهما الرحلة بعدها. يتتبّع المركبات والمواقع وسجل الرحلات.',
      stackLine: '.NET · Angular · EF Core',
      year: '٢٠٢٤',
      url: gh + 'Yemeni-Driver',
      status: 'archived',
      featured: false,
    },
    {
      name: 'موقع مساعد الطالب',
      description:
        'منصة شاركت في تأسيسها لمساعدة الطلاب على إيجاد فرص في الخارج وإكمال طلباتهم. أطلقت المنصة وأدرت الجانب التجاري.',
      stackLine: '',
      year: '٢٠٢١-٢٣',
      url: '',
      status: 'archived',
      featured: false,
    },
    {
      name: 'تطبيق متجر التبغ',
      description:
        'نظام مخزون لمتجر مبني بطبقات، من البيانات إلى المستودع إلى المنطق، وفوقه واجهتان تشتركان في النواة نفسها: تطبيق سطح مكتب بـ WPF وواجهة ويب.',
      stackLine: 'C# · WPF · ASP.NET',
      year: '٢٠٢٤',
      url: gh + 'Appliactions',
      status: 'archived',
      featured: false,
    },
    {
      name: 'لعبة باكمان',
      description:
        'باكمان مقسّمة إلى نموذج ومنطق وعارض وتحكم، مع اختبارات وحدة على المنطق وأعلى نتائج تبقى محفوظة بين الجولات.',
      stackLine: 'C# · WPF',
      year: '٢٠٢١',
      url: gh + 'Games',
      status: 'archived',
      featured: false,
    },
    { name: 'RefugeeHub', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'دار', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'AIModel', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'تطبيق تسجيل الموظفين', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
    { name: 'نماذج شبكات عصبية', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
  ],
};
