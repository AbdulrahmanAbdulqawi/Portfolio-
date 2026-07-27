import type { ReactNode } from 'react';

interface ListEditorProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => ReactNode;
  createItem: () => T;
  addLabel?: string;
}

export function ListEditor<T>({ items, onChange, renderItem, createItem, addLabel = '+ Add' }: ListEditorProps<T>) {
  const updateAt = (index: number, patch: Partial<T>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number) => onChange(items.filter((_, i) => i !== index));

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <div key={index} className="border border-[var(--rule)] p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-[var(--ink-3)]">#{index + 1}</span>
            <div className="flex items-center gap-3 font-mono text-xs">
              <button type="button" onClick={() => moveUp(index)} disabled={index === 0} className="disabled:opacity-30">
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="disabled:opacity-30"
              >
                ↓
              </button>
              <button type="button" onClick={() => removeAt(index)} style={{ color: '#b91c1c' }}>
                Remove
              </button>
            </div>
          </div>
          {renderItem(item, index, (patch) => updateAt(index, patch))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, createItem()])}
        className="self-start border border-[var(--rule)] px-4 py-2 font-mono text-xs transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        {addLabel}
      </button>
    </div>
  );
}
