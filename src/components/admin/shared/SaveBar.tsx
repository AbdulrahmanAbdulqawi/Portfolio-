export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface SaveBarProps {
  status: SaveStatus;
  onSave: () => void;
}

export function SaveBar({ status, onSave }: SaveBarProps) {
  return (
    <div
      className="sticky bottom-0 mt-8 flex items-center gap-4 border-t border-[var(--rule)] py-4"
      style={{ background: 'var(--paper)' }}
    >
      <button
        type="button"
        onClick={onSave}
        disabled={status === 'saving'}
        className="bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--paper)] disabled:opacity-60"
      >
        {status === 'saving' ? 'Saving…' : 'Save'}
      </button>
      {status === 'saved' && <span className="font-mono text-xs text-[var(--accent)]">Saved.</span>}
      {status === 'error' && (
        <span className="font-mono text-xs" style={{ color: '#b91c1c' }}>
          Save failed.
        </span>
      )}
    </div>
  );
}
