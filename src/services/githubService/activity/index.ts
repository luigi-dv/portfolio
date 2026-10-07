import { githubGraphQL } from '@/lib/github';
import { ContributionDay, GitHubActivity } from '@/types/GitHubActivity';

const ACTIVITY_QUERY = /* GraphQL */ `
  query {
    viewer {
      login
      contributionsCollection {
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              weekday
            }
          }
        }
      }
      pullRequests(states: MERGED) {
        totalCount
      }
      repositoriesContributedTo(
        includeUserRepositories: true
        contributionTypes: [COMMIT, PULL_REQUEST, PULL_REQUEST_REVIEW]
      ) {
        totalCount
      }
    }
  }
`;

interface ActivityResponse {
  viewer: {
    login: string;
    contributionsCollection: {
      restrictedContributionsCount: number;
      contributionCalendar: {
        totalContributions: number;
        weeks: { contributionDays: ContributionDay[] }[];
      };
    };
    pullRequests: { totalCount: number };
    repositoriesContributedTo: { totalCount: number };
  };
}

/**
 * Contribution activity for the token owner over the last year,
 * including private contributions (counts only, no repository details).
 */
export const getGitHubActivity = async (): Promise<GitHubActivity | null> => {
  const data = await githubGraphQL<ActivityResponse>(ACTIVITY_QUERY);
  if (!data?.viewer) return null;

  const { viewer } = data;
  const { contributionCalendar, restrictedContributionsCount } =
    viewer.contributionsCollection;
  const weeks = contributionCalendar.weeks.map((week) => week.contributionDays);

  return {
    login: viewer.login,
    mergedPullRequests: viewer.pullRequests.totalCount,
    privateContributions: restrictedContributionsCount,
    repositoriesContributedTo: viewer.repositoriesContributedTo.totalCount,
    totalContributions: contributionCalendar.totalContributions,
    weeks,
  };
};
