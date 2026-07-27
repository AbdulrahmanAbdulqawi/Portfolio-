interface BilingualFieldProps {
  label: string;
  en: string;
  ar: string;
  onChangeEn: (value: string) => void;
  onChangeAr: (value: string) => void;
  multiline?: boolean;
  rows?: number;
}

const fieldClass = 'w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]';

export function BilingualField({ label, en, ar, onChangeEn, onChangeAr, multiline, rows = 3 }: BilingualFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">{label}</label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-[var(--ink-3)]">EN</span>
          {multiline ? (
            <textarea rows={rows} value={en} onChange={(e) => onChangeEn(e.target.value)} className={fieldClass} />
          ) : (
            <input type="text" value={en} onChange={(e) => onChangeEn(e.target.value)} className={fieldClass} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-[var(--ink-3)]">AR</span>
          {multiline ? (
            <textarea dir="rtl" rows={rows} value={ar} onChange={(e) => onChangeAr(e.target.value)} className={fieldClass} />
          ) : (
            <input dir="rtl" type="text" value={ar} onChange={(e) => onChangeAr(e.target.value)} className={fieldClass} />
          )}
        </div>
      </div>
    </div>
  );
}
