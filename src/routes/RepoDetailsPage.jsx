import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.jsx';
import { RepoStats } from '../components/RepoStats.jsx';
import { useRepos, findRepo } from '../hooks/useRepos.js';

export function RepoDetailsPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const { repos, status } = useRepos();

  const repo = useMemo(() => findRepo(repos, name ?? ''), [repos, name]);

  if (status === 'loading' || status === 'idle') {
    return (
      <main>
        <PageHeader title="Loading…" showBackLink />
      </main>
    );
  }

  if (!repo) {
    return (
      <main>
        <PageHeader
          title="Repository not found"
          subtitle="We couldn't find the repository you're looking for."
          showBackLink
        />
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 0.85rem',
            borderRadius: '10px',
            border: 'none',
            background: '#111827',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Return to list
        </button>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title={repo.name}
        subtitle={repo.description || 'No description provided.'}
        showBackLink
      />
      <section className="card">
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick facts</h2>
        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem'
          }}
        >
          <div>
            <dt style={{ fontWeight: 600, color: '#4b5563' }}>Languages</dt>
            <dd style={{ margin: '0.25rem 0 0', color: '#111827' }}>
              {repo.language || 'Not specified'}
            </dd>
          </div>
          <div>
            <dt style={{ fontWeight: 600, color: '#4b5563' }}>Repository link</dt>
            <dd style={{ margin: '0.25rem 0 0' }}>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
              >
                View on GitHub ↗
              </a>
            </dd>
          </div>
          <div>
            <dt style={{ fontWeight: 600, color: '#4b5563' }}>Full name</dt>
            <dd style={{ margin: '0.25rem 0 0', color: '#111827' }}>{repo.fullName}</dd>
          </div>
        </dl>
        <RepoStats repo={repo} />
      </section>
    </main>
  );
}
