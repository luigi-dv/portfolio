import React from 'react';

import type { Metadata } from 'next';

import Link from 'next/link';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { getSharedStudy } from '@/content/shared-studies';
import { ASSETS_PATH, expiresAt } from '@/content/shared-studies/links';

import { CaseStudyArticle } from '@/components/CaseStudyArticle';
import { ILLUSTRATIVE_NOTE, Shot } from '@/components/CaseStudy';

interface SharedCasePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: SharedCasePageProps): Promise<Metadata> {
  await connection();
  const shared = getSharedStudy((await params).id);
  if (!shared) return {};
  return {
    description: shared.study.summary,
    openGraph: { description: shared.study.summary, title: shared.study.title },
    robots: { follow: false, index: false },
    title: `${shared.study.title} | Luigelo Davila`,
  };
}

/**
 * An unlisted case study behind a shared link. Rendered on every request,
 * so the link stops working the moment it expires, even before
 * `npm run case:purge` removes it from the repository.
 */
export default async function SharedCasePage({ params }: SharedCasePageProps) {
  await connection();
  const shared = getSharedStudy((await params).id);
  if (!shared) notFound();

  const { link, study } = shared;
  const { default: Content } = await study.load();
  const basePath = `${ASSETS_PATH}/${link.id}`;
  const expiry = expiresAt(link).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  });

  return (
    <article className='space-y-10'>
      <Link
        href='/'
        className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeftIcon className='size-3.5' aria-hidden='true' />
        Luigelo Davila
      </Link>

      <CaseStudyArticle
        title={study.title}
        byline={study.byline}
        facts={study.facts}
        stack={study.stack}
      >
        <Content
          components={{
            Shot: (props: { src: string; alt: string }) => (
              <Shot {...props} basePath={basePath} />
            ),
          }}
        />
      </CaseStudyArticle>

      <footer className='space-y-1 border-t pt-4 text-xs text-muted-foreground text-pretty'>
        <p>† {ILLUSTRATIVE_NOTE}</p>
        <p>
          Shared privately, not listed on this site. The link works until{' '}
          {expiry}.
        </p>
      </footer>
    </article>
  );
}
