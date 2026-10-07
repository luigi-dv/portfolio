import React from 'react';

import { ArrowRightIcon } from 'lucide-react';
import { CaseStudy } from '@/content/case-studies';

import { TrackedLink } from '@/components/TrackedLink';

/**
 * Prominent card for a case study: context, title, summary and key facts.
 * The whole card is clickable through the title link.
 */
export const CaseStudyCard = ({
  study,
}: {
  study: Omit<CaseStudy, 'load'>;
}) => (
  <article className='relative rounded-xl border bg-card p-5 sm:p-6 transition-colors hover:border-primary/60'>
    <p className='text-xs text-muted-foreground'>
      {study.company}, {study.period}
    </p>
    <h3 className='mt-1.5 font-display text-base sm:text-lg font-semibold tracking-tight text-balance'>
      <TrackedLink
        href={`/work/${study.slug}`}
        event='Case study open'
        eventData={{ location: 'selected-work', project: study.slug }}
        className='after:absolute after:inset-0 after:rounded-xl'
      >
        {study.title}
      </TrackedLink>
    </h3>
    <p className='mt-2 text-sm text-muted-foreground text-pretty max-w-prose'>
      {study.summary}
    </p>
    <dl className='mt-4 flex flex-wrap gap-x-8 gap-y-3 border-t pt-4'>
      {study.facts.map((fact) => (
        <div key={fact.label} className='flex flex-col-reverse gap-0.5'>
          <dt className='text-xs text-muted-foreground'>{fact.label}</dt>
          <dd className='font-display text-base font-semibold tracking-tight whitespace-nowrap'>
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
    <p
      className='mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary'
      aria-hidden='true'
    >
      Read the case study
      <ArrowRightIcon className='size-3.5' />
    </p>
  </article>
);
