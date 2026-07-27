import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { apiClient } from '../lib/apiClient';
import { siteConfig } from '../data/site';
import { aboutContent } from '../data/about';
import { experiences, recommendation } from '../data/experience';
import { stackGroups } from '../data/stack';
import { educationEntries, certifications } from '../data/education';
import { workCases, alsoBuilt } from '../data/work';
import type {
  AboutContent,
  AlsoBuiltItem,
  EducationEntry,
  Experience,
  Recommendation,
  SiteConfig,
  StackGroup,
  WorkCase,
} from '../types';

export interface ContentData {
  site: Record<'en' | 'ar', SiteConfig>;
  about: Record<'en' | 'ar', AboutContent>;
  recommendation: Record<'en' | 'ar', Recommendation>;
  experiences: Record<'en' | 'ar', Experience[]>;
  stackGroups: Record<'en' | 'ar', StackGroup[]>;
  educationEntries: Record<'en' | 'ar', EducationEntry[]>;
  certifications: Record<'en' | 'ar', string[]>;
  workCases: Record<'en' | 'ar', WorkCase[]>;
  alsoBuilt: Record<'en' | 'ar', AlsoBuiltItem[]>;
}

/** Bundled at build time — used whenever the API is unreachable or unconfigured, so the site
 * never breaks just because the backend is down. Also the seed script's source of truth. */
const fallbackContent: ContentData = {
  site: siteConfig,
  about: aboutContent,
  recommendation,
  experiences,
  stackGroups,
  educationEntries,
  certifications,
  workCases,
  alsoBuilt,
};

interface ContentContextValue {
  content: ContentData;
  loading: boolean;
  usingFallback: boolean;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ContentData>(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<ContentData>('/api/content');
      setContent(data);
      setUsingFallback(false);
    } catch {
      setContent(fallbackContent);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo<ContentContextValue>(
    () => ({ content, loading, usingFallback, refresh: load }),
    [content, loading, usingFallback, load],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
