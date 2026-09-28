import { useEffect, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../lib/apiClient';
import { BilingualField } from '../shared/BilingualField';
import { ListEditor } from '../shared/ListEditor';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';
import type { Project, ProjectStatus } from '../../../types';

interface ProjectRow {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  stackLine: string;
  year: string;
  url: string;
  status: ProjectStatus;
  featured: boolean;
}

const STATUSES: { value: ProjectStatus; label: string; hint: string }[] = [
  { value: 'live', label: 'Live', hint: 'Source or product is reachable at the URL.' },
  { value: 'private', label: 'Private', hint: 'Closed source. The URL is dropped on save and the card shows a label instead of a link.' },
  { value: 'archived', label: 'Archived', hint: 'Finished and no longer maintained. Still listed.' },
];

const fieldClass = 'w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]';
const labelClass = 'font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]';

function toRows(en: Project[], ar: Project[]): ProjectRow[] {
  return en.map((p, i) => ({
    nameEn: p.name,
    nameAr: ar[i]?.name ?? '',
    descriptionEn: p.description,
    descriptionAr: ar[i]?.description ?? '',
    stackLine: p.stackLine,
    year: p.year,
    url: p.url,
    status: p.status,
    featured: p.featured,
  }));
}

export function ProjectsEditor() {
  const { content, refresh } = useContent();
  const { token } = useAuth();
  const [rows, setRows] = useState<ProjectRow[]>(() => toRows(content.projects.en, content.projects.ar));
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setRows(toRows(content.projects.en, content.projects.ar));
  }, [content.projects]);

  const handleSave = async () => {
    setStatus('saving');
    try {
      const toDto = (r: ProjectRow, lang: 'en' | 'ar') => ({
        name: lang === 'en' ? r.nameEn : r.nameAr,
        description: lang === 'en' ? r.descriptionEn : r.descriptionAr,
        stackLine: r.stackLine,
        year: r.year,
        // Mirrors the API, which drops the url on a private row anyway. Doing it here too
        // means what you see in the form is what gets stored.
        url: r.status === 'private' ? '' : r.url,
        status: r.status,
        featured: r.featured,
      });
      await apiClient.put(
        '/api/projects',
        { en: rows.map((r) => toDto(r, 'en')), ar: rows.map((r) => toDto(r, 'ar')) },
        token,
      );
      await refresh();
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  };

  const describedCount = rows.filter((r) => r.descriptionEn.trim()).length;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Projects</h1>
      <p className="mb-6 max-w-[640px] text-sm text-[var(--ink-2)]">
        The full index under the case studies on the Work page. Featured entries show before the
        reader expands the rest. {describedCount} of {rows.length} have an English description.
      </p>

      <ListEditor
        items={rows}
        onChange={setRows}
        addLabel="+ Add project"
        createItem={() => ({
          nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
          stackLine: '', year: '', url: '', status: 'live' as ProjectStatus, featured: false,
        })}
        renderItem={(row, _i, update) => {
          const isPrivate = row.status === 'private';
          return (
            <div className="flex flex-col gap-4">
              <BilingualField
                label="Name"
                en={row.nameEn}
                ar={row.nameAr}
                onChangeEn={(v) => update({ nameEn: v })}
                onChangeAr={(v) => update({ nameAr: v })}
              />
              <BilingualField
                label="Description"
                multiline
                rows={3}
                en={row.descriptionEn}
                ar={row.descriptionAr}
                onChangeEn={(v) => update({ descriptionEn: v })}
                onChangeAr={(v) => update({ descriptionAr: v })}
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Stack line</label>
                  <input
                    type="text"
                    value={row.stackLine}
                    onChange={(e) => update({ stackLine: e.target.value })}
                    placeholder="Angular 18 · .NET 8 · PostgreSQL"
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Year</label>
                  <input
                    type="text"
                    value={row.year}
                    onChange={(e) => update({ year: e.target.value })}
                    placeholder="2026"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>Status</label>
                  <select
                    value={row.status}
                    onChange={(e) => update({ status: e.target.value as ProjectStatus })}
                    className={fieldClass}
                  >
                    {STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <span className="font-mono text-[10px] leading-[1.5] text-[var(--ink-3)]">
                    {STATUSES.find((s) => s.value === row.status)?.hint}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className={labelClass}>URL</label>
                  <input
                    type="text"
                    value={isPrivate ? '' : row.url}
                    disabled={isPrivate}
                    onChange={(e) => update({ url: e.target.value })}
                    placeholder={isPrivate ? 'Not used while private' : 'https://github.com/...'}
                    className={`${fieldClass} disabled:opacity-40`}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[var(--ink-2)]">
                <input
                  type="checkbox"
                  checked={row.featured}
                  onChange={(e) => update({ featured: e.target.checked })}
                />
                Featured — show before the reader expands the full list
              </label>
            </div>
          );
        }}
      />

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
