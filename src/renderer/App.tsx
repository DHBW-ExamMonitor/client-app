import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/studenten" element={<Layout />} />
        <Route path="/pruefungstermine" element={<Layout />} />
        <Route path="/pruefungsteilnahmen" element={<Layout />} />
        <Route path="/kurse" element={<Layout />} />
        <Route path="/module" element={<Layout />} />
      </Routes>
    </Router>
  );
}
