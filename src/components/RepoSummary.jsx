import PropTypes from 'prop-types';

export function RepoSummary({ summary }) {
  if (!summary) {
    return null;
  }

  return (
    <section className="card" style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Org highlights</h2>
      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#6b7280' }}>
            Most used languages
          </h3>
          <ul style={{ marginTop: '0.75rem', padding: 0 }}>
            {summary.languages.slice(0, 5).map(([language, count]) => (
              <li key={language} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{language}</span>
                <span style={{ color: '#6b7280' }}>{count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', color: '#6b7280' }}>
            Trending repos
          </h3>
          <ul style={{ marginTop: '0.75rem', padding: 0 }}>
            {summary.popular.map((repo) => (
              <li key={repo.id} style={{ marginBottom: '0.6rem' }}>
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#4338ca', fontWeight: 600, textDecoration: 'none' }}
                >
                  {repo.name}
                </a>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  {repo.watchersCount.toLocaleString()} watchers ·{' '}
                  {repo.forksCount.toLocaleString()} forks
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

RepoSummary.propTypes = {
  summary: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.array).isRequired,
    popular: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        htmlUrl: PropTypes.string.isRequired,
        watchersCount: PropTypes.number.isRequired,
        forksCount: PropTypes.number.isRequired
      })
    ).isRequired
  })
};
