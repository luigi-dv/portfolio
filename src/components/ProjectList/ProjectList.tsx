import React from 'react';

import dayjs from 'dayjs';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  LockIcon,
  StarIcon,
} from 'lucide-react';

import { Project } from '@/types/Project';
import { GitHubRepository } from '@/types/GitHubActivity';

dayjs.extend(relativeTime);

type ProjectWithRepository = Project & {
  caseStudyHref: string | null;
  repository: GitHubRepository | null;
};

const RepositoryMeta = ({ repository }: { repository: GitHubRepository }) => (
  <span className='inline-flex items-center gap-3'>
    {repository.primaryLanguage && (
      <span className='inline-flex items-center gap-1'>
        <span
          className='size-2 rounded-full'
          style={{ backgroundColor: repository.primaryLanguage.color }}
          aria-hidden='true'
        />
        {repository.primaryLanguage.name}
      </span>
    )}
    <span className='inline-flex items-center gap-1'>
      <StarIcon className='size-3' aria-hidden='true' />
      {repository.stargazerCount}
      <span className='sr-only'>stars</span>
    </span>
    <span>Updated {dayjs(repository.pushedAt).fromNow()}</span>
  </span>
);

export const ProjectList = ({
  projects,
}: {
  projects: ProjectWithRepository[];
}) => (
  <ul className='divide-y border-y'>
    {projects.map((project) => {
      const href = project.href ?? project.repository?.url;
      return (
        <li key={project.title} className='relative py-5 group'>
          <div className='flex items-baseline justify-between gap-4'>
            <h3 className='font-medium leading-snug'>
              {href ? (
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 after:absolute after:inset-0 hover:text-primary'
                >
                  {project.title}
                  <ArrowUpRightIcon className='size-3.5' aria-hidden='true' />
                </a>
              ) : (
                project.title
              )}
            </h3>
            <span className='shrink-0 text-xs tabular-nums text-muted-foreground'>
              {project.year}
            </span>
          </div>
          <p className='mt-0.5 text-xs text-muted-foreground'>
            {project.context}
          </p>
          <p className='mt-2 text-sm text-pretty max-w-prose'>
            {project.outcome}
          </p>
          {project.caseStudyHref && (
            <Link
              href={project.caseStudyHref}
              className='relative z-10 mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline'
            >
              Read the case study
              <ArrowRightIcon className='size-3.5' aria-hidden='true' />
            </Link>
          )}
          <div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground'>
            <span>{project.stack.join(', ')}</span>
            {project.repository ? (
              <RepositoryMeta repository={project.repository} />
            ) : (
              project.private && (
                <span className='inline-flex items-center gap-1'>
                  <LockIcon className='size-3' aria-hidden='true' />
                  Private codebase
                </span>
              )
            )}
          </div>
        </li>
      );
    })}
  </ul>
);
