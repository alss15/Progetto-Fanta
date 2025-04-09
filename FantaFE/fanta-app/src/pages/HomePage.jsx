import React from 'react';
import '../styles/Home.css';

const HomePage = () => {
    return (
        <div
            className="sfondoimmaginegialla"
        >
            <main className="home-container">
                <div className="home-text">
                    <h1>Pronto a giocare per rendere la tua azienda FANTA-stica?</h1>
                    <p>Accedi o registrati per effettuare le sfide in corso!</p>
                </div>
                <div className="home-image-container">
                    <div className="home-image" aria-hidden="true"></div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;