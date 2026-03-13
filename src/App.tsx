import React, { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { ConsolePromptView } from './components/ConsolePromptView';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { LanguageProvider } from './context/LanguageContext';

type ViewId = 'prompt' | 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

function App() {
  const [view, setView] = useState<ViewId>('prompt');
  const { lang, toggle: toggleLang, setLang } = useLanguage();
  useTheme();

  return (
    <LanguageProvider value={{ lang, toggle: toggleLang, setLang }}>
      <div className="min-h-screen scanlines" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <BootScreen />

        <ConsolePromptView
          onOpenSection={(sectionId) => setView(sectionId)}
          selectedSection={view === 'prompt' ? null : view}
          onBack={() => setView('prompt')}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
