import { RepoList } from '../components/RepoList.jsx';
import { RepoSummary } from '../components/RepoSummary.jsx';
import { PageHeader } from '../components/PageHeader.jsx';
import { useRepos } from '../hooks/useRepos.js';

export function RepoListPage() {
  const { repos, status, error, summary } = useRepos();

  return (
    <main>
      <PageHeader
        title="GoDaddy open source"
        subtitle="A quick look at what the GoDaddy engineering teams are sharing with the community."
      />

      {status === 'loading' && <p>Fetching repositories…</p>}
      {status === 'rejected' && <p role="alert">{error?.message}</p>}

      {status === 'resolved' && (
        <>
          <RepoSummary summary={summary} />
          <RepoList repos={repos} />
        </>
      )}
    </main>
  );
}
