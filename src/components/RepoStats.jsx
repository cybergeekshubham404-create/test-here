import PropTypes from 'prop-types';

const STAT_LABELS = {
  forksCount: { label: 'Forks', icon: '🍴' },
  openIssuesCount: { label: 'Open issues', icon: '🐞' },
  watchersCount: { label: 'Watchers', icon: '👀' }
};

export function RepoStats({ repo }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginTop: '1.5rem'
      }}
    >
      {Object.entries(STAT_LABELS).map(([key, { label, icon }]) => (
        <div
          key={key}
          className="card"
          style={{
            background: '#f9fafb',
            boxShadow: 'none',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '1.5rem' }} aria-hidden>
            {icon}
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            {repo[key].toLocaleString()}
          </div>
          <div style={{ color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase' }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

RepoStats.propTypes = {
  repo: PropTypes.shape({
    forksCount: PropTypes.number.isRequired,
    openIssuesCount: PropTypes.number.isRequired,
    watchersCount: PropTypes.number.isRequired
  }).isRequired
};
