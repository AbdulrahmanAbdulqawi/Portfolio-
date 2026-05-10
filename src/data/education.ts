import type { EducationEntry } from '../types';

export const educationEntries: Record<'en' | 'ar', EducationEntry[]> = {
  en: [
    {
      school: 'University of Óbuda',
      degree: 'B.Sc. Computer Science and Engineering',
      location: 'Budapest, Hungary',
      period: 'Sep 2017 – Feb 2022',
    },
    {
      school: 'Radboud University',
      degree: 'Dutch Language Course',
      location: 'Nijmegen, Netherlands',
      period: 'Sep 2023 – Jan 2024',
    },
    {
      school: 'Alnahda School',
      degree: 'High school certificate',
      location: 'Ibb, Yemen',
      period: '2013 – 2016',
    },
  ],
  ar: [
    {
      school: 'جامعة أوبودا',
      degree: 'بكالوريوس هندسة وعلوم الحاسوب',
      location: 'بودابست، المجر',
      period: 'سبتمبر 2017 – فبراير 2022',
    },
    {
      school: 'جامعة رادبود',
      degree: 'دورة في اللغة الهولندية',
      location: 'نيميخن، هولندا',
      period: 'سبتمبر 2023 – يناير 2024',
    },
    {
      school: 'مدرسة النهضة',
      degree: 'شهادة الثانوية العامة',
      location: 'إب، اليمن',
      period: '2013 – 2016',
    },
  ],
};

export const certifications: Record<'en' | 'ar', string[]> = {
  en: [
    'Yemeni Government Scholarship Holder — Yemeni Government (Jun 2018)',
    'Stipendium Hungaricum scholarship holder — Tempus Public Foundation (Aug 2017)',
    'C# Intermediate & Advanced (Udemy, with certificates)',
    'Database and SQL courses (Udemy, with certificates)',
    'Neural Networks and Convolutional Neural Networks Essential Training (LinkedIn)',
    'Artificial Intelligence Foundations: Neural Networks (LinkedIn)',
    'HTML and CSS (Udemy, with certificate)',
    'Microsoft Windows Server 2016 (Udemy)',
    'CCNA Training Course (Cisco)',
    'NUnit, Entity Framework .NET, LINQ Fundamentals (Pluralsight)',
    'Achieving an Agile Mindset with ICAgile (Pluralsight)',
    'Introduction to Microsoft Orleans; .NET Testing with NUnit 3 (Pluralsight)',
    'Agile Software Development: Extreme Programming (LinkedIn)',
    'Learning Cloud Computing: The Cloud and DevOps (LinkedIn)',
    'C# 10: The Big Picture; C# 10 Performance Playbook (Pluralsight)',
  ],
  ar: [
    'منحة حكومة اليمن — حكومة اليمن (يونيو 2018)',
    'منحة Stipendium Hungaricum — مؤسسة Tempus Public (أغسطس 2017)',
    'C# متوسط ومتقدم (Udemy، مع شهادات)',
    'قواعد البيانات و SQL (Udemy، مع شهادات)',
    'التدريب الأساسي للشبكات العصبية والتجميعية (LinkedIn)',
    'أساسيات الذكاء الاصطناعي: الشبكات العصبية (LinkedIn)',
    'HTML و CSS (Udemy، مع شهادة)',
    'Microsoft Windows Server 2016 (Udemy)',
    'دورة تدريب CCNA (Cisco)',
    'NUnit و Entity Framework و LINQ (Pluralsight)',
    'عقلية أجايل مع ICAgile (Pluralsight)',
    'مقدمة Microsoft Orleans؛ اختبار .NET مع NUnit 3 (Pluralsight)',
    'تطوير البرمجيات الأجايل: البرمجة المتطرفة (LinkedIn)',
    'تعلم الحوسبة السحابية والسحابة و DevOps (LinkedIn)',
    'C# 10: الصورة الكبيرة؛ C# 10 دليل الأداء (Pluralsight)',
  ],
};
