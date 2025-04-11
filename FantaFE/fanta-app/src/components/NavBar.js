import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../materials/logo eni-joule.png';
import logo2 from '../materials/logo ey.png';
import logo3 from '../materials/logo startup geeks.png';
import '../styles/NavBar.css'; // Importa gli stili CSS per la NavBar
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Box, Typography, Button, Grid } from '@mui/material';


const NavBar = () => {

    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/">
                    <div className="navbar-logos" onClick={() => navigate('/')}>
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
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    {isLoggedIn ? (
                        <Button
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                            variant="contained"
                            sx={{
                                backgroundColor: "#ffd41f",
                                color: "black",
                                fontWeight: "bold",
                                '&:hover': { backgroundColor: "#ffd41f" },
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#ffd41f",
                                        color: "black",
                                        fontWeight: "bold",
                                        '&:hover': { backgroundColor: "#ffd41f" },
                                    }}
                                    >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/registrati" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "white",
                                        color: "#033b73",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Registrati
                                </Button>
                            </Link>
                        </>
                    )}
                </Box>
                </div>
        </nav>
    );
};

export default NavBar;