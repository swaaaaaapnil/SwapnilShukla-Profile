export async function getGithubProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export async function getGithubRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}
