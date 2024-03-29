import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Layout from './components/Layout';
import Kurs from './pages/Course';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Module from './pages/Module';
import Modules from './pages/Modules';
import Pruefungstermine from './pages/Pruefungstermine';
import Settings from './pages/Settings';
import Students from './pages/Students';
import Teilnahmen from './pages/Teilnahmen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard pageTitle="Dashboard" />} />
          <Route path="kurse" element={<Courses />} />
          <Route path="kurse/:id" element={<Kurs />} />
          <Route path="studenten" element={<Students />} />
          <Route path="module" element={<Modules />} />
          <Route path="module/:id" element={<Module />} />
          <Route path="pruefungstermine" element={<Pruefungstermine />} />
          <Route path="pruefungstermine/:id" element={<Teilnahmen />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
