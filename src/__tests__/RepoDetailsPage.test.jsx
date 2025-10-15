import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { RepoDetailsPage } from '../routes/RepoDetailsPage.jsx';

const repo = {
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
};

beforeEach(() => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => [repo]
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

it('shows repository data when a matching repo exists', async () => {
  render(
    <MemoryRouter initialEntries={[`/repo/${repo.name}`]}>
      <Routes>
        <Route path="/repo/:name" element={<RepoDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('project-alpha');
  expect(screen.getByText(/view on github/i)).toHaveAttribute('href', repo.html_url);
  expect(screen.getByText(/forks/i).previousSibling).toHaveTextContent('10');
});

it('renders a not found message for an unknown repo', async () => {
  vi.restoreAllMocks();
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => []
  });

  render(
    <MemoryRouter initialEntries={[`/repo/unknown`]}>
      <Routes>
        <Route path="/repo/:name" element={<RepoDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(screen.getByText(/repository not found/i)).toBeInTheDocument();
});
