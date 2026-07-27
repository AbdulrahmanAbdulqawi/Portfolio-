import { useRef, type ChangeEvent } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { apiClient } from '../../../lib/apiClient';
import { useAuth } from '../../../context/AuthContext';

interface RichTextFieldProps {
  label: string;
  en: string;
  ar: string;
  onChangeEn: (html: string) => void;
  onChangeAr: (html: string) => void;
}

function ToolbarButton({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="border border-[var(--rule)] px-2 py-1 font-mono text-xs"
      style={active ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : undefined}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, token }: { editor: Editor | null; token: string | null }) {
  const fileRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const handleImageFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const res = await apiClient.upload<{ url: string }>('/api/uploads', file, token);
      const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '';
      editor.chain().focus().setImage({ src: `${apiBase}${res.url}` }).run();
    } catch {
      // Upload failures here are non-blocking — the author can just retry.
    }
  };

  const setLink = () => {
    const url = window.prompt('Link URL');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="mb-2 flex flex-wrap gap-1">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>B</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>I</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>H2</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>• List</ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>1. List</ToolbarButton>
      <ToolbarButton onClick={setLink} active={editor.isActive('link')}>Link</ToolbarButton>
      <ToolbarButton onClick={() => fileRef.current?.click()}>Image</ToolbarButton>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
    </div>
  );
}

function RichTextPane({ value, onChange, dir }: { value: string; onChange: (html: string) => void; dir: 'ltr' | 'rtl' }) {
  const { token } = useAuth();
  const editor = useEditor({
    extensions: [StarterKit.configure({ link: { openOnClick: false, autolink: true } }), Image],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div dir={dir} className="flex flex-col gap-1">
      <Toolbar editor={editor} token={token} />
      <EditorContent editor={editor} className="ldg-prose ldg-editor" />
    </div>
  );
}

export function RichTextField({ label, en, ar, onChangeEn, onChangeAr }: RichTextFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">{label}</label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-[var(--ink-3)]">EN</span>
          <RichTextPane value={en} onChange={onChangeEn} dir="ltr" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] text-[var(--ink-3)]">AR</span>
          <RichTextPane value={ar} onChange={onChangeAr} dir="rtl" />
        </div>
      </div>
    </div>
  );
}
