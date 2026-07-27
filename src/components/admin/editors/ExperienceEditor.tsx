import { useEffect, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../lib/apiClient';
import { BilingualField } from '../shared/BilingualField';
import { ListEditor } from '../shared/ListEditor';
import { ImageUploadField } from '../shared/ImageUploadField';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';
import type { Experience } from '../../../types';

interface ExperienceRow {
  periodEn: string;
  periodAr: string;
  titleEn: string;
  titleAr: string;
  company: string;
  paragraphEn: string;
  paragraphAr: string;
  chipsText: string;
  logo?: string;
}

function toRows(en: Experience[], ar: Experience[]): ExperienceRow[] {
  return en.map((e, i) => ({
    periodEn: e.period,
    periodAr: ar[i]?.period ?? '',
    titleEn: e.title,
    titleAr: ar[i]?.title ?? '',
    company: e.company,
    paragraphEn: e.paragraph,
    paragraphAr: ar[i]?.paragraph ?? '',
    chipsText: (e.chips ?? []).join(', '),
    logo: e.logo,
  }));
}

export function ExperienceEditor() {
  const { content, refresh } = useContent();
  const { token } = useAuth();
  const [rows, setRows] = useState<ExperienceRow[]>(() => toRows(content.experiences.en, content.experiences.ar));
  const [recShortEn, setRecShortEn] = useState(content.recommendation.en.short);
  const [recShortAr, setRecShortAr] = useState(content.recommendation.ar.short);
  const [recFullEn, setRecFullEn] = useState(content.recommendation.en.full);
  const [recFullAr, setRecFullAr] = useState(content.recommendation.ar.full);
  const [recAuthor, setRecAuthor] = useState(content.recommendation.en.author);
  const [recMetaEn, setRecMetaEn] = useState(content.recommendation.en.meta);
  const [recMetaAr, setRecMetaAr] = useState(content.recommendation.ar.meta);
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setRows(toRows(content.experiences.en, content.experiences.ar));
  }, [content.experiences]);

  useEffect(() => {
    setRecShortEn(content.recommendation.en.short);
    setRecShortAr(content.recommendation.ar.short);
    setRecFullEn(content.recommendation.en.full);
    setRecFullAr(content.recommendation.ar.full);
    setRecAuthor(content.recommendation.en.author);
    setRecMetaEn(content.recommendation.en.meta);
    setRecMetaAr(content.recommendation.ar.meta);
  }, [content.recommendation]);

  const handleSave = async () => {
    setStatus('saving');
    try {
      const chips = rows.map((r) => r.chipsText.split(',').map((c) => c.trim()).filter(Boolean));
      await apiClient.put(
        '/api/experiences',
        {
          en: rows.map((r, i) => ({ period: r.periodEn, title: r.titleEn, company: r.company, paragraph: r.paragraphEn, chips: chips[i], logo: r.logo })),
          ar: rows.map((r, i) => ({ period: r.periodAr, title: r.titleAr, company: r.company, paragraph: r.paragraphAr, chips: chips[i], logo: r.logo })),
        },
        token,
      );
      await apiClient.put(
        '/api/recommendation',
        {
          shortEn: recShortEn,
          shortAr: recShortAr,
          fullEn: recFullEn,
          fullAr: recFullAr,
          author: recAuthor,
          metaEn: recMetaEn,
          metaAr: recMetaAr,
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
      <h1 className="mb-6 text-2xl font-bold">Experience</h1>
      <ListEditor
        items={rows}
        onChange={setRows}
        addLabel="+ Add role"
        createItem={() => ({ periodEn: '', periodAr: '', titleEn: '', titleAr: '', company: '', paragraphEn: '', paragraphAr: '', chipsText: '', logo: undefined })}
        renderItem={(row, _i, update) => (
          <div className="flex flex-col gap-4">
            <BilingualField label="Period" en={row.periodEn} ar={row.periodAr} onChangeEn={(v) => update({ periodEn: v })} onChangeAr={(v) => update({ periodAr: v })} />
            <BilingualField label="Title" en={row.titleEn} ar={row.titleAr} onChangeEn={(v) => update({ titleEn: v })} onChangeAr={(v) => update({ titleAr: v })} />
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Company (shared)</label>
              <input
                type="text"
                value={row.company}
                onChange={(e) => update({ company: e.target.value })}
                className="w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </div>
            <BilingualField label="Paragraph" en={row.paragraphEn} ar={row.paragraphAr} multiline rows={4} onChangeEn={(v) => update({ paragraphEn: v })} onChangeAr={(v) => update({ paragraphAr: v })} />
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Chips, comma-separated (shared, optional)</label>
              <input
                type="text"
                value={row.chipsText}
                onChange={(e) => update({ chipsText: e.target.value })}
                placeholder=".NET CORE, ANGULAR, MICROSERVICES"
                className="w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]"
              />
            </div>
            <ImageUploadField label="Company logo (shared, optional)" value={row.logo} onChange={(url) => update({ logo: url })} />
          </div>
        )}
      />

      <h2 className="mb-4 mt-10 text-xl font-bold">Recommendation</h2>
      <div className="flex flex-col gap-6">
        <BilingualField label="Short quote" en={recShortEn} ar={recShortAr} multiline onChangeEn={setRecShortEn} onChangeAr={setRecShortAr} />
        <BilingualField label="Full quote" en={recFullEn} ar={recFullAr} multiline rows={6} onChangeEn={setRecFullEn} onChangeAr={setRecFullAr} />
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Author (shared)</label>
          <input
            type="text"
            value={recAuthor}
            onChange={(e) => setRecAuthor(e.target.value)}
            className="w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]"
          />
        </div>
        <BilingualField label="Meta line" en={recMetaEn} ar={recMetaAr} onChangeEn={setRecMetaEn} onChangeAr={setRecMetaAr} />
      </div>

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
