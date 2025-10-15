import { Route, Routes } from 'react-router-dom';
import { RepoListPage } from './routes/RepoListPage.jsx';
import { RepoDetailsPage } from './routes/RepoDetailsPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RepoListPage />} />
      <Route path="/repo/:name" element={<RepoDetailsPage />} />
    </Routes>
  );
}

export default App;
