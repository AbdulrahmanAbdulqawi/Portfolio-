import React, { useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { ConsolePromptView } from './components/ConsolePromptView';
import { ProfessionalLayout } from './components/ProfessionalLayout';
import { AppPreferencesProvider } from './context/AppPreferencesContext';
import { useLanguage } from './hooks/useLanguage';
import { useViewMode } from './hooks/useViewMode';
import { LanguageProvider } from './context/LanguageContext';

type ViewId = 'prompt' | 'home' | 'about' | 'experience' | 'skills' | 'projects' | 'education' | 'contact';

function AppContent() {
  const [view, setView] = useState<ViewId>('prompt');
  const [bootComplete, setBootComplete] = useState(false);
  const { viewMode } = useViewMode();

  if (viewMode === 'professional') {
    return <ProfessionalLayout />;
  }

  return (
    <div className="min-h-full-viewport min-h-screen scanlines flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <BootScreen onDone={() => setBootComplete(true)} />

      <ConsolePromptView
        bootComplete={bootComplete}
        onOpenSection={(sectionId) => setView(sectionId)}
        selectedSection={view === 'prompt' ? null : view}
        onBack={() => setView('prompt')}
      />
    </div>
  );
}

function App() {
  const { lang, toggle: toggleLang, setLang } = useLanguage();

  return (
    <LanguageProvider value={{ lang, toggle: toggleLang, setLang }}>
      <AppPreferencesProvider>
        <AppContent />
      </AppPreferencesProvider>
    </LanguageProvider>
  );
}

export default App;
