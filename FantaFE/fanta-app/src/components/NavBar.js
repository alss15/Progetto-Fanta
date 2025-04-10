import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../materials/logo eni-joule.png';
import logo2 from '../materials/logo ey.png';
import logo3 from '../materials/logo startup geeks.png';
import '../styles/NavBar.css'; // Importa gli stili CSS per la NavBar

const NavBar = () => {
    const userRole = 'admin'; // Cambia dinamicamente in base al contesto
    const profilePath = '/profilo'; // Imposta il percorso fisso per il profilo

    return (
        <nav className="navbar">
            <div className="navbar-center">
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
                <Link to="/home-social" className="navbar-modern-button">
                    Home Social
                </Link>
                <Link to={profilePath} className="navbar-modern-button">
                    Profilo
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;