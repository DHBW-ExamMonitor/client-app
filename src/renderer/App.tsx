import React from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Layout from './components/Layout';
import WarningDialog from './components/Ui/WarningDialog';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import Pruefungstermine from './pages/Pruefungstermine';
import Students from './pages/Students';
import Teilnahmen from './pages/Teilnahmen';

export default function App() {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <WarningDialog
        open={open}
        setOpen={setOpen}
        title="Achtung"
        message="Für die Nutzung dieser Software empfiehlt es sich, sich einzucremen."
        action={() => {}}
        actionText="Jetzt eincremen"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard pageTitle="Dashboard" />} />
            <Route path="kurse" element={<Courses />} />
            <Route path="studenten" element={<Students />} />
            <Route path="module" element={<Modules />} />
            <Route path="pruefungstermine" element={<Pruefungstermine />} />
            <Route path="teilnahmen/:id" element={<Teilnahmen />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
