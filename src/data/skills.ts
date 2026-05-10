import type { SkillCategory } from '../types';

export const skillCategories: Record<'en' | 'ar', SkillCategory[]> = {
  en: [
    {
      title: 'Programming & web',
      icon: 'Code',
      skills: [
        { name: '.NET (C#, ASP.NET, WPF, Web API)', level: 'Expert' },
        { name: 'Angular & TypeScript', level: 'Solid' },
        { name: 'HTML, CSS, JavaScript, Razor', level: 'Solid' },
        { name: 'Java', level: 'Solid' },
        { name: 'Python (ML / research)', level: 'Solid' },
      ],
    },
    {
      title: 'Databases',
      icon: 'Database',
      skills: [
        { name: 'SQL (MySQL, SQL Server, PostgreSQL)', level: 'Expert' },
        { name: 'Oracle', level: 'Solid' },
        { name: 'CouchDB', level: 'Solid' },
      ],
    },
    {
      title: 'Cloud, DevOps & platforms',
      icon: 'Server',
      skills: [
        { name: 'Microsoft Azure & AWS', level: 'Solid' },
        { name: 'OpenNebula', level: 'Solid' },
        { name: 'CI/CD pipelines (TeamCity, Jenkins, GitLab)', level: 'Solid' },
        { name: 'DevOps & Agile practices', level: 'Solid' },
      ],
    },
    {
      title: 'Networking, OS & collaboration',
      icon: 'Code',
      skills: [
        { name: 'Cisco CCNA; VPN, VLAN, DHCP, TCP/IP, SNMP', level: 'Solid' },
        { name: 'Packet Tracer, Wireshark, GNS3', level: 'Solid' },
        { name: 'Windows & Linux (desktop / server)', level: 'Solid' },
        { name: 'TargetProcess, GitHub, GitLab, Bitbucket, Scrum', level: 'Expert' },
      ],
    },
    {
      title: 'Tooling',
      icon: 'Code',
      skills: [
        { name: 'Visual Studio, JetBrains IDEs, PyCharm', level: 'Expert' },
        { name: 'Jupyter & Google Colab', level: 'Solid' },
      ],
    },
  ],
  ar: [
    {
      title: 'البرمجة والويب',
      icon: 'Code',
      skills: [
        { name: '.NET (C#، ASP.NET، WPF، Web API)', level: 'Expert' },
        { name: 'Angular و TypeScript', level: 'Solid' },
        { name: 'HTML و CSS و JavaScript و Razor', level: 'Solid' },
        { name: 'Java', level: 'Solid' },
        { name: 'Python (تعلم آلي / بحث)', level: 'Solid' },
      ],
    },
    {
      title: 'قواعد البيانات',
      icon: 'Database',
      skills: [
        { name: 'SQL (MySQL، SQL Server، PostgreSQL)', level: 'Expert' },
        { name: 'Oracle', level: 'Solid' },
        { name: 'CouchDB', level: 'Solid' },
      ],
    },
    {
      title: 'السحابة و DevOps والمنصات',
      icon: 'Server',
      skills: [
        { name: 'Microsoft Azure و AWS', level: 'Solid' },
        { name: 'OpenNebula', level: 'Solid' },
        { name: 'أنابيب CI/CD (TeamCity، Jenkins، GitLab)', level: 'Solid' },
        { name: 'DevOps وممارسات أجايل', level: 'Solid' },
      ],
    },
    {
      title: 'الشبكات وأنظمة التشغيل والتعاون',
      icon: 'Code',
      skills: [
        { name: 'Cisco CCNA؛ VPN، VLAN، DHCP، TCP/IP، SNMP', level: 'Solid' },
        { name: 'Packet Tracer و Wireshark و GNS3', level: 'Solid' },
        { name: 'Windows و Linux (سطح المكتب / الخادم)', level: 'Solid' },
        { name: 'TargetProcess و GitHub و GitLab و Bitbucket و Scrum', level: 'Expert' },
      ],
    },
    {
      title: 'الأدوات',
      icon: 'Code',
      skills: [
        { name: 'Visual Studio و JetBrains و PyCharm', level: 'Expert' },
        { name: 'Jupyter و Google Colab', level: 'Solid' },
      ],
    },
  ],
};
