import React from 'react';

import type { Metadata } from 'next';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { caseStudies, getCaseStudy, isPublished } from '@/content/case-studies';

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

      <header className='space-y-4'>
        {study.draft && (
          <p className='w-fit rounded-md border border-dashed border-amber-500/60 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-300'>
            Draft, hidden in production
          </p>
        )}
        <h1 className='font-display text-2xl sm:text-4xl font-bold tracking-tighter leading-tight text-balance'>
          {study.title}
        </h1>
        <p className='text-sm text-muted-foreground'>
          {study.company}, {study.period}. {study.role}.
        </p>
        <dl className='flex flex-wrap gap-x-10 gap-y-4 border-y py-4'>
          {study.facts.map((fact) => (
            <div key={fact.label} className='flex flex-col-reverse gap-0.5'>
              <dt className='text-xs text-muted-foreground'>{fact.label}</dt>
              <dd className='font-display text-lg font-semibold tracking-tight whitespace-nowrap'>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className='text-xs text-muted-foreground'>
          {study.stack.join(', ')}
        </p>
      </header>

      <div className='prose prose-neutral dark:prose-invert max-w-none text-pretty prose-headings:font-display prose-headings:tracking-tight prose-h2:text-lg prose-h2:mt-10 prose-a:text-primary prose-li:my-1 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:text-[0.875em] prose-pre:bg-muted prose-pre:text-foreground'>
        <Content />
      </div>
    </article>
  );
}
