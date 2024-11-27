// App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter import
import PageBuilder from './builder/PageBuilder';
import ApsedecWebsite from './sections';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<ApsedecWebsite />} />
      <Route path="/admin" element={<PageBuilder />} />
    </Routes>
  );
}

export default App;
