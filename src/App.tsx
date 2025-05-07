import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrugList from './components/DrugList';
import ApiSearch from './components/ApiSearch';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/drug-list" element={<DrugList />} />
        <Route path="/api-search" element={<ApiSearch />} />
        <Route path="/" element={<DrugList />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;