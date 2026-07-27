import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const CHAR_INTERVAL_MS = 65;
const HOLD_TICKS = 26;

interface TypingLineProps {
  prompts: string[];
  dollarColor?: string;
  caretColor?: string;
  textColor?: string;
}

export function TypingLine({ prompts, dollarColor = 'var(--accent)', caretColor = 'var(--accent)', textColor }: TypingLineProps) {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [text, setText] = useState(reduce ? prompts[prompts.length - 1] : '');

  useEffect(() => {
    if (reduce) {
      setText(prompts[prompts.length - 1] ?? '');
      return;
    }

    let promptIndex = 0;
    let charIndex = 0;
    let hold = 0;

    const timer = window.setInterval(() => {
      const target = prompts[promptIndex];
      if (hold > 0) {
        hold -= 1;
        if (hold === 0) {
          charIndex = 0;
          promptIndex = (promptIndex + 1) % prompts.length;
          setText('');
        }
        return;
      }
      charIndex += 1;
      setText(target.slice(0, charIndex));
      if (charIndex >= target.length) hold = HOLD_TICKS;
    }, CHAR_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [prompts, reduce]);

  return (
    <span dir="ltr" style={{ color: textColor }}>
      <span style={{ color: dollarColor }}>$</span> {text}
      <span
        className="ldg-caret inline-block align-[-3px]"
        style={{ width: 9, height: 16, background: caretColor }}
      />
    </span>
  );
}
