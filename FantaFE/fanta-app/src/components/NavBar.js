import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../materials/logo eni-joule.png';
import logo2 from '../materials/logo ey.png';
import logo3 from '../materials/logo startup geeks.png';
import { useAuth } from '../context/AuthContext'; // Importa il contesto AuthContext
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icona del profilo
import '../styles/NavBar.css'; // Importa gli stili CSS per la NavBar

const NavBar = () => {
    const { username, logout } = useAuth(); // Ottieni l'utente autenticato e la funzione di logout dal contesto

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <div className="navbar-logos">
                        <img 
                            src={logo1} 
                            alt="Logo Eni Joule" 
                            className="navbar-logo" 
                            style={{ height: '40px', marginRight: '10px' }} 
                        />
                        <img 
                            src={logo2} 
                            alt="Logo EY" 
                            className="navbar-logo" 
                            style={{ height: '30px', marginRight: '10px' }} 
                        />
                        <img 
                            src={logo3} 
                            alt="Logo Startup Geeks" 
                            className="navbar-logo" 
                            style={{ height: '30px', marginRight: '10px' }} 
                        />
                    </div>
                </Link>
            </div>
            
            <div className="navbar-right">
                {username ? ( // Mostra l'icona del profilo se l'utente è autenticato
                    <div className="profile-section">
                        <AccountCircleIcon style={{ fontSize: '40px', marginRight: '10px' }} />
                        <button className="logout-button" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    // Mostra i pulsanti di login e registrazione se l'utente non è autenticato
                    <>
                        <button className="login-button">
                            <Link to="/login">Login</Link>
                        </button>
                        <button className="registrati-button">
                            <Link to="/RegisterPage">Registrati</Link>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;