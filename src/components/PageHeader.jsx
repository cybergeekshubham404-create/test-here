import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function PageHeader({ title, subtitle, showBackLink = false }) {
  return (
    <header style={{ marginBottom: '2rem' }}>
      {showBackLink && (
        <Link to="/" style={{ textDecoration: 'none', color: '#6366f1' }}>
          ← Back to list
        </Link>
      )}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{title}</h1>
      {subtitle && (
        <p style={{ margin: 0, fontSize: '1.05rem', color: '#4b5563' }}>{subtitle}</p>
      )}
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  showBackLink: PropTypes.bool
};
