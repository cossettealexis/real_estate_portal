import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/core/Navbar';

import Register from './pages/signup/Register';
import ResidentialForm from './pages/signup/ResidentialAddress';
import Home from './pages/Home';
import Properties from './components/properties/Properties';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/residential-address" element={<ResidentialForm />} />
          <Route path="/properties" element={<Properties />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
