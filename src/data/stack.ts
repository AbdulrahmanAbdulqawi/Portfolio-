import type { StackGroup } from '../types';

export const stackGroups: Record<'en' | 'ar', StackGroup[]> = {
  en: [
    {
      title: 'Languages & frameworks',
      skills: [
        { name: '.NET — C#, ASP.NET, Web API, WPF', level: 'Daily' },
        { name: 'Angular & TypeScript', level: 'Daily' },
        { name: 'HTML, CSS, JavaScript, Razor', level: 'Solid' },
        { name: 'Java', level: 'Solid' },
        { name: 'Python — ML & research', level: 'Solid' },
      ],
    },
    {
      title: 'Data',
      skills: [
        { name: 'SQL — MySQL, SQL Server, PostgreSQL', level: 'Daily' },
        { name: 'Entity Framework Core', level: 'Daily' },
        { name: 'Oracle', level: 'Solid' },
        { name: 'CouchDB', level: 'Solid' },
      ],
    },
    {
      title: 'Cloud, DevOps & platforms',
      skills: [
        { name: 'Microsoft Azure & AWS', level: 'Solid' },
        { name: 'CI/CD — TeamCity, Jenkins, GitLab', level: 'Solid' },
        { name: 'Docker & .NET Aspire', level: 'Daily' },
        { name: 'OpenNebula', level: 'Familiar' },
      ],
    },
    {
      title: 'Ways of working',
      skills: [
        { name: 'Scrum — TargetProcess, GitHub, GitLab', level: 'Daily' },
        { name: 'Testing — xUnit, NUnit, integration suites', level: 'Daily' },
        { name: 'Networking — Cisco CCNA, VPN, VLAN, TCP/IP', level: 'Solid' },
        { name: 'Windows & Linux, desktop and server', level: 'Solid' },
      ],
    },
  ],
  ar: [
    {
      title: 'اللغات وأطر العمل',
      skills: [
        { name: '.NET — C#، ASP.NET، Web API، WPF', level: 'Daily' },
        { name: 'Angular و TypeScript', level: 'Daily' },
        { name: 'HTML و CSS و JavaScript و Razor', level: 'Solid' },
        { name: 'Java', level: 'Solid' },
        { name: 'Python — تعلّم آلي وبحث', level: 'Solid' },
      ],
    },
    {
      title: 'البيانات',
      skills: [
        { name: 'SQL — MySQL، SQL Server، PostgreSQL', level: 'Daily' },
        { name: 'Entity Framework Core', level: 'Daily' },
        { name: 'Oracle', level: 'Solid' },
        { name: 'CouchDB', level: 'Solid' },
      ],
    },
    {
      title: 'السحابة و DevOps والمنصات',
      skills: [
        { name: 'Microsoft Azure و AWS', level: 'Solid' },
        { name: 'CI/CD — TeamCity، Jenkins، GitLab', level: 'Solid' },
        { name: 'Docker و .NET Aspire', level: 'Daily' },
        { name: 'OpenNebula', level: 'Familiar' },
      ],
    },
    {
      title: 'أساليب العمل',
      skills: [
        { name: 'Scrum — TargetProcess، GitHub، GitLab', level: 'Daily' },
        { name: 'الاختبارات — xUnit و NUnit والتكامل', level: 'Daily' },
        { name: 'الشبكات — Cisco CCNA، VPN، VLAN، TCP/IP', level: 'Solid' },
        { name: 'Windows و Linux — سطح مكتب وخادم', level: 'Solid' },
      ],
    },
  ],
};
