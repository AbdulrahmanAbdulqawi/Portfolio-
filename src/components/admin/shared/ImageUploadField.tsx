import { useState, type ChangeEvent } from 'react';
import { apiClient } from '../../../lib/apiClient';
import { useAuth } from '../../../context/AuthContext';

interface ImageUploadFieldProps {
  label: string;
  value?: string | null;
  onChange: (url: string) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const res = await apiClient.upload<{ url: string }>('/api/uploads', file, token);
      onChange(`${API_BASE_URL ?? ''}${res.url}`);
    } catch {
      setError('Upload failed.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">{label}</label>
      {value && <img src={value} alt="" className="h-20 w-auto border border-[var(--rule)] object-contain" />}
      <input type="file" accept="image/*,.svg,.pdf" onChange={handleFile} disabled={uploading} className="font-mono text-xs" />
      {uploading && <span className="font-mono text-xs text-[var(--ink-3)]">Uploading…</span>}
      {error && (
        <span className="font-mono text-xs" style={{ color: '#b91c1c' }}>
          {error}
        </span>
      )}
    </div>
  );
}
