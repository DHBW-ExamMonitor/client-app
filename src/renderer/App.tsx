import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Layout from './components/Layout';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Students from './pages/Students';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="dashboard"
            element={<Dashboard pageTitle="Dashboard" />}
          />
          <Route path="kurse" element={<Courses />} />
          <Route path="studenten" element={<Students />} />
          <Route path="module" element={<Modules />} />
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
