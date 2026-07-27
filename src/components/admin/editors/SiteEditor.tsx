import { useEffect, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../lib/apiClient';
import { BilingualField } from '../shared/BilingualField';
import { ListEditor } from '../shared/ListEditor';
import { ImageUploadField } from '../shared/ImageUploadField';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';
import type { SiteConfig } from '../../../types';

interface FactBarRow {
  labelEn: string;
  valueEn: string;
  labelAr: string;
  valueAr: string;
}

function toRows(en: SiteConfig['factBar'], ar: SiteConfig['factBar']): FactBarRow[] {
  return en.map((e, i) => ({ labelEn: e.label, valueEn: e.value, labelAr: ar[i]?.label ?? '', valueAr: ar[i]?.value ?? '' }));
}

const fieldClass = 'w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]';

export function SiteEditor() {
  const { content, refresh } = useContent();
  const { token } = useAuth();
  const [en, setEn] = useState(content.site.en);
  const [ar, setAr] = useState(content.site.ar);
  const [rows, setRows] = useState<FactBarRow[]>(() => toRows(content.site.en.factBar, content.site.ar.factBar));
  const [heroLinesEnText, setHeroLinesEnText] = useState(content.site.en.heroHeadlineLines.join('\n'));
  const [heroLinesArText, setHeroLinesArText] = useState(content.site.ar.heroHeadlineLines.join('\n'));
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setEn(content.site.en);
    setAr(content.site.ar);
    setRows(toRows(content.site.en.factBar, content.site.ar.factBar));
    setHeroLinesEnText(content.site.en.heroHeadlineLines.join('\n'));
    setHeroLinesArText(content.site.ar.heroHeadlineLines.join('\n'));
  }, [content.site]);

  const handleSave = async () => {
    setStatus('saving');
    try {
      await apiClient.put(
        '/api/site',
        {
          nameEn: en.name,
          nameAr: ar.name,
          initialsEn: en.initials,
          initialsAr: ar.initials,
          titleEn: en.title,
          titleAr: ar.title,
          taglineEn: en.tagline,
          taglineAr: ar.tagline,
          descriptionEn: en.description,
          descriptionAr: ar.description,
          email: en.email,
          phone: en.phone,
          locationEn: en.location,
          locationAr: ar.location,
          resumeUrl: en.resumeUrl,
          heroImage: en.heroImage,
          availabilityLineEn: en.availabilityLine,
          availabilityLineAr: ar.availabilityLine,
          heroHeadlineLinesEn: heroLinesEnText.split('\n').map((l) => l.trim()).filter(Boolean),
          heroHeadlineLinesAr: heroLinesArText.split('\n').map((l) => l.trim()).filter(Boolean),
          heroSublineEn: en.heroSubline,
          heroSublineAr: ar.heroSubline,
          factBarEn: rows.map((r) => ({ label: r.labelEn, value: r.valueEn })),
          factBarAr: rows.map((r) => ({ label: r.labelAr, value: r.valueAr })),
          contactIntroEn: en.contactIntro,
          contactIntroAr: ar.contactIntro,
          contactMetaEn: en.contactMeta,
          contactMetaAr: ar.contactMeta,
          footerCopyrightEn: en.footerCopyright,
          footerCopyrightAr: ar.footerCopyright,
          socialLinks: en.socialLinks,
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
      <h1 className="mb-6 text-2xl font-bold">Site & Hero</h1>
      <div className="flex flex-col gap-6">
        <BilingualField label="Name" en={en.name} ar={ar.name} onChangeEn={(v) => setEn({ ...en, name: v })} onChangeAr={(v) => setAr({ ...ar, name: v })} />
        <BilingualField label="Initials" en={en.initials} ar={ar.initials} onChangeEn={(v) => setEn({ ...en, initials: v })} onChangeAr={(v) => setAr({ ...ar, initials: v })} />
        <BilingualField label="Title (browser tab / meta)" en={en.title} ar={ar.title} onChangeEn={(v) => setEn({ ...en, title: v })} onChangeAr={(v) => setAr({ ...ar, title: v })} />
        <BilingualField label="Tagline" en={en.tagline} ar={ar.tagline} multiline onChangeEn={(v) => setEn({ ...en, tagline: v })} onChangeAr={(v) => setAr({ ...ar, tagline: v })} />
        <BilingualField label="Description (meta)" en={en.description} ar={ar.description} multiline onChangeEn={(v) => setEn({ ...en, description: v })} onChangeAr={(v) => setAr({ ...ar, description: v })} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Email (shared)</label>
            <input type="email" value={en.email} onChange={(e) => setEn({ ...en, email: e.target.value })} className={fieldClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Phone (shared)</label>
            <input type="text" value={en.phone} onChange={(e) => setEn({ ...en, phone: e.target.value })} className={fieldClass} />
          </div>
        </div>

        <BilingualField label="Location" en={en.location} ar={ar.location} onChangeEn={(v) => setEn({ ...en, location: v })} onChangeAr={(v) => setAr({ ...ar, location: v })} />

        <ImageUploadField label="Résumé PDF (shared)" value={en.resumeUrl} onChange={(url) => setEn({ ...en, resumeUrl: url })} />
        <ImageUploadField label="Hero portrait (shared)" value={en.heroImage} onChange={(url) => setEn({ ...en, heroImage: url })} />

        <BilingualField
          label="Availability line"
          en={en.availabilityLine}
          ar={ar.availabilityLine}
          onChangeEn={(v) => setEn({ ...en, availabilityLine: v })}
          onChangeAr={(v) => setAr({ ...ar, availabilityLine: v })}
        />

        <BilingualField
          label="Hero headline (one line per row — rendered with line breaks)"
          en={heroLinesEnText}
          ar={heroLinesArText}
          multiline
          rows={4}
          onChangeEn={setHeroLinesEnText}
          onChangeAr={setHeroLinesArText}
        />

        <BilingualField label="Hero subline" en={en.heroSubline} ar={ar.heroSubline} multiline onChangeEn={(v) => setEn({ ...en, heroSubline: v })} onChangeAr={(v) => setAr({ ...ar, heroSubline: v })} />

        <div>
          <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Fact bar</h2>
          <ListEditor
            items={rows}
            onChange={setRows}
            createItem={() => ({ labelEn: '', valueEn: '', labelAr: '', valueAr: '' })}
            renderItem={(row, _i, update) => (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <BilingualField label="Label" en={row.labelEn} ar={row.labelAr} onChangeEn={(v) => update({ labelEn: v })} onChangeAr={(v) => update({ labelAr: v })} />
                <BilingualField label="Value" en={row.valueEn} ar={row.valueAr} onChangeEn={(v) => update({ valueEn: v })} onChangeAr={(v) => update({ valueAr: v })} />
              </div>
            )}
          />
        </div>

        <BilingualField label="Contact intro" en={en.contactIntro} ar={ar.contactIntro} multiline onChangeEn={(v) => setEn({ ...en, contactIntro: v })} onChangeAr={(v) => setAr({ ...ar, contactIntro: v })} />
        <BilingualField label="Contact meta" en={en.contactMeta} ar={ar.contactMeta} onChangeEn={(v) => setEn({ ...en, contactMeta: v })} onChangeAr={(v) => setAr({ ...ar, contactMeta: v })} />
        <BilingualField label="Footer copyright" en={en.footerCopyright} ar={ar.footerCopyright} onChangeEn={(v) => setEn({ ...en, footerCopyright: v })} onChangeAr={(v) => setAr({ ...ar, footerCopyright: v })} />
      </div>
      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
