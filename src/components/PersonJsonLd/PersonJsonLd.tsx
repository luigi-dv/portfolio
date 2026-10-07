import React from 'react';

import { Profile } from '@/types/Profile';
import { WorkItem } from '@/types/WorkItem';

interface PersonJsonLdProps {
  profile: Profile;
  currentWork?: WorkItem;
  education: { school: string; href: string }[];
  sameAs: string[];
}

/**
 * schema.org Person data so search engines can show a rich profile result.
 */
export const PersonJsonLd = ({
  currentWork,
  education,
  profile,
  sameAs,
}: PersonJsonLdProps) => {
  const [locality, country] = profile.location
    .split(',')
    .map((part) => part.trim());
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    address: {
      '@type': 'PostalAddress',
      addressCountry: country,
      addressLocality: locality,
    },
    alumniOf: education.map((item) => ({
      '@type': 'CollegeOrUniversity',
      name: item.school,
      url: item.href,
    })),
    description: profile.headline,
    email: `mailto:${profile.email}`,
    image: new URL(profile.avatarUrl, profile.url).toString(),
    jobTitle: currentWork?.roles[0]?.title,
    knowsAbout: profile.skills.flatMap((group) => group.items),
    knowsLanguage: profile.languages.map((language) => language.name),
    name: profile.name,
    sameAs,
    url: profile.url,
    worksFor: currentWork && {
      '@type': 'Organization',
      name: currentWork.company,
      url: currentWork.href,
    },
  };

  return (
    <script
      type='application/ld+json'
      // Escape `<` so the JSON can never close the script tag early
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
};
