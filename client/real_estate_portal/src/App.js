import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/core/Navbar';

import Register from './pages/signup/Register';
import Home from './pages/Home';
import Properties from './components/properties/Properties';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/register" exact element={<Register />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/properties" exact element={<Properties />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
