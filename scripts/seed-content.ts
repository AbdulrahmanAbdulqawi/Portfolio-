/**
 * One-time seed: pushes the bundled src/data/*.ts content into a freshly-deployed AdminApi so
 * the admin panel starts populated with the real site instead of blank forms.
 *
 * Usage:
 *   SEED_API_BASE_URL=https://api.example.com SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD=... npx tsx scripts/seed-content.ts
 */
import { siteConfig } from '../src/data/site';
import { aboutContent } from '../src/data/about';
import { experiences, recommendation } from '../src/data/experience';
import { stackGroups } from '../src/data/stack';
import { educationEntries, certifications } from '../src/data/education';
import { workCases, alsoBuilt } from '../src/data/work';

const API_BASE_URL = process.env.SEED_API_BASE_URL;
const EMAIL = process.env.SEED_ADMIN_EMAIL;
const PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!API_BASE_URL || !EMAIL || !PASSWORD) {
  console.error(
    'Usage: SEED_API_BASE_URL=... SEED_ADMIN_EMAIL=... SEED_ADMIN_PASSWORD=... npx tsx scripts/seed-content.ts',
  );
  process.exit(1);
}

async function main() {
  const loginRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${loginRes.status} ${await loginRes.text()}`);
  }
  const { token } = (await loginRes.json()) as { token: string };

  async function put(path: string, body: unknown) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=utf-8', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`PUT ${path} failed: ${res.status} ${await res.text()}`);
    }
    console.log(`✓ ${path}`);
  }

  await put('/api/site', {
    nameEn: siteConfig.en.name,
    nameAr: siteConfig.ar.name,
    initialsEn: siteConfig.en.initials,
    initialsAr: siteConfig.ar.initials,
    titleEn: siteConfig.en.title,
    titleAr: siteConfig.ar.title,
    taglineEn: siteConfig.en.tagline,
    taglineAr: siteConfig.ar.tagline,
    descriptionEn: siteConfig.en.description,
    descriptionAr: siteConfig.ar.description,
    email: siteConfig.en.email,
    phone: siteConfig.en.phone,
    locationEn: siteConfig.en.location,
    locationAr: siteConfig.ar.location,
    resumeUrl: siteConfig.en.resumeUrl,
    heroImage: siteConfig.en.heroImage,
    availabilityLineEn: siteConfig.en.availabilityLine,
    availabilityLineAr: siteConfig.ar.availabilityLine,
    heroHeadlineLinesEn: siteConfig.en.heroHeadlineLines,
    heroHeadlineLinesAr: siteConfig.ar.heroHeadlineLines,
    heroSublineEn: siteConfig.en.heroSubline,
    heroSublineAr: siteConfig.ar.heroSubline,
    factBarEn: siteConfig.en.factBar,
    factBarAr: siteConfig.ar.factBar,
    contactIntroEn: siteConfig.en.contactIntro,
    contactIntroAr: siteConfig.ar.contactIntro,
    contactMetaEn: siteConfig.en.contactMeta,
    contactMetaAr: siteConfig.ar.contactMeta,
    footerCopyrightEn: siteConfig.en.footerCopyright,
    footerCopyrightAr: siteConfig.ar.footerCopyright,
    socialLinks: siteConfig.en.socialLinks,
  });

  await put('/api/about', {
    headlineEn: aboutContent.en.headline,
    headlineAr: aboutContent.ar.headline,
    paragraphsEn: aboutContent.en.paragraphs,
    paragraphsAr: aboutContent.ar.paragraphs,
  });

  await put('/api/recommendation', {
    shortEn: recommendation.en.short,
    shortAr: recommendation.ar.short,
    fullEn: recommendation.en.full,
    fullAr: recommendation.ar.full,
    author: recommendation.en.author,
    metaEn: recommendation.en.meta,
    metaAr: recommendation.ar.meta,
  });

  await put('/api/experiences', { en: experiences.en, ar: experiences.ar });
  await put('/api/stack-groups', { en: stackGroups.en, ar: stackGroups.ar });
  await put('/api/education-entries', { en: educationEntries.en, ar: educationEntries.ar });
  await put('/api/certifications', { en: certifications.en, ar: certifications.ar });
  await put('/api/work-cases', { en: workCases.en, ar: workCases.ar });
  await put('/api/also-built', { en: alsoBuilt.en, ar: alsoBuilt.ar });

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
