const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

/** How long GitHub data is cached before the page regenerates (seconds) */
export const GITHUB_REVALIDATE = 3600;

/**
 * Runs a GitHub GraphQL query with the server-side token.
 * Returns `null` instead of throwing so the page still renders when GitHub
 * is unavailable or the token is missing/expired.
 */
export const githubGraphQL = async <T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('GITHUB_TOKEN is not set; skipping GitHub data.');
    return null;
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      body: JSON.stringify({ query, variables }),
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      next: { revalidate: GITHUB_REVALIDATE, tags: ['github'] },
    });

    if (!response.ok) {
      console.error(`GitHub GraphQL request failed: ${response.status}`);
      return null;
    }

    const { data, errors } = await response.json();
    if (errors?.length) {
      console.error('GitHub GraphQL errors:', errors);
    }
    return (data as T) ?? null;
  } catch (error) {
    console.error('There was a problem fetching GitHub data:', error);
    return null;
  }
};
