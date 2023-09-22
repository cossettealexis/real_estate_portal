import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from './components/core/Navbar';

import Register from './pages/signup/Register';
import ResidentialForm from './pages/signup/ResidentialAddress';
import CitizenshipForm from './pages/signup/Citizenship';
import AccountTypeForm from './pages/signup/AccountType';
import BirthdateForm from './pages/signup/BirthDate';
import NetworthForm from './pages/signup/NetWorth';
import BankForm from './pages/signup/Bank';
import DocumentsForm from './pages/signup/UploadDocuments';

import Home from './pages/Home';
import Properties from './components/properties/Properties';
import PropertyDetail from './components/properties/PropertyDetail';

function App() {
  const apiHost = process.env.REACT_APP_API_HOST;
  const currentPath = window.location.pathname;
  console.log(currentPath);

  function redirectToExternalUrl(url) {
    window.location.href = url;
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/residential-address" element={<ResidentialForm />} />
          <Route path="/citizenship" element={<CitizenshipForm />} />
          <Route path="/account-type" element={<AccountTypeForm />} />
          <Route path="/birth-date" element={<BirthdateForm />} />
          <Route path="/networth" element={<NetworthForm />} />
          <Route path="/bank" element={<BankForm />} />
          <Route path="/documents" element={<DocumentsForm />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property" element={<PropertyDetail />} />
          <Route
            path="/admin"
            element={currentPath === '/admin' || '/admin/' ? redirectToExternalUrl(`${apiHost}/admin/`): ''}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
