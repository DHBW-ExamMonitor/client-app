import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="dashboard"
            element={<Dashboard pageTitle="Dashboard" />}
          />
          <Route path="kurse" element={<Dashboard pageTitle="Kurse" />} />
          <Route
            path="studenten"
            element={<Dashboard pageTitle="Studenten" />}
          />
          <Route path="module" element={<Dashboard pageTitle="Module" />} />
          <Route
            path="pruefungstermine"
            element={<Dashboard pageTitle="Prüfungstermine" />}
          />
          <Route
            path="pruefungsteilnahmen"
            element={<Dashboard pageTitle="Prüfungsteilnahme" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}
