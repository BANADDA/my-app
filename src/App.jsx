// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PageBuilder from './builder/PageBuilder';
import ApsedecWebsite from './sections';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<ApsedecWebsite />} />
        <Route path="/admin" element={<PageBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
