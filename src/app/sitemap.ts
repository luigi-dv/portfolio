import type { MetadataRoute } from 'next';

import { caseStudies, isPublished } from '@/content/case-studies';

import profile from '@/data/profile.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => new URL(path, profile.url).toString();

  return [
    { changeFrequency: 'weekly', lastModified, priority: 1, url: url('/') },
    ...caseStudies.filter(isPublished).map((study) => ({
      changeFrequency: 'monthly' as const,
      lastModified,
      priority: 0.8,
      url: url(`/work/${study.slug}`),
    })),
    {
      changeFrequency: 'monthly',
      lastModified,
      priority: 0.6,
      url: url('/cv'),
    },
  ];
}
