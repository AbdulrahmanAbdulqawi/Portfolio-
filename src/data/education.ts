import type { EducationEntry } from '../types';

export const educationEntries: Record<'en' | 'ar', EducationEntry[]> = {
  en: [
    {
      school: 'Radboud University',
      location: 'Nijmegen',
      degree: 'Dutch Language Course',
      period: 'Sep, 2023 - Jan, 2024',
    },
    {
      school: 'University of Obuda',
      location: 'Hungary, Budapest',
      degree: 'BSc of Computer Science and Engineering',
      period: 'Sep, 2017 - Feb, 2022',
    },
  ],
  ar: [
    {
      school: 'جامعة رادبود',
      location: 'نايميخن',
      degree: 'دورة اللغة الهولندية',
      period: 'سبتمبر ٢٠٢٣ - يناير ٢٠٢٤',
    },
    {
      school: 'جامعة أوبودا',
      location: 'المجر، بودابست',
      degree: 'بكالوريوس علوم الحاسوب والهندسة',
      period: 'سبتمبر ٢٠١٧ - فبراير ٢٠٢٢',
    },
  ],
};

export const certifications: Record<'en' | 'ar', string[]> = {
  en: [
    'Neural Networks and CNN Essential Training',
    'Artificial Intelligence Foundations',
    'C# Advanced Course',
    'Database and SQL Courses',
    'Microsoft Windows Server 2016',
    'CCNA Training',
  ],
  ar: [
    'تدريب أساسيات الشبكات العصبية و CNN',
    'أسس الذكاء الاصطناعي',
    'دورة C# المتقدمة',
    'دورات قواعد البيانات و SQL',
    'Microsoft Windows Server 2016',
    'تدريب CCNA',
  ],
};
