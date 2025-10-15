import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { RepoListPage } from '../routes/RepoListPage.jsx';

const mockRepos = [
  {
    id: 1,
    name: 'project-alpha',
    full_name: 'godaddy/project-alpha',
    description: 'Alpha project',
    html_url: 'https://github.com/godaddy/project-alpha',
    language: 'TypeScript',
    forks_count: 10,
    open_issues_count: 2,
    watchers_count: 50,
    topics: ['dns', 'hosting']
  },
  {
    id: 2,
    name: 'project-beta',
    full_name: 'godaddy/project-beta',
    description: 'Beta project',
    html_url: 'https://github.com/godaddy/project-beta',
    language: 'JavaScript',
    forks_count: 5,
    open_issues_count: 1,
    watchers_count: 20,
    topics: []
  }
];

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => mockRepos
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('renders repository cards after loading', async () => {
  render(
    <MemoryRouter>
      <RepoListPage />
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByText(/fetching repositories/i));

  expect(screen.getByText('project-alpha')).toBeInTheDocument();
  expect(screen.getByText('project-beta')).toBeInTheDocument();
  expect(screen.getByText(/org highlights/i)).toBeInTheDocument();
});

it('shows an error message when the request fails', async () => {
  vi.restoreAllMocks();
  vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false });

  render(
    <MemoryRouter>
      <RepoListPage />
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByText(/fetching repositories/i));

  expect(screen.getByRole('alert')).toHaveTextContent('Unable to fetch repositories');
});
