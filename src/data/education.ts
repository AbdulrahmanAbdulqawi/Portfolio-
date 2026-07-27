import type { EducationEntry } from '../types';

export const educationEntries: Record<'en' | 'ar', EducationEntry[]> = {
  en: [
    {
      school: 'University of Óbuda',
      degree: 'B.Sc. Computer Science & Engineering',
      location: 'Budapest, Hungary',
      period: '2017—22',
    },
    {
      school: 'Radboud University',
      degree: 'Dutch Language Course',
      location: 'Nijmegen, Netherlands',
      period: '2023—24',
    },
    {
      school: 'Alnahda School',
      degree: 'High school certificate',
      location: 'Ibb, Yemen',
      period: '2013—16',
    },
  ],
  ar: [
    {
      school: 'جامعة أوبودا',
      degree: 'بكالوريوس هندسة وعلوم الحاسوب',
      location: 'بودابست، المجر',
      period: '٢٠١٧—٢٢',
    },
    {
      school: 'جامعة رادبود',
      degree: 'دورة اللغة الهولندية',
      location: 'نيميخن، هولندا',
      period: '٢٠٢٣—٢٤',
    },
    {
      school: 'مدرسة النهضة',
      degree: 'شهادة الثانوية العامة',
      location: 'إب، اليمن',
      period: '٢٠١٣—١٦',
    },
  ],
};

export const certifications: Record<'en' | 'ar', string[]> = {
  en: [
    'Yemeni Government Scholarship Holder — Yemeni Government, 2018',
    'Stipendium Hungaricum scholarship holder — Tempus Public Foundation, 2017',
    'C# Intermediate & Advanced — Udemy',
    'Database and SQL courses — Udemy',
    'Neural Networks and CNN Essential Training — LinkedIn',
    'Artificial Intelligence Foundations: Neural Networks — LinkedIn',
    'HTML and CSS — Udemy',
    'Microsoft Windows Server 2016 — Udemy',
    'CCNA Training Course — Cisco',
    'NUnit, Entity Framework .NET, LINQ Fundamentals — Pluralsight',
    'Achieving an Agile Mindset with ICAgile — Pluralsight',
    'Introduction to Microsoft Orleans — Pluralsight',
    '.NET Testing with NUnit 3 — Pluralsight',
    'Agile Software Development: Extreme Programming — LinkedIn',
    'C# 10: The Big Picture & Performance Playbook — Pluralsight',
  ],
  ar: [
    'منحة حكومة اليمن — حكومة اليمن، ٢٠١٨',
    'منحة Stipendium Hungaricum — مؤسسة Tempus Public، ٢٠١٧',
    'C# متوسط ومتقدم — Udemy',
    'قواعد البيانات و SQL — Udemy',
    'التدريب الأساسي للشبكات العصبية و CNN — LinkedIn',
    'أساسيات الذكاء الاصطناعي: الشبكات العصبية — LinkedIn',
    'HTML و CSS — Udemy',
    'Microsoft Windows Server 2016 — Udemy',
    'دورة تدريب CCNA — Cisco',
    'NUnit و Entity Framework و LINQ — Pluralsight',
    'عقلية أجايل مع ICAgile — Pluralsight',
    'مقدمة إلى Microsoft Orleans — Pluralsight',
    'اختبار .NET مع NUnit 3 — Pluralsight',
    'تطوير البرمجيات الأجايل: البرمجة المتطرفة — LinkedIn',
    'C# 10: الصورة الكبيرة ودليل الأداء — Pluralsight',
  ],
};
