export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

export interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
  weekday: number;
}

export interface GitHubActivity {
  login: string;
  totalContributions: number;
  privateContributions: number;
  mergedPullRequests: number;
  repositoriesContributedTo: number;
  weeks: ContributionDay[][];
}

export interface GitHubRepository {
  nameWithOwner: string;
  url: string;
  stargazerCount: number;
  pushedAt: string;
  primaryLanguage: { name: string; color: string } | null;
}
