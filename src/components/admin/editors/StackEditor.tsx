import { useEffect, useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { useAuth } from '../../../context/AuthContext';
import { apiClient } from '../../../lib/apiClient';
import { BilingualField } from '../shared/BilingualField';
import { ListEditor } from '../shared/ListEditor';
import { SaveBar, type SaveStatus } from '../shared/SaveBar';
import type { SkillLevel, StackGroup } from '../../../types';

interface SkillRow {
  nameEn: string;
  nameAr: string;
  level: SkillLevel;
}

interface GroupRow {
  titleEn: string;
  titleAr: string;
  skills: SkillRow[];
}

const LEVELS: SkillLevel[] = ['Daily', 'Solid', 'Familiar'];

function toRows(en: StackGroup[], ar: StackGroup[]): GroupRow[] {
  return en.map((g, i) => ({
    titleEn: g.title,
    titleAr: ar[i]?.title ?? '',
    skills: g.skills.map((s, si) => ({ nameEn: s.name, nameAr: ar[i]?.skills[si]?.name ?? '', level: s.level })),
  }));
}

const fieldClass = 'w-full border border-[var(--rule)] bg-[var(--paper)] px-3 py-2 text-sm text-[var(--ink)]';

export function StackEditor() {
  const { content, refresh } = useContent();
  const { token } = useAuth();
  const [groups, setGroups] = useState<GroupRow[]>(() => toRows(content.stackGroups.en, content.stackGroups.ar));
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    setGroups(toRows(content.stackGroups.en, content.stackGroups.ar));
  }, [content.stackGroups]);

  const handleSave = async () => {
    setStatus('saving');
    try {
      await apiClient.put(
        '/api/stack-groups',
        {
          en: groups.map((g) => ({ title: g.titleEn, skills: g.skills.map((s) => ({ name: s.nameEn, level: s.level })) })),
          ar: groups.map((g) => ({ title: g.titleAr, skills: g.skills.map((s) => ({ name: s.nameAr, level: s.level })) })),
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
      <h1 className="mb-6 text-2xl font-bold">Stack</h1>
      <ListEditor
        items={groups}
        onChange={setGroups}
        addLabel="+ Add group"
        createItem={() => ({ titleEn: '', titleAr: '', skills: [] })}
        renderItem={(group, _i, updateGroup) => (
          <div className="flex flex-col gap-4">
            <BilingualField label="Group title" en={group.titleEn} ar={group.titleAr} onChangeEn={(v) => updateGroup({ titleEn: v })} onChangeAr={(v) => updateGroup({ titleAr: v })} />
            <div>
              <h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Skills</h3>
              <ListEditor
                items={group.skills}
                onChange={(skills) => updateGroup({ skills })}
                addLabel="+ Add skill"
                createItem={() => ({ nameEn: '', nameAr: '', level: 'Solid' as SkillLevel })}
                renderItem={(skill, _si, updateSkill) => (
                  <div className="flex flex-col gap-3">
                    <BilingualField label="Name" en={skill.nameEn} ar={skill.nameAr} onChangeEn={(v) => updateSkill({ nameEn: v })} onChangeAr={(v) => updateSkill({ nameAr: v })} />
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Level</label>
                      <select value={skill.level} onChange={(e) => updateSkill({ level: e.target.value as SkillLevel })} className={fieldClass}>
                        {LEVELS.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      />
      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
