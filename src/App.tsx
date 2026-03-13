import React, { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { ConsolePromptView } from './components/ConsolePromptView';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { LanguageProvider } from './context/LanguageContext';

type ViewId = 'prompt' | 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

function App() {
  const [view, setView] = useState<ViewId>('prompt');
  const [bootComplete, setBootComplete] = useState(false);
  const { lang, toggle: toggleLang, setLang } = useLanguage();
  useTheme();

  return (
    <LanguageProvider value={{ lang, toggle: toggleLang, setLang }}>
      <div className="min-h-full-viewport min-h-screen scanlines flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <BootScreen onDone={() => setBootComplete(true)} />

        <ConsolePromptView
          bootComplete={bootComplete}
          onOpenSection={(sectionId) => setView(sectionId)}
          selectedSection={view === 'prompt' ? null : view}
          onBack={() => setView('prompt')}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
