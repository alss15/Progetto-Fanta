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
import ListaSfide from './pages/ListaSfide';
import DettagliSfida from './pages/SfidaDetails';

function App() {
  return (
    <AuthProvider>
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
          <Route path="/sfida/:id" element={<DettagliSfida />} />"
          <Route path="/sfide" element={<ListaSfide />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;