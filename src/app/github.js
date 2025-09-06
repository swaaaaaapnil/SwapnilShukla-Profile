export async function getGithubProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    cache: 'no-store',          // always fetch fresh
    headers: {
      'User-Agent': 'portfolio',
      // Optional: add token to avoid 60/hr limit:
      // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
  });
  if (!res.ok) throw new Error('GitHub profile fetch failed');
  return res.json();
}

export async function getGithubRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
    cache: 'no-store',
    headers: { 'User-Agent': 'portfolio' },
  });
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}
