import React from 'react';

import type { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { caseStudies, getCaseStudy, isPublished } from '@/content/case-studies';

import { CaseStudyArticle } from '@/components/CaseStudyArticle';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.filter(isPublished).map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    description: study.summary,
    openGraph: { description: study.summary, title: study.title },
    title: `${study.title} | Luigelo Davila`,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const { default: Content } = await study.load();

  return (
    <article className='space-y-10'>
      <Link
        href='/#work'
        className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeftIcon className='size-3.5' aria-hidden='true' />
        Selected work
      </Link>

      <CaseStudyArticle
        title={study.title}
        byline={`${study.company}, ${study.period}. ${study.role}.`}
        facts={study.facts}
        stack={study.stack}
        notice={
          study.draft && (
            <p className='w-fit rounded-md border border-dashed border-amber-500/60 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-300'>
              Draft, hidden in production
            </p>
          )
        }
      >
        <Content />
      </CaseStudyArticle>
    </article>
  );
}
