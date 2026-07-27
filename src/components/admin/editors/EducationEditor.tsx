import { useEffect, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../lib/apiClient';
import { BilingualField } from '../shared/BilingualField';
import { ListEditor } from '../shared/ListEditor';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';
import type { EducationEntry } from '../../../types';

interface EducationRow {
  schoolEn: string;
  schoolAr: string;
  degreeEn: string;
  degreeAr: string;
  locationEn: string;
  locationAr: string;
  periodEn: string;
  periodAr: string;
}

interface CertificationRow {
  en: string;
  ar: string;
}

function toEducationRows(en: EducationEntry[], ar: EducationEntry[]): EducationRow[] {
  return en.map((e, i) => ({
    schoolEn: e.school,
    schoolAr: ar[i]?.school ?? '',
    degreeEn: e.degree,
    degreeAr: ar[i]?.degree ?? '',
    locationEn: e.location,
    locationAr: ar[i]?.location ?? '',
    periodEn: e.period,
    periodAr: ar[i]?.period ?? '',
  }));
}

function toCertificationRows(en: string[], ar: string[]): CertificationRow[] {
  return en.map((e, i) => ({ en: e, ar: ar[i] ?? '' }));
}

export function EducationEditor() {
  const { content, refresh } = useContent();
  const { token } = useAuth();
  const [entries, setEntries] = useState<EducationRow[]>(() => toEducationRows(content.educationEntries.en, content.educationEntries.ar));
  const [certs, setCerts] = useState<CertificationRow[]>(() => toCertificationRows(content.certifications.en, content.certifications.ar));
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setEntries(toEducationRows(content.educationEntries.en, content.educationEntries.ar));
  }, [content.educationEntries]);

  useEffect(() => {
    setCerts(toCertificationRows(content.certifications.en, content.certifications.ar));
  }, [content.certifications]);

  const handleSave = async () => {
    setStatus('saving');
    try {
      await apiClient.put(
        '/api/education-entries',
        {
          en: entries.map((e) => ({ school: e.schoolEn, degree: e.degreeEn, location: e.locationEn, period: e.periodEn })),
          ar: entries.map((e) => ({ school: e.schoolAr, degree: e.degreeAr, location: e.locationAr, period: e.periodAr })),
        },
        token,
      );
      await apiClient.put(
        '/api/certifications',
        { en: certs.map((c) => c.en), ar: certs.map((c) => c.ar) },
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
      <h1 className="mb-6 text-2xl font-bold">Education</h1>
      <ListEditor
        items={entries}
        onChange={setEntries}
        addLabel="+ Add entry"
        createItem={() => ({ schoolEn: '', schoolAr: '', degreeEn: '', degreeAr: '', locationEn: '', locationAr: '', periodEn: '', periodAr: '' })}
        renderItem={(row, _i, update) => (
          <div className="flex flex-col gap-4">
            <BilingualField label="Degree" en={row.degreeEn} ar={row.degreeAr} onChangeEn={(v) => update({ degreeEn: v })} onChangeAr={(v) => update({ degreeAr: v })} />
            <BilingualField label="School" en={row.schoolEn} ar={row.schoolAr} onChangeEn={(v) => update({ schoolEn: v })} onChangeAr={(v) => update({ schoolAr: v })} />
            <BilingualField label="Location" en={row.locationEn} ar={row.locationAr} onChangeEn={(v) => update({ locationEn: v })} onChangeAr={(v) => update({ locationAr: v })} />
            <BilingualField label="Period" en={row.periodEn} ar={row.periodAr} onChangeEn={(v) => update({ periodEn: v })} onChangeAr={(v) => update({ periodAr: v })} />
          </div>
        )}
      />

      <h2 className="mb-4 mt-10 text-xl font-bold">Scholarships & certificates</h2>
      <ListEditor
        items={certs}
        onChange={setCerts}
        addLabel="+ Add certificate"
        createItem={() => ({ en: '', ar: '' })}
        renderItem={(row, _i, update) => (
          <BilingualField label="Text" en={row.en} ar={row.ar} onChangeEn={(v) => update({ en: v })} onChangeAr={(v) => update({ ar: v })} />
        )}
      />

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
