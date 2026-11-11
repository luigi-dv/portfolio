import profile from '@/data/profile.json';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: '/', userAgent: '*' },
    sitemap: new URL('/sitemap.xml', profile.url).toString(),
  };
}
