import { useEffect, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../lib/apiClient';
import { BilingualField } from '../shared/BilingualField';
import { ListEditor } from '../shared/ListEditor';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';

interface ParagraphRow {
  en: string;
  ar: string;
}

function toRows(en: string[], ar: string[]): ParagraphRow[] {
  return en.map((e, i) => ({ en: e, ar: ar[i] ?? '' }));
}

export function AboutEditor() {
  const { content, refresh } = useContent();
  const { token } = useAuth();
  const [headlineEn, setHeadlineEn] = useState(content.about.en.headline);
  const [headlineAr, setHeadlineAr] = useState(content.about.ar.headline);
  const [rows, setRows] = useState<ParagraphRow[]>(() => toRows(content.about.en.paragraphs, content.about.ar.paragraphs));
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setHeadlineEn(content.about.en.headline);
    setHeadlineAr(content.about.ar.headline);
    setRows(toRows(content.about.en.paragraphs, content.about.ar.paragraphs));
  }, [content.about]);

  const handleSave = async () => {
    setStatus('saving');
    try {
      await apiClient.put(
        '/api/about',
        {
          headlineEn,
          headlineAr,
          paragraphsEn: rows.map((r) => r.en),
          paragraphsAr: rows.map((r) => r.ar),
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
      <h1 className="mb-6 text-2xl font-bold">About</h1>
      <div className="flex flex-col gap-6">
        <BilingualField label="Headline" en={headlineEn} ar={headlineAr} onChangeEn={setHeadlineEn} onChangeAr={setHeadlineAr} />

        <div>
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Paragraphs</h2>
          <ListEditor
            items={rows}
            onChange={setRows}
            createItem={() => ({ en: '', ar: '' })}
            addLabel="+ Add paragraph"
            renderItem={(row, _i, update) => (
              <BilingualField label="Paragraph" en={row.en} ar={row.ar} multiline rows={4} onChangeEn={(v) => update({ en: v })} onChangeAr={(v) => update({ ar: v })} />
            )}
          />
        </div>
      </div>
      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
