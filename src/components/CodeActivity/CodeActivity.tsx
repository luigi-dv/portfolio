import React from 'react';

import Link from 'next/link';

import { getGitHubActivity } from '@/services/githubService';
import { ContributionGraph } from '@/components/ContributionGraph';

const formatNumber = (value: number) => value.toLocaleString('en-US');

interface CodeActivityProps {
  profileUrl: string;
}

/**
 * Last year of GitHub activity, private contributions included.
 * Renders nothing when GitHub data is unavailable.
 */
export const CodeActivity = async ({ profileUrl }: CodeActivityProps) => {
  const activity = await getGitHubActivity();
  if (!activity) return null;

  const {
    mergedPullRequests,
    privateContributions,
    repositoriesContributedTo,
    totalContributions,
    weeks,
  } = activity;
  const privateShare = Math.round(
    (privateContributions / Math.max(totalContributions, 1)) * 100
  );
  const privateNote =
    privateShare >= 100
      ? ', all of them in private repositories'
      : privateShare > 0
        ? `, ${privateShare}% of them in private repositories`
        : '';

  return (
    <div className='space-y-4'>
      <p className='text-sm text-pretty max-w-prose'>
        <strong className='font-semibold'>
          {formatNumber(totalContributions)} contributions
        </strong>{' '}
        in the past year{privateNote}. {formatNumber(mergedPullRequests)} merged
        pull requests in total, and {repositoriesContributedTo} repositories
        contributed to this year.
      </p>
      <ContributionGraph
        weeks={weeks}
        label={`${formatNumber(totalContributions)} GitHub contributions in the past year`}
      />
      <Link
        href={profileUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='text-sm font-medium text-primary underline-offset-4 hover:underline w-fit'
      >
        View GitHub profile
      </Link>
    </div>
  );
};

export const CodeActivitySkeleton = () => (
  <div className='space-y-4' aria-hidden='true'>
    <div className='h-5 w-4/5 rounded bg-muted animate-pulse' />
    <div className='aspect-[7/1] w-full rounded bg-muted animate-pulse' />
  </div>
);
