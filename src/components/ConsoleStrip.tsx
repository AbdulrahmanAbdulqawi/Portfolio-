import { useLang } from '../context/LanguageContext';
import { t } from '../data/translations';
import { consolePrompts, consoleStatic } from '../data/console';
import { TypingLine } from './TypingLine';

export function ConsoleStrip() {
  const { lang } = useLang();
  const tr = t(lang).console;

  return (
    <section className="border border-t-0 border-[var(--rule)] bg-[var(--panel)]">
      <div className="flex items-center gap-2 border-b border-[var(--rule)] px-4 py-[11px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[var(--dot)]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[var(--dot)]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[var(--dot)]" />
        <span className="ms-2 font-mono text-[11px] tracking-[0.1em] text-[var(--ink-3)]">{tr.hint}</span>
      </div>
      <div dir="ltr" className="overflow-x-auto px-5 pb-6 pt-5 font-mono text-sm leading-[2] text-[var(--ink-2)] text-left">
        <div>
          <span className="text-[var(--accent)]">$</span> whoami
        </div>
        <div className="text-[var(--ink)]">{consoleStatic.whoamiOutput}</div>
        <div>
          <span className="text-[var(--accent)]">$</span> ls ./work --sort=impact
        </div>
        <div className="text-[var(--ink)]">{consoleStatic.lsOutput}</div>
        <div>
          <TypingLine prompts={consolePrompts} />
        </div>
      </div>
    </section>
  );
}
