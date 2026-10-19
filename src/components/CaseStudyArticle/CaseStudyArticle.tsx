import React from 'react';

interface CaseStudyArticleProps {
  title: string;
  /** Who, when and my role, under the title */
  byline: string;
  facts: { label: string; value: string; illustrative?: boolean }[];
  stack: string[];
  /** Shown above the title, e.g. the draft badge */
  notice?: React.ReactNode;
  /** The MDX write-up */
  children: React.ReactNode;
}

/** Header with key facts, then the write-up in prose typography. */
export const CaseStudyArticle = ({
  byline,
  children,
  facts,
  notice,
  stack,
  title,
}: CaseStudyArticleProps) => (
  <>
    <header className='space-y-4'>
      {notice}
      <h1 className='font-display text-2xl sm:text-4xl font-bold tracking-tighter leading-tight text-balance'>
        {title}
      </h1>
      <p className='text-sm text-muted-foreground'>{byline}</p>
      <dl className='flex flex-wrap gap-x-10 gap-y-4 border-y py-4'>
        {facts.map((fact) => (
          <div key={fact.label} className='flex flex-col-reverse gap-0.5'>
            <dt className='text-xs text-muted-foreground'>{fact.label}</dt>
            <dd className='font-display text-lg font-semibold tracking-tight whitespace-nowrap'>
              {fact.value}
              {fact.illustrative && (
                <sup className='ml-0.5 font-sans text-xs font-normal text-muted-foreground'>
                  †
                </sup>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className='text-xs text-muted-foreground'>{stack.join(', ')}</p>
    </header>

    <div className='prose prose-neutral dark:prose-invert max-w-none text-pretty prose-headings:font-display prose-headings:tracking-tight prose-h2:text-lg prose-h2:mt-10 prose-a:text-primary prose-li:my-1 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-code:text-[0.875em] prose-pre:bg-muted prose-pre:text-foreground'>
      {children}
    </div>
  </>
);
