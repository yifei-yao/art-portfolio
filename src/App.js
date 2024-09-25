// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/:categoryName" element={<Content />} />
        <Route path="/:categoryName/:year" element={<Content />} />
      </Routes>
    </Router>
  );
}

export default App;
