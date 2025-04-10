import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/AdminPage';
import CreatorPage from './pages/CreatorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import HomeSocial from './pages/HomeSocial';
import Profilo from './pages/Profilo';
import AuthProvider from './context/AuthContext';
import HomePage from './pages/HomePage';
import SfidaDetails from './components/SfidaDetails';
import SfideList from './components/SfideList';

function App() {
  return (
    <AuthProvider>
<<<<<<< HEAD
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/creator" element={<CreatorPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/home-social" element={<HomeSocial />} />
        <Route path="/profilo" element={<Profilo />} />
        <Route path="/sfida/:id" element={<SfidaDetails />} />"
        <Route path="/sfide" element={<SfideList />} />
      </Routes>
    </Router>
=======
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/creator" element={<CreatorPage />} />
          <Route path="/registrati" element={<RegisterPage />} />
          <Route path="/home-social" element={<HomeSocial />} />
          <Route path="/profilo" element={<Profilo />} />
          <Route path="/sfida/:id" element={<SfidaDetails />} />"
          <Route path="/sfide" element={<SfideList />} />
        </Routes>
      </Router>
>>>>>>> 817eaa518c52babcda18f1792249fc66e76e8e23
    </AuthProvider>
  );
}

export default App;