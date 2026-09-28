import type { Project } from '../types';

const gh = 'https://github.com/AbdulrahmanAbdulqawi/';

/**
 * The full project index, shown under the four case studies on the Work page.
 *
 * `status: 'private'` carries no url on purpose: those are closed source, and the whole point
 * of this table is that a project can be listed without pretending there is somewhere to click.
 * The API drops the url on a private row too, so the invariant holds from both ends.
 *
 * Descriptions are empty where there was no source to write one from. They are filled in from
 * the admin panel rather than guessed at here.
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
    { name: 'TicketHub', description: '', stackLine: '', year: '', url: '', status: 'private', featured: true },
    { name: 'YemeniCommunity', description: '', stackLine: '', year: '', url: '', status: 'private', featured: true },
    { name: 'RefugeeHub', description: '', stackLine: '', year: '', url: '', status: 'private', featured: true },
    { name: 'Daar', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'AIModel', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'Roadmap', description: '', stackLine: '', year: '2026', url: gh + 'roadmap', status: 'live', featured: false },
    { name: 'proex.bh', description: '', stackLine: '', year: '2026', url: gh + 'proex.bh', status: 'live', featured: false },
    { name: 'Connect SAPiers', description: '', stackLine: '.NET · Angular', year: '2024', url: gh + 'C2S', status: 'archived', featured: false },
    { name: 'Yemeni Driver', description: '', stackLine: '.NET · Angular', year: '2024', url: gh + 'Yemeni-Driver', status: 'archived', featured: false },
    { name: 'Tobacco Shop', description: '', stackLine: 'C#', year: '2024', url: gh + 'Appliactions', status: 'archived', featured: false },
    { name: 'Pacman (WPF)', description: '', stackLine: 'C# · WPF', year: '2021', url: gh + 'Games', status: 'archived', featured: false },
    { name: 'Employee Registration', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
    { name: 'Neural Network Models', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
    { name: 'Student Helper', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
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
    { name: 'TicketHub', description: '', stackLine: '', year: '', url: '', status: 'private', featured: true },
    { name: 'YemeniCommunity', description: '', stackLine: '', year: '', url: '', status: 'private', featured: true },
    { name: 'RefugeeHub', description: '', stackLine: '', year: '', url: '', status: 'private', featured: true },
    { name: 'دار', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'AIModel', description: '', stackLine: '', year: '', url: '', status: 'private', featured: false },
    { name: 'خارطة الطريق', description: '', stackLine: '', year: '٢٠٢٦', url: gh + 'roadmap', status: 'live', featured: false },
    { name: 'proex.bh', description: '', stackLine: '', year: '٢٠٢٦', url: gh + 'proex.bh', status: 'live', featured: false },
    { name: 'Connect SAPiers', description: '', stackLine: '.NET · Angular', year: '٢٠٢٤', url: gh + 'C2S', status: 'archived', featured: false },
    { name: 'Yemeni Driver', description: '', stackLine: '.NET · Angular', year: '٢٠٢٤', url: gh + 'Yemeni-Driver', status: 'archived', featured: false },
    { name: 'تطبيق متجر التبغ', description: '', stackLine: 'C#', year: '٢٠٢٤', url: gh + 'Appliactions', status: 'archived', featured: false },
    { name: 'لعبة باكمان', description: '', stackLine: 'C# · WPF', year: '٢٠٢١', url: gh + 'Games', status: 'archived', featured: false },
    { name: 'تطبيق تسجيل الموظفين', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
    { name: 'نماذج شبكات عصبية', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
    { name: 'موقع مساعد الطالب', description: '', stackLine: '', year: '', url: '', status: 'archived', featured: false },
  ],
};
