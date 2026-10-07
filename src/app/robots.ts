import type { MetadataRoute } from 'next';

import profile from '@/data/profile.json';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/', userAgent: '*' },
    sitemap: new URL('/sitemap.xml', profile.url).toString(),
  };
}
