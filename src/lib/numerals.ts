const ARABIC_INDIC = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * The Arabic side of the site writes numbers in Arabic-Indic digits (٠١ rather than 01), so any
 * count rendered into Arabic copy has to be converted or it reads as a mix of two scripts.
 * Latin digits are returned unchanged for English.
 */
export function localizeDigits(value: string | number, lang: 'en' | 'ar'): string {
  const text = String(value);
  if (lang !== 'ar') return text;
  return text.replace(/[0-9]/g, (d) => ARABIC_INDIC[Number(d)]);
}
