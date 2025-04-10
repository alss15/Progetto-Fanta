import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { Container, Paper } from '@mui/material';

const HomePage = () => {
    return (
        <div className="sfondoimmaginegialla">
            <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3, mt: 0 }}>
      <div className="home-container">
                <div className="home-text">
                    <h1>
                        Fant<span style={{ fontWeight: 'bold' }}>AZIENDA</span>
                    </h1>
                    <p>Pronto a giocare per rendere la tua azienda FANTA-stica?</p>
                    <div className="home-buttons">
                        <Link to="/login">
                            <button className="home-button">Login</button>
                        </Link>
                        <Link to="/registrati">
                            <button className="home-button">Registrati</button>
                        </Link>
                    </div>
                </div>
            </div>
      </Paper>
</Container>
        </div>
    );
};

export default HomePage;