import { githubGraphQL } from '@/lib/github';
import { GitHubRepository } from '@/types/GitHubActivity';

const REPOSITORY_QUERY = /* GraphQL */ `
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      nameWithOwner
      url
      stargazerCount
      pushedAt
      primaryLanguage {
        name
        color
      }
    }
  }
`;

/**
 * Live details for a public repository, given as `owner/name`.
 */
export const getRepository = async (
  nameWithOwner: string
): Promise<GitHubRepository | null> => {
  const [owner, name] = nameWithOwner.split('/');
  if (!owner || !name) return null;

  const data = await githubGraphQL<{ repository: GitHubRepository | null }>(
    REPOSITORY_QUERY,
    { name, owner }
  );
  return data?.repository ?? null;
};
