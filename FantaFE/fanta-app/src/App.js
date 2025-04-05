import './App.css';
import React  from 'react';
import AuthProvider from './context/AuthContext';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <LoginPage />
  );
}

export default App;
