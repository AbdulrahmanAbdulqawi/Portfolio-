import { useEffect, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../lib/apiClient';
import { BilingualField } from '../shared/BilingualField';
import { ListEditor } from '../shared/ListEditor';
import { ImageUploadField } from '../shared/ImageUploadField';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';
import type { AlsoBuiltItem, WorkCase } from '../../../types';

interface StatRow {
  valueEn: string;
  valueAr: string;
  labelEn: string;
  labelAr: string;
}

interface LineRow {
  textEn: string;
  textAr: string;
  accent: boolean;
}

interface WorkCaseRow {
  numberEn: string;
  numberAr: string;
  name: string;
  stackLine: string;
  headlineEn: string;
  headlineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  repoUrl: string;
  panelKind: 'stats' | 'image' | 'terminal';
  stats: StatRow[];
  imageSrc: string;
  imageAltEn: string;
  imageAltAr: string;
  lines: LineRow[];
}

interface AlsoBuiltRow {
  nameEn: string;
  nameAr: string;
  url: string;
}

function toWorkRows(en: WorkCase[], ar: WorkCase[]): WorkCaseRow[] {
  return en.map((e, i) => {
    const a = ar[i];
    const row: WorkCaseRow = {
      numberEn: e.number,
      numberAr: a?.number ?? '',
      name: e.name,
      stackLine: e.stackLine,
      headlineEn: e.headline,
      headlineAr: a?.headline ?? '',
      descriptionEn: e.description,
      descriptionAr: a?.description ?? '',
      repoUrl: e.repoUrl,
      panelKind: e.panel.kind,
      stats: [],
      imageSrc: '',
      imageAltEn: '',
      imageAltAr: '',
      lines: [],
    };
    if (e.panel.kind === 'stats') {
      const aStats = a?.panel.kind === 'stats' ? a.panel.stats : [];
      row.stats = e.panel.stats.map((s, si) => ({ valueEn: s.value, labelEn: s.label, valueAr: aStats[si]?.value ?? '', labelAr: aStats[si]?.label ?? '' }));
    } else if (e.panel.kind === 'image') {
      row.imageSrc = e.panel.src;
      row.imageAltEn = e.panel.alt;
      row.imageAltAr = a?.panel.kind === 'image' ? a.panel.alt : '';
    } else if (e.panel.kind === 'terminal') {
      const aLines = a?.panel.kind === 'terminal' ? a.panel.lines : [];
      row.lines = e.panel.lines.map((l, li) => ({ textEn: l.text, textAr: aLines[li]?.text ?? '', accent: Boolean(l.accent) }));
    }
    return row;
  });
}

function toAlsoBuiltRows(en: AlsoBuiltItem[], ar: AlsoBuiltItem[]): AlsoBuiltRow[] {
  return en.map((e, i) => ({ nameEn: e.name, nameAr: ar[i]?.name ?? '', url: e.url }));
}

function buildPanel(row: WorkCaseRow, lang: 'en' | 'ar') {
  if (row.panelKind === 'stats') {
    return { kind: 'stats', stats: row.stats.map((s) => ({ value: lang === 'en' ? s.valueEn : s.valueAr, label: lang === 'en' ? s.labelEn : s.labelAr })) };
  }
  if (row.panelKind === 'image') {
    return { kind: 'image', src: row.imageSrc, alt: lang === 'en' ? row.imageAltEn : row.imageAltAr };
  }
  return { kind: 'terminal', lines: row.lines.map((l) => ({ text: lang === 'en' ? l.textEn : l.textAr, accent: l.accent || undefined })) };
}

const fieldClass = 'w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]';

export function WorkEditor() {
  const { content, refresh } = useContent();
  const { token } = useAuth();
  const [cases, setCases] = useState<WorkCaseRow[]>(() => toWorkRows(content.workCases.en, content.workCases.ar));
  const [alsoBuilt, setAlsoBuilt] = useState<AlsoBuiltRow[]>(() => toAlsoBuiltRows(content.alsoBuilt.en, content.alsoBuilt.ar));
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setCases(toWorkRows(content.workCases.en, content.workCases.ar));
  }, [content.workCases]);

  useEffect(() => {
    setAlsoBuilt(toAlsoBuiltRows(content.alsoBuilt.en, content.alsoBuilt.ar));
  }, [content.alsoBuilt]);

  const handleSave = async () => {
    setStatus('saving');
    try {
      await apiClient.put(
        '/api/work-cases',
        {
          en: cases.map((c) => ({ number: c.numberEn, name: c.name, stackLine: c.stackLine, headline: c.headlineEn, description: c.descriptionEn, repoUrl: c.repoUrl, panel: buildPanel(c, 'en') })),
          ar: cases.map((c) => ({ number: c.numberAr, name: c.name, stackLine: c.stackLine, headline: c.headlineAr, description: c.descriptionAr, repoUrl: c.repoUrl, panel: buildPanel(c, 'ar') })),
        },
        token,
      );
      await apiClient.put(
        '/api/also-built',
        {
          en: alsoBuilt.map((a) => ({ name: a.nameEn, url: a.url })),
          ar: alsoBuilt.map((a) => ({ name: a.nameAr, url: a.url })),
        },
        token,
      );
      await refresh();
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Work</h1>
      <ListEditor
        items={cases}
        onChange={setCases}
        addLabel="+ Add case"
        createItem={(): WorkCaseRow => ({
          numberEn: '', numberAr: '', name: '', stackLine: '', headlineEn: '', headlineAr: '', descriptionEn: '', descriptionAr: '', repoUrl: '',
          panelKind: 'stats', stats: [], imageSrc: '', imageAltEn: '', imageAltAr: '', lines: [],
        })}
        renderItem={(row, _i, update) => (
          <div className="flex flex-col gap-4">
            <BilingualField label="Number" en={row.numberEn} ar={row.numberAr} onChangeEn={(v) => update({ numberEn: v })} onChangeAr={(v) => update({ numberAr: v })} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Name (shared)</label>
                <input type="text" value={row.name} onChange={(e) => update({ name: e.target.value })} className={fieldClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Repository URL (shared)</label>
                <input type="url" value={row.repoUrl} onChange={(e) => update({ repoUrl: e.target.value })} className={fieldClass} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Stack line (shared)</label>
              <input type="text" value={row.stackLine} onChange={(e) => update({ stackLine: e.target.value })} className={fieldClass} />
            </div>
            <BilingualField label="Headline" en={row.headlineEn} ar={row.headlineAr} onChangeEn={(v) => update({ headlineEn: v })} onChangeAr={(v) => update({ headlineAr: v })} />
            <BilingualField label="Description" en={row.descriptionEn} ar={row.descriptionAr} multiline rows={4} onChangeEn={(v) => update({ descriptionEn: v })} onChangeAr={(v) => update({ descriptionAr: v })} />

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Side panel type</label>
              <select value={row.panelKind} onChange={(e) => update({ panelKind: e.target.value as WorkCaseRow['panelKind'] })} className={fieldClass}>
                <option value="stats">Stats grid</option>
                <option value="image">Image</option>
                <option value="terminal">Terminal output</option>
              </select>
            </div>

            {row.panelKind === 'stats' && (
              <ListEditor
                items={row.stats}
                onChange={(stats) => update({ stats })}
                addLabel="+ Add stat"
                createItem={() => ({ valueEn: '', valueAr: '', labelEn: '', labelAr: '' })}
                renderItem={(stat, _si, updateStat) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <BilingualField label="Value" en={stat.valueEn} ar={stat.valueAr} onChangeEn={(v) => updateStat({ valueEn: v })} onChangeAr={(v) => updateStat({ valueAr: v })} />
                    <BilingualField label="Label" en={stat.labelEn} ar={stat.labelAr} onChangeEn={(v) => updateStat({ labelEn: v })} onChangeAr={(v) => updateStat({ labelAr: v })} />
                  </div>
                )}
              />
            )}

            {row.panelKind === 'image' && (
              <div className="flex flex-col gap-4">
                <ImageUploadField label="Panel image (shared)" value={row.imageSrc} onChange={(url) => update({ imageSrc: url })} />
                <BilingualField label="Alt text" en={row.imageAltEn} ar={row.imageAltAr} onChangeEn={(v) => update({ imageAltEn: v })} onChangeAr={(v) => update({ imageAltAr: v })} />
              </div>
            )}

            {row.panelKind === 'terminal' && (
              <ListEditor
                items={row.lines}
                onChange={(lines) => update({ lines })}
                addLabel="+ Add line"
                createItem={() => ({ textEn: '', textAr: '', accent: false })}
                renderItem={(line, _li, updateLine) => (
                  <div className="flex flex-col gap-3">
                    <BilingualField label="Text" en={line.textEn} ar={line.textAr} onChangeEn={(v) => updateLine({ textEn: v })} onChangeAr={(v) => updateLine({ textAr: v })} />
                    <label className="flex items-center gap-2 font-mono text-xs text-[var(--ink-3)]">
                      <input type="checkbox" checked={line.accent} onChange={(e) => updateLine({ accent: e.target.checked })} />
                      Accent color (e.g. the `$ command` line)
                    </label>
                  </div>
                )}
              />
            )}
          </div>
        )}
      />

      <h2 className="mb-4 mt-10 text-xl font-bold">Also built</h2>
      <ListEditor
        items={alsoBuilt}
        onChange={setAlsoBuilt}
        addLabel="+ Add project"
        createItem={() => ({ nameEn: '', nameAr: '', url: '' })}
        renderItem={(row, _i, update) => (
          <div className="flex flex-col gap-4">
            <BilingualField label="Name" en={row.nameEn} ar={row.nameAr} onChangeEn={(v) => update({ nameEn: v })} onChangeAr={(v) => update({ nameAr: v })} />
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">URL (shared)</label>
              <input type="text" value={row.url} onChange={(e) => update({ url: e.target.value })} className={fieldClass} />
            </div>
          </div>
        )}
      />

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
