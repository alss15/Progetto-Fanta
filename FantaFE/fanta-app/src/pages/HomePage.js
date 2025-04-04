import React from 'react';
import Login from '../components/Login';
import RegisterForm from '../components/Register';

const HomePage = () => {
    return (
        <div>
            <h1>Fanta - azienda </h1>
            <Login/>
            <RegisterForm/>
        </div>
    )
};

export default HomePage;