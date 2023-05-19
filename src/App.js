import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Search from './pages/Search';
import User from './pages/User';

function App() {
  return (
      <main className="container">
        <Routes>
          <Route path="/gh-finder" element={<Search />} />
          <Route path="/gh-finder/user/:username" element={<User />} />
        </Routes>
      </main>
  );
}

export default App;
