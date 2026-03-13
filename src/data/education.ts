import type { EducationEntry } from '../types';

export const educationEntries: Record<'en' | 'ar', EducationEntry[]> = {
  en: [
    { school: 'Utrecht University', degree: 'B.Sc. Computer Science', location: 'Utrecht, Netherlands', period: '2016 – 2020' },
    { school: 'HBO ICT (Higher Professional Education)', degree: 'Associate degree, Software Development', location: 'Netherlands', period: '2014 – 2016' },
  ],
  ar: [
    { school: 'جامعة أوترخت', degree: 'بكالوريوس علوم الحاسوب', location: 'أوترخت، هولندا', period: '2016 – 2020' },
    { school: 'HBO ICT (تعليم عالي مهني)', degree: 'دبلوم، تطوير البرمجيات', location: 'هولندا', period: '2014 – 2016' },
  ],
};

export const certifications: Record<'en' | 'ar', string[]> = {
  en: [
    'Microsoft Certified: Azure Fundamentals (AZ-900)',
    'Microsoft Certified: .NET Fundamentals',
    'SQL Server Database Development (MTA)',
  ],
  ar: [
    'شهادة مايكروسوفت: أساسيات Azure (AZ-900)',
    'شهادة مايكروسوفت: أساسيات .NET',
    'تطوير قواعد بيانات SQL Server (MTA)',
  ],
};
