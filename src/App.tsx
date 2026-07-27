import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { Home } from './components/Home';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Stack } from './components/Stack';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { AppPreferencesProvider } from './context/AppPreferencesContext';
import { useLanguage } from './hooks/useLanguage';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const { lang, toggle: toggleLang, setLang } = useLanguage();

  return (
    <LanguageProvider value={{ lang, toggle: toggleLang, setLang }}>
      <AppPreferencesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="work" element={<Work />} />
              <Route path="experience" element={<Experience />} />
              <Route path="stack" element={<Stack />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppPreferencesProvider>
    </LanguageProvider>
  );
}

export default App;
