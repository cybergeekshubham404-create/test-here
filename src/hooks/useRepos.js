import { useEffect, useMemo, useState } from 'react';

const API_URL = 'https://api.github.com/orgs/godaddy/repos';

function normaliseRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    htmlUrl: repo.html_url,
    language: repo.language,
    forksCount: repo.forks_count,
    openIssuesCount: repo.open_issues_count,
    watchersCount: repo.watchers_count,
    topics: repo.topics || []
  };
}

export function useRepos() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRepos() {
      setStatus('loading');
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Unable to fetch repositories');
        }
        const data = await response.json();
        if (!cancelled) {
          const mapped = Array.isArray(data) ? data.map(normaliseRepo) : [];
          setRepos(mapped);
          setStatus('resolved');
        }
      } catch (err) {
        if (!cancelled) {
          setStatus('rejected');
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      }
    }

    fetchRepos();

    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(() => {
    if (!repos.length) {
      return null;
    }

    const languages = repos
      .map((repo) => repo.language)
      .filter(Boolean)
      .reduce((acc, language) => {
        acc.set(language, (acc.get(language) || 0) + 1);
        return acc;
      }, new Map());

    const popular = [...repos]
      .sort((a, b) => b.watchersCount - a.watchersCount)
      .slice(0, 3);

    return {
      languages: [...languages.entries()].sort((a, b) => b[1] - a[1]),
      popular
    };
  }, [repos]);

  return { repos, status, error, summary };
}

export function findRepo(repos, name) {
  return repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase());
}
