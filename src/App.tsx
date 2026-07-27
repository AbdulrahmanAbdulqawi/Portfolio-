import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { Home } from './components/Home';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Stack } from './components/Stack';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { BlogPost } from './components/BlogPost';
import { AppPreferencesProvider } from './context/AppPreferencesContext';
import { useLanguage } from './hooks/useLanguage';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/admin/RequireAuth';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SiteEditor } from './components/admin/editors/SiteEditor';
import { AboutEditor } from './components/admin/editors/AboutEditor';
import { ExperienceEditor } from './components/admin/editors/ExperienceEditor';
import { StackEditor } from './components/admin/editors/StackEditor';
import { EducationEditor } from './components/admin/editors/EducationEditor';
import { WorkEditor } from './components/admin/editors/WorkEditor';
import { BlogListEditor } from './components/admin/editors/BlogListEditor';
import { BlogPostEditor } from './components/admin/editors/BlogPostEditor';

function App() {
  const { lang, toggle: toggleLang, setLang } = useLanguage();

  return (
    <LanguageProvider value={{ lang, toggle: toggleLang, setLang }}>
      <AppPreferencesProvider>
        <ContentProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<SiteLayout />}>
                  <Route index element={<Home />} />
                  <Route path="work" element={<Work />} />
                  <Route path="experience" element={<Experience />} />
                  <Route path="stack" element={<Stack />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogPost />} />
                </Route>

                <Route path="admin/login" element={<AdminLogin />} />
                <Route element={<RequireAuth />}>
                  <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="site" element={<SiteEditor />} />
                    <Route path="about" element={<AboutEditor />} />
                    <Route path="experience" element={<ExperienceEditor />} />
                    <Route path="stack" element={<StackEditor />} />
                    <Route path="education" element={<EducationEditor />} />
                    <Route path="work" element={<WorkEditor />} />
                    <Route path="blog" element={<BlogListEditor />} />
                    <Route path="blog/new" element={<BlogPostEditor />} />
                    <Route path="blog/:id" element={<BlogPostEditor />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ContentProvider>
      </AppPreferencesProvider>
    </LanguageProvider>
  );
}

export default App;
