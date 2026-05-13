import type { Project } from '../types';

export const projectCategories = ['all', 'web', 'desktop', 'fullstack'] as const;

export const projects: Record<'en' | 'ar', Project[]> = {
  en: [
    {
      title: 'ReelHub',
      description:
        'Social-media reels scheduling and orchestration platform: .NET Aspire AppHost with PostgreSQL, an API server, a Hangfire-based worker that processes scheduled posts and refreshes statuses from the Get Late API, and an Angular 18 client.',
      technologies: ['.NET 8', 'Aspire', 'Hangfire', 'Angular 18', 'PostgreSQL', 'EF Core', 'Serilog'],
      category: 'fullstack',
      image: '/projects/reelhub.svg',
      illustration: 'reel',
      github: 'https://github.com/AbdulrahmanAbdulqawi/ReelHub',
      repoNote: 'ReelHub.AppHost/README.md describes the Aspire dashboard and service map; ReelHub.Worker/README.md covers the scheduled jobs and Get Late integration.',
      caseStudy: {
        context:
          'Creators want to draft, schedule, and track reels across social platforms in one place, with reliable background processing for the posting window and status updates.',
        contribution:
          'Built the .NET Aspire AppHost orchestrating PostgreSQL, API server, and Hangfire worker; implemented ProcessScheduledPostsJob and RefreshReelStatusesJob, integrated the Get Late API for posting and status refresh, and shipped an Angular 18 HTTPS client with Serilog and structured logging.',
        outcome:
          'Scheduled reels are posted automatically with retries, statuses stay in sync without manual refresh, and the Aspire dashboard gives one place to watch logs, metrics, and traces across services.',
      },
    },
    {
      title: 'Agent',
      description:
        'OpenClaw-style AI coding agent with a Gateway WebSocket control plane, Angular Control UI, CLI, multi-provider support, and a file-system skills registry.',
      technologies: ['.NET', 'ASP.NET Core', 'Angular', 'WebSocket', 'JSON-RPC', 'CLI'],
      category: 'fullstack',
      illustration: 'agent',
      github: 'https://github.com/AbdulrahmanAbdulqawi/Agent',
      repoNote: 'See ROADMAP.md for the phase 1-6 product and architecture plan.',
      caseStudy: {
        context:
          'Engineers need a single control plane to drive multiple AI coding providers, with auditable runs and a way to compose reusable skills outside any single IDE.',
        contribution:
          'Built the JSON-RPC WebSocket Gateway, Angular Control UI, CLI (run / daemon / doctor), and file-system skills registry, and integrated Cursor Cloud Agents, Claude, and OpenAI behind a unified contract.',
        outcome:
          'One place to launch, follow up on, and inspect agent runs across providers, with a roadmap-driven path from prototype to a richer agent platform.',
      },
    },
    {
      title: 'AIModel',
      description:
        'Code-generation training pipeline for .NET and Angular with local/Hugging Face data preparation, RAG retrieval, QLoRA fine-tuning, FastAPI inference, and .NET/Angular clients.',
      technologies: ['Python', 'QLoRA', 'RAG', 'FastAPI', '.NET', 'Angular'],
      category: 'fullstack',
      illustration: 'aiTraining',
      github: 'https://github.com/AbdulrahmanAbdulqawi/AIModel',
      caseStudy: {
        context:
          'Teams want fine-tuned LLMs that follow their .NET and Angular conventions, but most tutorials stop at theory and never connect data prep, RAG, training, serving, and client wiring.',
        contribution:
          'Wrote dataset preparation (local plus Hugging Face), code embedding and retrieval, QLoRA fine-tuning of CodeLlama, adapter merge/export, FastAPI inference, and reference .NET and Angular client SDKs.',
        outcome:
          'An end-to-end reference pipeline from raw repo to working code assistant for .NET and Angular, with each step swappable for different models or datasets.',
      },
    },
    {
      title: 'Daar (دار)',
      description:
        'Real-estate investment club pitch application with an Angular front end, ASP.NET Core API lead capture, and supporting pitch, business-plan, and letter-of-intent materials.',
      technologies: ['Angular', '.NET 10', 'ASP.NET Core', 'TypeScript'],
      category: 'fullstack',
      illustration: 'realEstate',
      github: 'https://github.com/AbdulrahmanAbdulqawi/Daar',
      caseStudy: {
        context:
          'Launching a community real-estate investment club required a credible online pitch plus a way to capture interest from prospective members in one place.',
        contribution:
          'Built the Angular front end, ASP.NET Core 10 interest API with configurable CORS and environment-specific base URLs, and authored the pitch deck, business plan, and letter of intent.',
        outcome:
          'A unified product (deck plus app plus API) that turns visitors into qualified leads and gives the club a starting CRM signal to follow up on.',
      },
    },
    {
      title: 'StackMap',
      description:
        'Static structural analyzer for Angular and .NET monorepos with cross-layer HTTP correlation, orphan heuristics, Markdown/JSON/YAML reports, Mermaid/Graphviz graphs, and a FastAPI web UI.',
      technologies: ['Python', 'FastAPI', 'ts-morph', 'Roslyn', 'Mermaid', 'Graphviz'],
      category: 'fullstack',
      illustration: 'codeGraph',
      github: 'https://github.com/AbdulrahmanAbdulqawi/StackMap',
      repoNote: 'README documents stackmap analyze flags, graph export, and the local web UI.',
      caseStudy: {
        context:
          'In large Angular and .NET monorepos it is hard to see which front-end HttpClient calls hit which backend route, which components are orphaned, or how projects depend on each other.',
        contribution:
          'Built a Python analyzer that drives a ts-morph / Angular compiler bridge for the front end and Roslyn for .NET, correlates HTTP calls across layers, emits Markdown/JSON/YAML reports, and ships a local FastAPI web UI with SSE progress.',
        outcome:
          'Architects can answer "who calls this API?" and "what is unused?" in seconds, with shareable hash-routed reports and reproducible exports per job.',
      },
    },
    {
      title: 'iDaara',
      description:
        'Multi-tenant ERP covering sales, purchase, inventory/WMS, accounting, CRM, HR, recruitment, projects, helpdesk, POS, website builder, gamification, automation, and super-admin workflows.',
      technologies: ['Angular 19', '.NET 10', 'EF Core', 'MediatR', 'PostgreSQL', 'Flutter', 'Stripe'],
      category: 'fullstack',
      illustration: 'erp',
      github: 'https://github.com/AbdulrahmanAbdulqawi/iDaara',
      repoNote: 'See AGENTS.md and docs/SETUP.md for the module map, test inventory, and setup flow.',
      caseStudy: {
        context:
          'Small and mid-size businesses want comprehensive ERP breadth (sales, inventory, accounting, HR, CRM, POS, website builder) with modern tooling, multi-language including RTL, and room for regional customisation.',
        contribution:
          'Designed the multi-tenant Angular 19 + .NET 10 architecture, implemented CQRS via MediatR across 17 modules, added gamification, website builder, Stripe billing, Flutter mobile app, and 488 xUnit tests, and authored .cursor rules so AI agents follow the conventions.',
        outcome:
          'A unified ERP platform where modules share the same auth, permissions, automations, audit, and import/export pipeline, with the testing and tooling discipline to keep evolving safely.',
      },
    },
    {
      title: 'RefugeeHub',
      description:
        'Refugee connection platform for the Netherlands with Angular, ASP.NET Core, PostgreSQL, SignalR chat, community groups, events, jobs, NGO resources, mentorship, and gamification.',
      technologies: ['Angular 18', '.NET 8', 'PostgreSQL', 'SignalR', 'Docker'],
      category: 'fullstack',
      illustration: 'refugee',
      github: 'https://github.com/AbdulrahmanAbdulqawi/RefugeeHub',
      caseStudy: {
        context:
          'Refugees arriving in the Netherlands struggle to find each other, NGOs, jobs, and mentors across a fragmented set of services and languages.',
        contribution:
          'Built the Angular 18 + Material + NgRx client and ASP.NET Core 8 API with PostgreSQL, JWT auth, SignalR chat, events with RSVP, job listings, NGO directory, mentorship matching, and gamified engagement; Dockerised the full stack for one-command setup.',
        outcome:
          'A single hub where refugees, volunteers, and NGOs can find each other and act, with real-time chat and gamification keeping the community active rather than read-only.',
      },
    },
    {
      title: 'TicketHub',
      description:
        'Multi-service ticketing platform with Aspire orchestration, API/server layers, domain/data/business projects, a background worker, tests, and an Angular client.',
      technologies: ['.NET 9', 'Aspire', 'Angular', 'ASP.NET Core', 'Worker Services'],
      category: 'fullstack',
      illustration: 'ticket',
      github: 'https://github.com/AbdulrahmanAbdulqawi/TicketHub',
      caseStudy: {
        context:
          'A ticketing product needs a clean separation between API, domain logic, persistence, background jobs, and a client app, plus a way to orchestrate the moving parts locally and in production.',
        contribution:
          'Split the system into TicketHub.AppHost (.NET Aspire), Server, Domain, Data, Business, Worker, Tests, and an Angular client, and wired Docker and NuGet config so the whole platform boots together.',
        outcome:
          'Aspire\u2019s dashboard gives a single view of every service, the worker handles slow flows asynchronously, and each layer can be replaced or scaled without touching the rest.',
      },
    },
    {
      title: 'YemeniCommunity',
      description:
        'Bilingual Yemeni community forum for Arabic, Dutch, and English visitors with clean architecture, Angular standalone components, JWT admin CRUD, clubs, events, news, pages, media upload, RTL, and accessibility preferences.',
      technologies: ['Angular 21', '.NET 8', 'Minimal APIs', 'EF Core', 'PostgreSQL', 'JWT'],
      category: 'fullstack',
      image: '/projects/yemenicommunity.svg',
      illustration: 'community',
      github: 'https://github.com/AbdulrahmanAbdulqawi/YemeniCommunity',
      repoNote: 'APPLICATION_STUDY.md contains the full architecture and feature study.',
      caseStudy: {
        context:
          'The Yemeni community in the Netherlands needed an official online home with content (clubs, events, news, static pages) editable by non-developers, while serving Arabic, Dutch, and English readers including RTL.',
        contribution:
          'Built a clean-architecture .NET 8 backend (API to Application to Domain to Infrastructure), Angular 21 standalone-component front end, JWT-protected admin CRUD with media upload (10 MB image/video), seeded clubs, a page-by-key+language model, and appearance preferences (theme, accent, font, reduced motion, high contrast).',
        outcome:
          'Admins manage content directly in their language without touching code; readers get a fast, accessible site in their language with RTL, and the architecture leaves room to add forums or members later.',
      },
    },
    {
      title: 'Neural Network Models (thesis)',
      description:
        'Thesis work in Python to run experiments and build machine learning models that are simpler and easier to interpret than conventional black-box approaches.',
      technologies: ['Python', 'Deep Learning', 'Neural Networks'],
      category: 'fullstack',
      illustration: 'neural',
    },
    {
      title: 'Employee Registration App',
      description:
        'Employee registration solution using ASP.NET Core and Azure with a CI/CD pipeline, demonstrating end-to-end delivery and cloud deployment practices.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
      illustration: 'cloudPipeline',
      repoNote: 'Check the repository README for setup, then API and deployment-related folders for the full flow.',
      caseStudy: {
        context:
          'Organizations need reliable employee onboarding with auditable data and environments that scale from dev to production without manual hand-offs.',
        contribution:
          'Designed and implemented ASP.NET Core services, integrated Azure hosting, and wired a CI/CD pipeline so builds and releases are repeatable.',
        outcome:
          'A clearer path from commit to deployed API, fewer deployment surprises, and a template you can extend for similar internal tools.',
      },
    },
    {
      title: 'Student Helper Website',
      description:
        'Built on the Wix platform with HTML, CSS, and JavaScript as a first business attempt—combining student support abroad with learning in project management, leadership, and entrepreneurship.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'Pacman Game',
      description:
        'Classic Pacman-style game developed entirely from scratch without a dedicated game engine or third-party game libraries, using WPF and strong object-oriented design.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
      illustration: 'arcadeGame',
    },
    {
      title: 'Tobacco Shop Application',
      description:
        'Multi-surface application spanning console, WPF desktop, ASP web, and ASP.NET Core API layers to practice layered architecture and software engineering principles across C# and Java.',
      technologies: ['C#', 'Java', 'WPF', 'ASP.NET', 'API'],
      category: 'fullstack',
      illustration: 'multiLayerApp',
      repoNote: 'README outlines solution layout; each surface (console, desktop, web, API) maps to a separate project or folder.',
      caseStudy: {
        context:
          'A structured exercise to mirror real inventory-style flows across multiple clients while keeping domain logic consistent.',
        contribution:
          'Implemented separate UI and API surfaces in C# and Java, practiced dependency direction between layers, and kept shared concepts aligned across stacks.',
        outcome:
          'Stronger intuition for where boundaries belong, how to test layers in isolation, and how the same domain behaves on desktop vs web vs API.',
      },
    },
    {
      title: 'Yemeni Driver',
      description:
        'Web project built with ASP.NET Core, C#, HTML, CSS, and JavaScript to support a practical use case in the Yemeni Driver domain.',
      technologies: ['ASP.NET Core', 'C#', 'HTML', 'CSS', 'JavaScript'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'Connect SAPiers',
      description:
        'Event-style project focused on brainstorming and prototyping new ideas within the Connect SAPiers initiative.',
      technologies: ['Prototyping', 'Workshop', 'SAP community'],
      category: 'fullstack',
      illustration: 'prototypeIdeas',
    },
  ],
  ar: [
    {
      title: 'ReelHub',
      description:
        'منصة لجدولة وتنسيق مقاطع الريلز عبر منصات التواصل: تنسيق .NET Aspire مع PostgreSQL، خادم API، عامل Hangfire يعالج المنشورات المجدولة ويحدّث الحالات من Get Late API، وعميل Angular 18.',
      technologies: ['.NET 8', 'Aspire', 'Hangfire', 'Angular 18', 'PostgreSQL', 'EF Core', 'Serilog'],
      category: 'fullstack',
      image: '/projects/reelhub.svg',
      illustration: 'reel',
      github: 'https://github.com/AbdulrahmanAbdulqawi/ReelHub',
      repoNote: 'يصف ReelHub.AppHost/README.md لوحة Aspire وخريطة الخدمات؛ ويغطي ReelHub.Worker/README.md المهام المجدولة وتكامل Get Late.',
      caseStudy: {
        context:
          'يحتاج صنّاع المحتوى إلى صياغة وجدولة وتتبع مقاطع الريلز عبر المنصات في مكان واحد، مع معالجة خلفية موثوقة لوقت النشر وتحديثات الحالة.',
        contribution:
          'بناء .NET Aspire AppHost ينسق PostgreSQL وخادم API وعامل Hangfire، وتنفيذ مهام ProcessScheduledPostsJob و RefreshReelStatusesJob، وتكامل Get Late API للنشر وتحديث الحالة، وعميل Angular 18 على HTTPS مع Serilog وتسجيل بنيوي.',
        outcome:
          'يتم نشر الريلز المجدولة تلقائياً مع إعادة المحاولة، وتبقى الحالات متزامنة دون تحديث يدوي، وتعطي لوحة Aspire مكاناً واحداً لمتابعة السجلات والمقاييس والتتبع عبر الخدمات.',
      },
    },
    {
      title: 'Agent',
      description:
        'وكيل برمجة ذكاء اصطناعي بأسلوب OpenClaw مع بوابة WebSocket للتحكم، واجهة Angular للإدارة، CLI، دعم عدة مزودين، وسجل مهارات مبني على الملفات.',
      technologies: ['.NET', 'ASP.NET Core', 'Angular', 'WebSocket', 'JSON-RPC', 'CLI'],
      category: 'fullstack',
      illustration: 'agent',
      github: 'https://github.com/AbdulrahmanAbdulqawi/Agent',
      repoNote: 'يوضح ROADMAP.md خطة المنتج والمعمارية من المرحلة 1 إلى 6.',
      caseStudy: {
        context:
          'يحتاج المطورون إلى مستوى تحكم موحد لتشغيل عدة مزودي ذكاء اصطناعي للبرمجة، مع تشغيلات قابلة للتدقيق وإمكانية بناء مهارات قابلة لإعادة الاستخدام خارج أي IDE معيّن.',
        contribution:
          'بناء بوابة WebSocket بـ JSON-RPC، واجهة Angular للتحكم، CLI (run / daemon / doctor)، وسجل مهارات مبني على الملفات، وتكامل Cursor Cloud Agents و Claude و OpenAI تحت عقد موحد.',
        outcome:
          'مكان واحد لإطلاق ومتابعة وفحص تشغيلات الوكلاء عبر المزودين، مع مسار مدفوع بخارطة طريق من النموذج الأولي إلى منصة وكلاء أوسع.',
      },
    },
    {
      title: 'AIModel',
      description:
        'خط تدريب لتوليد كود .NET و Angular يشمل تجهيز بيانات محلية أو من Hugging Face، استرجاع RAG، ضبط QLoRA، واجهة FastAPI للاستدلال، وعملاء .NET و Angular.',
      technologies: ['Python', 'QLoRA', 'RAG', 'FastAPI', '.NET', 'Angular'],
      category: 'fullstack',
      illustration: 'aiTraining',
      github: 'https://github.com/AbdulrahmanAbdulqawi/AIModel',
      caseStudy: {
        context:
          'تريد الفرق نماذج لغة مضبوطة تتبع أعراف كودها في .NET و Angular، لكن معظم الدروس تتوقف عند النظرية ولا تربط تجهيز البيانات و RAG والتدريب والخدمة وعملاء التكامل في خط واحد.',
        contribution:
          'كتابة تجهيز البيانات (محلي ومن Hugging Face)، تضمين واسترجاع الكود، ضبط QLoRA لـ CodeLlama، دمج وتصدير المحول، واجهة FastAPI للاستدلال، وعملاء مرجعيون بـ .NET و Angular.',
        outcome:
          'خط مرجعي شامل من المستودع الخام إلى مساعد كود فعّال لـ .NET و Angular، مع إمكانية استبدال كل خطوة بنماذج أو بيانات مختلفة.',
      },
    },
    {
      title: 'دار',
      description:
        'تطبيق عرض لناد استثماري عقاري بواجهة Angular وواجهة API بـ ASP.NET Core لجمع الاهتمام، مع مواد داعمة مثل العرض وخطة العمل وخطاب النوايا.',
      technologies: ['Angular', '.NET 10', 'ASP.NET Core', 'TypeScript'],
      category: 'fullstack',
      illustration: 'realEstate',
      github: 'https://github.com/AbdulrahmanAbdulqawi/Daar',
      caseStudy: {
        context:
          'يتطلب إطلاق ناد استثماري عقاري للمجتمع عرضاً موثوقاً على الإنترنت إلى جانب وسيلة لجمع اهتمام الأعضاء المحتملين في مكان واحد.',
        contribution:
          'بناء واجهة Angular وواجهة API بـ ASP.NET Core 10 لجمع الاهتمام مع CORS قابل للتهيئة وعناوين API حسب البيئة، وتأليف العرض وخطة العمل وخطاب النوايا.',
        outcome:
          'منتج موحد (عرض + تطبيق + API) يحوّل الزوار إلى عملاء مهتمين ويعطي النادي إشارة CRM أولية للمتابعة.',
      },
    },
    {
      title: 'StackMap',
      description:
        'محلل بنية ثابت لتطبيقات Angular و .NET في مستودعات موحدة، مع ربط طلبات HTTP بين الطبقات، اكتشاف العناصر اليتيمة، تقارير Markdown/JSON/YAML، رسوم Mermaid/Graphviz، وواجهة FastAPI محلية.',
      technologies: ['Python', 'FastAPI', 'ts-morph', 'Roslyn', 'Mermaid', 'Graphviz'],
      category: 'fullstack',
      illustration: 'codeGraph',
      github: 'https://github.com/AbdulrahmanAbdulqawi/StackMap',
      repoNote: 'يوثق README أوامر stackmap analyze وتصدير الرسوم والواجهة المحلية.',
      caseStudy: {
        context:
          'في المستودعات الكبيرة لـ Angular و .NET يصعب معرفة أي نداءات HttpClient في الواجهة تصيب أي مسار في الخلفية، وأي المكونات يتيمة، وكيف تعتمد المشاريع على بعضها.',
        contribution:
          'بناء محلل بـ Python يقود جسر ts-morph ومُجمّع Angular للواجهة و Roslyn لـ .NET، يربط نداءات HTTP بين الطبقات، يصدر تقارير Markdown/JSON/YAML، ويوفّر واجهة FastAPI محلية مع تقدّم عبر SSE.',
        outcome:
          'يستطيع المعماريون الإجابة "من يستدعي هذا الـ API؟" و "ما غير المستخدم؟" خلال ثوانٍ، مع تقارير قابلة للمشاركة عبر روابط hash وتصدير قابل للتكرار لكل مهمة.',
      },
    },
    {
      title: 'iDaara',
      description:
        'نظام ERP متعدد المستأجرين وشامل يغطي المبيعات والمشتريات والمخزون/WMS والمحاسبة وCRM والموارد البشرية والتوظيف والمشاريع والدعم وPOS ومنشئ المواقع والتحفيز والأتمتة وإدارة المنصة.',
      technologies: ['Angular 19', '.NET 10', 'EF Core', 'MediatR', 'PostgreSQL', 'Flutter', 'Stripe'],
      category: 'fullstack',
      illustration: 'erp',
      github: 'https://github.com/AbdulrahmanAbdulqawi/iDaara',
      repoNote: 'اطلع على AGENTS.md و docs/SETUP.md لخريطة الوحدات والاختبارات وخطوات التشغيل.',
      caseStudy: {
        context:
          'تحتاج الشركات الصغيرة والمتوسطة إلى نظام ERP متكامل (مبيعات، مخزون، محاسبة، موارد بشرية، CRM، POS، منشئ مواقع) بتقنيات حديثة، تعدد لغات يشمل RTL، ومرونة للتخصيص الإقليمي.',
        contribution:
          'تصميم معمارية متعددة المستأجرين بـ Angular 19 و .NET 10، تنفيذ CQRS عبر MediatR في 17 وحدة، إضافة التحفيز ومنشئ المواقع وفوترة Stripe وتطبيق Flutter للهاتف و488 اختبار xUnit، وكتابة قواعد .cursor لتلتزم وكلاء الذكاء الاصطناعي بالأعراف.',
        outcome:
          'منصة ERP موحدة تتشارك فيها الوحدات نفس المصادقة والصلاحيات والأتمتة والتدقيق وقناة الاستيراد/التصدير، مع انضباط الاختبار والأدوات لمواصلة التطوير بأمان.',
      },
    },
    {
      title: 'RefugeeHub',
      description:
        'منصة ربط للاجئين في هولندا باستخدام Angular و ASP.NET Core و PostgreSQL، مع دردشة SignalR، مجموعات مجتمعية، فعاليات، وظائف، موارد للمنظمات، إرشاد، وتحفيز.',
      technologies: ['Angular 18', '.NET 8', 'PostgreSQL', 'SignalR', 'Docker'],
      category: 'fullstack',
      illustration: 'refugee',
      github: 'https://github.com/AbdulrahmanAbdulqawi/RefugeeHub',
      caseStudy: {
        context:
          'يواجه اللاجئون عند وصولهم إلى هولندا صعوبة في إيجاد بعضهم البعض والمنظمات والوظائف والمرشدين عبر خدمات متفرقة وبلغات مختلفة.',
        contribution:
          'بناء عميل Angular 18 مع Material و NgRx و API بـ ASP.NET Core 8 و PostgreSQL و JWT و دردشة SignalR وفعاليات مع RSVP وقوائم وظائف ودليل منظمات وإقران إرشاد ومشاركة محفزة، وحاويات Docker لتشغيل كامل المنظومة بأمر واحد.',
        outcome:
          'منصة موحدة يجد فيها اللاجئون والمتطوعون والمنظمات بعضهم البعض ويتفاعلون، مع دردشة لحظية وتحفيز يبقي المجتمع نشطاً لا مجرد قارئ.',
      },
    },
    {
      title: 'TicketHub',
      description:
        'منصة تذاكر متعددة الخدمات مع تنسيق Aspire، طبقات API والخادم، مشاريع النطاق والبيانات والأعمال، عامل خلفي، اختبارات، وعميل Angular.',
      technologies: ['.NET 9', 'Aspire', 'Angular', 'ASP.NET Core', 'Worker Services'],
      category: 'fullstack',
      illustration: 'ticket',
      github: 'https://github.com/AbdulrahmanAbdulqawi/TicketHub',
      caseStudy: {
        context:
          'يحتاج منتج التذاكر إلى فصل واضح بين الـ API ومنطق النطاق والتخزين والمهام الخلفية وتطبيق العميل، مع وسيلة لتنسيق الأجزاء محلياً وفي الإنتاج.',
        contribution:
          'تقسيم النظام إلى TicketHub.AppHost (.NET Aspire) وServer و Domain و Data و Business و Worker و Tests وعميل Angular، وربط Docker وإعدادات NuGet لإقلاع المنصة كاملة معاً.',
        outcome:
          'تعطي لوحة Aspire رؤية موحدة لكل خدمة، ويتولى العامل التدفقات البطيئة بشكل غير متزامن، ويمكن استبدال أو توسيع أي طبقة دون المساس بالباقي.',
      },
    },
    {
      title: 'YemeniCommunity',
      description:
        'منتدى للجالية اليمنية بثلاث لغات العربية والهولندية والإنجليزية، مع معمارية نظيفة، مكونات Angular مستقلة، إدارة محمية بـ JWT، أندية وفعاليات وأخبار وصفحات، رفع وسائط، RTL، وتفضيلات وصول.',
      technologies: ['Angular 21', '.NET 8', 'Minimal APIs', 'EF Core', 'PostgreSQL', 'JWT'],
      category: 'fullstack',
      image: '/projects/yemenicommunity.svg',
      illustration: 'community',
      github: 'https://github.com/AbdulrahmanAbdulqawi/YemeniCommunity',
      repoNote: 'يحتوي APPLICATION_STUDY.md على دراسة المعمارية والميزات بالكامل.',
      caseStudy: {
        context:
          'احتاجت الجالية اليمنية في هولندا إلى منزل رسمي على الإنترنت بمحتوى (أندية وفعاليات وأخبار وصفحات ثابتة) قابل للتحرير من غير المطورين، يخدم القراء بالعربية والهولندية والإنجليزية بما في ذلك RTL.',
        contribution:
          'بناء خلفية .NET 8 بمعمارية نظيفة (API ← Application ← Domain ← Infrastructure)، وواجهة Angular 21 بمكونات مستقلة، وإدارة محمية بـ JWT للأندية والفعاليات والأخبار والصفحات مع رفع وسائط (10 ميجابايت صور/فيديو)، وبيانات أولية للأندية، ونموذج صفحة بمفتاح+لغة، وتفضيلات مظهر (المظهر، اللون المميز، الخط، الحركة المخففة، التباين العالي).',
        outcome:
          'يدير المشرفون المحتوى بلغتهم دون لمس الكود، ويحصل القراء على موقع سريع ومتاح بلغتهم مع دعم RTL، مع معمارية تترك مجالاً لإضافة منتديات أو عضوية لاحقاً.',
      },
    },
    {
      title: 'نماذج شبكات عصبية (أطروحة)',
      description:
        'عمل أطروحة بـ Python لتجارب وبناء نماذج تعلم آلي أبسط وأسهل تفسيراً مقارنةً بالصناديق السوداء التقليدية.',
      technologies: ['Python', 'Deep Learning', 'Neural Networks'],
      category: 'fullstack',
      illustration: 'neural',
    },
    {
      title: 'تطبيق تسجيل الموظفين',
      description:
        'حل لتسجيل الموظفين باستخدام ASP.NET Core و Azure مع خط CI/CD، يوضح التسليم الشامل وممارسات النشر السحابي.',
      technologies: ['ASP.NET Core', 'Azure', 'CI/CD', 'SQL'],
      category: 'fullstack',
      illustration: 'cloudPipeline',
      repoNote: 'اطلع على README ثم مجلدات الـ API والنشر في المستودع لفهم التدفق الكامل.',
      caseStudy: {
        context:
          'مؤسسات تحتاج تسجيلاً موثوقاً للموظفين مع بيانات قابلة للتتبع وبيئات تتوسع من التطوير إلى الإنتاج دون تسليم يدوي متكرر.',
        contribution:
          'تصميم وتنفيذ خدمات ASP.NET Core، تكامل Azure للاستضافة، وربط خط CI/CD ليكون البناء والنشر قابلاً للتكرار.',
        outcome:
          'مسار أوضح من الالتزام إلى واجهة API منشورة، وتقليل مفاجآت النشر، وقالب يمكن توسيعه لأدوات داخلية مشابهة.',
      },
    },
    {
      title: 'موقع مساعد الطالب',
      description:
        'مبني على منصة Wix مع HTML و CSS و JavaScript كمحاولة أولى لإطلاق عمل—يدمج دعم الطلاب في الخارج مع تعلم إدارة المشاريع والقيادة وريادة الأعمال.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Wix'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'لعبة باكمان',
      description:
        'لعبة على نمط باكمان طُورت بالكامل من الصفر دون محرك ألعاب جاهز أو مكتبات ألعاب خارجية، باستخدام WPF وتصميم كائني التوجه قوي.',
      technologies: ['C#', 'WPF', 'XAML'],
      category: 'desktop',
      illustration: 'arcadeGame',
    },
    {
      title: 'تطبيق متجر التبغ',
      description:
        'تطبيق متعدد الواجهات يشمل كونسول و WPF سطح مكتب وويب ASP وطبقة API بـ ASP.NET Core لممارسة الهندسة الطبقات ومبادئ هندسة البرمجيات عبر C# و Java.',
      technologies: ['C#', 'Java', 'WPF', 'ASP.NET', 'API'],
      category: 'fullstack',
      illustration: 'multiLayerApp',
      repoNote: 'يوضح README هيكل الحل؛ كل واجهة (كونسول، سطح مكتب، ويب، API) تطابق مشروعاً أو مجلداً منفصلاً.',
      caseStudy: {
        context:
          'تمرين منظم لمحاكاة تدفقات قريبة من مخزون حقيقي عبر عدة عملاء مع الحفاظ على منطق النطاق متسقاً.',
        contribution:
          'تنفيذ واجهات و API منفصلة بـ C# و Java، ممارسة اتجاه الاعتماديات بين الطبقات، ومواءمة المفاهيم المشتركة بين المكدسات.',
        outcome:
          'إحساس أوضح بمكان حدود الطبقات، وكيفية اختبارها بمعزل، وكيف يتصرف النطاق نفسه على سطح المكتب مقابل الويب مقابل الـ API.',
      },
    },
    {
      title: 'Yemeni Driver',
      description:
        'مشروع ويب باستخدام ASP.NET Core و C# و HTML و CSS و JavaScript لدعم حالة استخدام عملية في مجال السائق اليمني.',
      technologies: ['ASP.NET Core', 'C#', 'HTML', 'CSS', 'JavaScript'],
      category: 'web',
      illustration: 'educationWeb',
    },
    {
      title: 'Connect SAPiers',
      description:
        'مشروع بأسلوب فعاليات يركز على العصف الذهني والنماذج الأولية لأفكار جديدة ضمن مبادرة Connect SAPiers.',
      technologies: ['Prototyping', 'Workshop', 'SAP community'],
      category: 'fullstack',
      illustration: 'prototypeIdeas',
    },
  ],
};
