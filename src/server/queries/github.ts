import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import { GITHUB_HANDLE } from '~/config/site';

export async function getGithubStars() {
  return await cache(
    async () => {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_HANDLE}/versator`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          next: {
            revalidate: 60,
          },
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { stargazers_count: number };

      return data.stargazers_count;
    },
    ['github-stars'],
    {
      revalidate: 1090,
      tags: ['github-stars'],
    }
  )();
}
