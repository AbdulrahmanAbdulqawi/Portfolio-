import { useState, useEffect } from 'react';

/** Matches Tailwind sm breakpoint: viewport width < 640px */
const MOBILE_MEDIA = '(max-width: 639px)';

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MEDIA).matches : false
  );

  useEffect(() => {
    const m = window.matchMedia(MOBILE_MEDIA);
    setIsMobile(m.matches);
    const listener = () => setIsMobile(m.matches);
    m.addEventListener('change', listener);
    return () => m.removeEventListener('change', listener);
  }, []);

  return isMobile;
}
