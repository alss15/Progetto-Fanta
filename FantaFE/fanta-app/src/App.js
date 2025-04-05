import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CreatorPage from './pages/CreatorPage';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', fontSize: '16px' }}>Login</button>
      <button onClick={() => navigate('/creator')} style={{ padding: '10px 20px', fontSize: '16px' }}>Creator Page</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/creator" element={<CreatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
