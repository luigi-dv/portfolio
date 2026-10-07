import React from 'react';

import type { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';
import { formatPeriod } from '@/utilities/date';
import { renderInline } from '@/utilities/markdown';
import { ArrowLeftIcon, DownloadIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getCvData } from '@/services/cvService';
import { buttonVariants } from '@/components/ui/button';

export const metadata: Metadata = {
  description: 'CV of Luigelo Davila, senior full-stack engineer.',
  title: 'CV | Luigelo Davila',
};

const CvSection = ({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className='mt-5'>
    <h2 className='mb-2.5 border-b pb-1 font-display text-[10.5pt] font-semibold tracking-tight text-primary break-after-avoid'>
      {title}
    </h2>
    {children}
  </section>
);

/**
 * Print-ready CV. `npm run cv:export` prints this page to
 * `public/cv/<fileName>` with headless Chrome.
 */
export default async function CvPage() {
  const cv = await getCvData();
  const { basics } = cv;
  const pdfUrl = `/cv/${cv.meta.fileName}`;

  return (
    <div className='light min-h-screen bg-muted/50 text-foreground py-6 sm:py-10 print:bg-white print:p-0'>
      <nav className='mx-auto mb-4 flex w-full max-w-[210mm] items-center justify-between px-4 sm:px-0 print:hidden'>
        <Link
          href='/'
          className={cn(
            buttonVariants({ size: 'sm', variant: 'ghost' }),
            'gap-1.5'
          )}
        >
          <ArrowLeftIcon className='size-3.5' aria-hidden='true' />
          Back to portfolio
        </Link>
        <a
          href={pdfUrl}
          download
          className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}
        >
          <DownloadIcon className='size-3.5' aria-hidden='true' />
          Download PDF
        </a>
      </nav>

      <article className='mx-auto w-full max-w-[210mm] bg-background px-6 py-8 text-[9.5pt] leading-[1.45] shadow-sm sm:px-[16mm] sm:py-[14mm] print:max-w-none print:p-0 print:shadow-none'>
        <header className='flex items-start justify-between gap-6'>
          <div>
            <h1 className='font-display text-[22pt] font-bold leading-none tracking-tight'>
              {basics.name}
            </h1>
            <p className='mt-2 text-[12pt]'>{basics.headline}</p>
            <p className='mt-1 text-muted-foreground'>
              {basics.location}
              {basics.availability && <>. {basics.availability}.</>}
            </p>
            <ul className='mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[9pt]'>
              {basics.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className='text-primary'>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {cv.meta.showPhoto && (
            <Image
              src={basics.photoUrl}
              alt={basics.name}
              width={96}
              height={96}
              priority
              className='size-[24mm] shrink-0 rounded-full border object-cover'
            />
          )}
        </header>

        <CvSection title='Summary'>
          <p className='text-pretty'>{renderInline(cv.summary)}</p>
        </CvSection>

        <CvSection title='Experience'>
          <div className='space-y-4'>
            {cv.experience.map((item) => (
              <div key={item.company}>
                <div className='flex items-baseline justify-between gap-4 break-after-avoid'>
                  <h3 className='text-[10.5pt] font-semibold'>
                    {item.company}
                    {item.context && (
                      <span className='font-normal text-muted-foreground'>
                        , {item.context}
                      </span>
                    )}
                  </h3>
                  <span className='shrink-0 text-muted-foreground'>
                    {item.location}
                  </span>
                </div>
                <div className='mt-1.5 space-y-3'>
                  {item.roles.map((role) => (
                    <div
                      key={`${role.title}-${role.start}`}
                      className='break-inside-avoid'
                    >
                      <div className='flex items-baseline justify-between gap-4'>
                        <p>
                          <span className='font-medium'>{role.title}</span>
                          {role.note && (
                            <span className='text-muted-foreground'>
                              , {role.note}
                            </span>
                          )}
                        </p>
                        <span className='shrink-0 tabular-nums text-muted-foreground'>
                          {formatPeriod(role.start, role.end)}
                        </span>
                      </div>
                      {role.intro && (
                        <p className='mt-0.5 text-pretty'>{role.intro}</p>
                      )}
                      {role.bullets.length > 0 && (
                        <ul className='mt-1 list-disc space-y-0.5 pl-4 marker:text-muted-foreground'>
                          {role.bullets.map((bullet) => (
                            <li key={bullet} className='text-pretty'>
                              {renderInline(bullet)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CvSection>

        <CvSection title='Skills'>
          <dl className='grid grid-cols-[30mm_1fr] gap-x-4 gap-y-1 break-inside-avoid'>
            {cv.skills.map((group) => (
              <React.Fragment key={group.label}>
                <dt className='font-medium'>{group.label}</dt>
                <dd>{group.items.join(', ')}</dd>
              </React.Fragment>
            ))}
          </dl>
        </CvSection>

        <div className='break-inside-avoid'>
          <CvSection title='Education'>
            <ul className='space-y-1'>
              {cv.education.map((education) => (
                <li
                  key={education.degree}
                  className='flex items-baseline justify-between gap-4'
                >
                  <span>
                    <span className='font-medium'>{education.degree}</span>,{' '}
                    {education.school}, {education.location}
                  </span>
                  <span className='shrink-0 tabular-nums text-muted-foreground'>
                    {formatPeriod(education.start, education.end)}
                  </span>
                </li>
              ))}
              {cv.certifications.map((certification) => (
                <li
                  key={certification.name}
                  className='flex items-baseline justify-between gap-4'
                >
                  <span>
                    <span className='font-medium'>{certification.name}</span>,{' '}
                    {certification.issuer}
                  </span>
                  <span className='shrink-0 tabular-nums text-muted-foreground'>
                    {certification.year}
                  </span>
                </li>
              ))}
            </ul>
          </CvSection>

          <CvSection title='Languages'>
            <p>
              {cv.languages
                .map((language) => `${language.name} (${language.level})`)
                .join(', ')}
            </p>
          </CvSection>
        </div>
      </article>
    </div>
  );
}
