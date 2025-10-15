import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function RepoList({ repos }) {
  if (!repos.length) {
    return <p>No repositories found.</p>;
  }

  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}
    >
      {repos.map((repo) => (
        <li key={repo.id} className="card">
          <article>
            <header>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{repo.name}</h2>
              {repo.topics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      style={{
                        background: '#eef2ff',
                        color: '#4338ca',
                        borderRadius: '999px',
                        padding: '0.25rem 0.65rem',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <p style={{ minHeight: '3.5rem', color: '#374151' }}>
              {repo.description || 'No description provided.'}
            </p>
            <footer style={{ marginTop: '1.5rem' }}>
              <Link
                to={`/repo/${encodeURIComponent(repo.name)}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.5rem 0.95rem',
                  background: '#6366f1',
                  color: '#fff',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                View details →
              </Link>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
}

RepoList.propTypes = {
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired
};
