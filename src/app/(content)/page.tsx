import React, { Suspense } from 'react';

import { formatPeriod } from '@/utilities/date';
import { renderInline } from '@/utilities/markdown';
import { getCaseStudy } from '@/content/case-studies';
import { ArrowRightIcon, DownloadIcon, MapPinIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/Icons';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/Section';
import { Ventures } from '@/components/Ventures';
import { getWorkData } from '@/services/workService';
import { ProjectList } from '@/components/ProjectList';
import { TrackedLink } from '@/components/TrackedLink';
import { buttonVariants } from '@/components/ui/button';
import { getProjects } from '@/services/projectService';
import { PersonJsonLd } from '@/components/PersonJsonLd';
import { getContactData } from '@/services/contactService';
import { getProfileData } from '@/services/profileService';
import { getVentureData } from '@/services/ventureService';
import { getEducationData } from '@/services/educationService';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CodeActivity, CodeActivitySkeleton } from '@/components/CodeActivity';

// Regenerate hourly (matches GITHUB_REVALIDATE) so GitHub activity stays fresh
export const revalidate = 3600;

const Home = async () => {
  const [profile, work, projects, ventures, educationData, contactData] =
    await Promise.all([
      getProfileData(),
      getWorkData(),
      getProjects(),
      getVentureData(),
      getEducationData(),
      getContactData(),
    ]);

  const sameAs = Object.values(contactData?.contact.social ?? {})
    .map((social) => social.url)
    .filter((url) => url.startsWith('https://'));

  return (
    <>
      <PersonJsonLd
        profile={profile}
        currentWork={work[0]}
        education={educationData.education}
        sameAs={sameAs}
      />
      <header className='space-y-8'>
        <div className='flex items-start justify-between gap-6'>
          <div className='space-y-4'>
            <h1 className='font-display text-3xl sm:text-5xl font-bold tracking-tighter leading-[1.05]'>
              {profile.name}
            </h1>
            <p className='text-lg sm:text-xl text-pretty max-w-md'>
              {profile.headline}
            </p>
            <p className='inline-flex items-center gap-1.5 text-sm text-muted-foreground'>
              <MapPinIcon className='size-3.5' aria-hidden='true' />
              {profile.location}
            </p>
            {profile.availability && (
              <p className='flex items-start gap-2 text-sm'>
                <span
                  className='mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500'
                  aria-hidden='true'
                />
                {profile.availability}
              </p>
            )}
          </div>
          <Avatar className='size-20 sm:size-28 shrink-0 border'>
            <AvatarImage
              alt={profile.name}
              src={profile.avatarUrl}
              height={112}
              width={112}
            />
            <AvatarFallback>{profile.initials}</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-wrap gap-2'>
          <TrackedLink
            event='Email click'
            eventData={{ location: 'hero' }}
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants(), 'gap-2')}
          >
            <Icons.email className='size-4' aria-hidden='true' />
            Email me
          </TrackedLink>
          <TrackedLink
            event='LinkedIn click'
            eventData={{ location: 'hero' }}
            href={profile.linkedinUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
          >
            <Icons.linkedin className='size-4' aria-hidden='true' />
            LinkedIn
          </TrackedLink>
          <TrackedLink
            event='GitHub click'
            eventData={{ location: 'hero' }}
            href={profile.githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
          >
            <Icons.github className='size-4' aria-hidden='true' />
            GitHub
          </TrackedLink>
          <TrackedLink
            event='CV download'
            eventData={{ location: 'hero' }}
            href={profile.cvUrl}
            download
            className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}
          >
            <DownloadIcon className='size-4' aria-hidden='true' />
            Download CV
          </TrackedLink>
        </div>
        <div className='space-y-3 text-sm sm:text-base text-muted-foreground text-pretty max-w-prose'>
          {profile.summary.map((paragraph) => (
            <p key={paragraph}>{renderInline(paragraph)}</p>
          ))}
        </div>
      </header>

      <Section id='how-i-work' title='How I work'>
        <ul className='space-y-6'>
          {profile.principles.map((principle) => (
            <li key={principle.title} className='space-y-1.5'>
              <h3 className='font-medium leading-snug'>{principle.title}</h3>

              <p className='text-sm text-muted-foreground text-pretty max-w-prose'>
                {principle.text}
              </p>

              {principle.caseStudy && getCaseStudy(principle.caseStudy) && (
                <TrackedLink
                  href={`/work/${principle.caseStudy}`}
                  event='Case study open'
                  eventData={{ location: 'how-i-work' }}
                  className='inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline'
                >
                  {principle.linkLabel ?? 'Read the case study'}

                  <ArrowRightIcon className='size-3.5' aria-hidden='true' />
                </TrackedLink>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id='work'
        title='Selected work'
        description='Most of this lives in private company codebases, so each entry describes the result rather than linking to the code.'
      >
        <ProjectList projects={projects} />
      </Section>

      <Section
        id='activity'
        title='Code activity'
        description='My GitHub contributions over the past year, including private repositories. Counts only; no private code is shown.'
      >
        <Suspense fallback={<CodeActivitySkeleton />}>
          <CodeActivity profileUrl={profile.githubUrl} />
        </Suspense>
      </Section>

      <Section id='experience' title='Experience'>
        <ExperienceTimeline work={work} />
      </Section>

      <Section
        id='ventures'
        title='Entrepreneurship'
        description='Alongside client work, I run my own studio and build products end to end, from design to launch.'
      >
        <Ventures ventures={ventures} />
      </Section>

      <Section id='skills' title='Skills'>
        <dl className='grid gap-4 sm:grid-cols-[8rem_1fr] sm:gap-x-6 text-sm'>
          {profile.skills.map((group) => (
            <React.Fragment key={group.label}>
              <dt className='font-medium sm:pt-0.5'>{group.label}</dt>
              <dd className='-mt-2 sm:mt-0'>
                <ul className='flex flex-wrap gap-1.5'>
                  {group.items.map((skill) => (
                    <li key={skill}>
                      <Badge variant='secondary' className='font-normal'>
                        {skill}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </React.Fragment>
          ))}
          <dt className='font-medium sm:pt-0.5'>Languages</dt>
          <dd className='-mt-2 sm:mt-0 text-muted-foreground'>
            {profile.languages
              .map((language) => `${language.name} (${language.level})`)
              .join(', ')}
          </dd>
        </dl>
      </Section>

      <Section id='education' title='Education'>
        <ul className='space-y-4'>
          {educationData.education.map((education) => (
            <li key={education.school} className='flex items-center gap-3'>
              <Avatar className='size-10 border bg-white'>
                <AvatarImage
                  src={education.logoUrl}
                  alt=''
                  className='object-contain'
                />
                <AvatarFallback>{education.school[0]}</AvatarFallback>
              </Avatar>
              <div className='flex-1'>
                <h3 className='text-sm font-semibold leading-tight'>
                  <a
                    href={education.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-primary'
                  >
                    {education.school}
                  </a>
                </h3>
                <p className='text-xs text-muted-foreground'>
                  {education.degree}
                </p>
              </div>
              <p className='hidden sm:block text-xs tabular-nums text-muted-foreground'>
                {formatPeriod(education.start, education.end)}
              </p>
            </li>
          ))}
        </ul>
        <h3 className='mt-8 mb-3 text-sm font-semibold'>Certifications</h3>
        <ul className='space-y-2 text-sm'>
          {educationData.certifications.map((certification) => (
            <li
              key={certification.name}
              className='flex items-baseline justify-between gap-4'
            >
              <span>
                {certification.name}
                <span className='text-muted-foreground'>
                  , {certification.issuer}
                </span>
              </span>
              <span className='text-xs tabular-nums text-muted-foreground'>
                {certification.year}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id='contact' title='Get in touch'>
        <p className='text-sm sm:text-base text-pretty max-w-prose'>
          I&apos;m based in Warsaw and work remotely with teams across Europe.
          Email is the fastest way to reach me.
        </p>
        <TrackedLink
          event='Email click'
          eventData={{ location: 'contact' }}
          href={`mailto:${profile.email}`}
          className={cn(buttonVariants({ size: 'lg' }), 'mt-5 w-fit gap-2')}
        >
          <Icons.email className='size-4' aria-hidden='true' />
          {profile.email}
        </TrackedLink>
      </Section>
    </>
  );
};

export default Home;
