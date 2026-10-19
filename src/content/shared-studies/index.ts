import type { MDXContent } from 'mdx/types';

import { getActiveLink } from './links';

/**
 * Case studies that are only reachable through a shared link. They are not
 * listed on the site, in the sitemap or in search results, and they never
 * name the client: figures that could be confidential are marked with
 * <Illustrative> in the MDX.
 */
export interface SharedStudy {
  title: string;
  /** One sentence for the page description */
  summary: string;
  /** Shown under the title instead of a company name */
  byline: string;
  stack: string[];
  /** Key facts shown above the write-up */
  facts: { label: string; value: string; illustrative?: boolean }[];
  load: () => Promise<{ default: MDXContent }>;
}

export const sharedStudies: Record<string, SharedStudy> = {
  'native-ios': {
    byline:
      'An e-commerce analytics platform and Syncflow, 2026. Sole iOS engineer on both.',
    facts: [
      { label: 'Native apps shipped', value: '2' },
      { label: 'Swift written', value: '~75k lines' },
      { label: 'Automated tests', value: '600+' },
      { label: 'Languages', value: 'Up to 6' },
    ],
    load: () => import('./native-ios.mdx'),
    stack: [
      'Swift',
      'SwiftUI',
      'Observation',
      'WidgetKit',
      'ActivityKit',
      'StoreKit 2',
      'Passkeys',
      'Xcode Cloud',
      'fastlane',
    ],
    summary:
      'How I took two products native on iOS: a thin client over the backend, a demo mode that keeps real data out of every screenshot, and translations the tests enforce.',
    title: 'Two native iOS apps, one way of building them',
  },
};

/** The study behind an active link, or undefined when the link is unknown or expired */
export const getSharedStudy = (id: string) => {
  const link = getActiveLink(id);
  const study = link && sharedStudies[link.study];
  return link && study ? { link, study } : undefined;
};
