import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser, setAuthToken } from "../services/api";

export const AuthContext = createContext ();

export const useAuth = () => useContext(AuthContext);

const AuthProvider =({ children }) => {
    const [authToken, setAuthTokenState] = useState (null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
           
            setAuthToken(token);
            setAuthTokenState(token);
        }
    }, []);

    const login = async (username, password) => {
        const { token, user } = await loginUser (username, password);
        

        localStorage.setItem('token', token);
        setAuthToken(token);
        setAuthTokenState(token);
        console.log(user);
        return user; // Restituisci l'oggetto utente se necessario
    };
    
    const register = async (nome, cognome, username, password, role) => {
        try {
            const {token} = await registerUser (nome, cognome, username, password, role);
            localStorage.setItem("token", token);
            setAuthToken(token);
            setAuthTokenState(token);

        } catch (error) {
            console.error("Errore nella registrazione:", error);
        }
    }

    const logout =() => {
        
        localStorage.removeItem('token');
        setAuthToken(null);
        setAuthTokenState(null);
        
    };

    const isLoggedIn = !!authToken;
    return (
        <AuthContext.Provider value = {{ authToken, isLoggedIn, login, logout, register}}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;
    
    