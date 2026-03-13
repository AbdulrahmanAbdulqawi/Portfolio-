import { useEffect } from 'react';

export function useSwipeBack(onBack: () => void, enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    let startX = 0;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      if (!e.changedTouches?.length) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (startX < window.innerWidth * 0.25 && dx > 60) onBack();
    };
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onStart);
      document.removeEventListener('touchend', onEnd);
    };
  }, [enabled, onBack]);
}
