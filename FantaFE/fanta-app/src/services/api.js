import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const api = axios.create({
 baseURL: baseURL
});

/* AUTH Endpoints */
// Registrazione
export const registerUser = async (username, password, role) => {
    
    const response = await api.post('/auth/register', {username, password, role});
    return response.data;
};
 // Login
export const loginUser = async (username, password, role) => {
    const response = await api.post('/auth/login', { username, password, role });
    return response.data; 
   };

   // Imposta il token nell'header Authorization
   export const setAuthToken = (token) => {
    if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
    delete api.defaults.headers.common['Authorization'];
    }
   };
   
 export const createSfida = async (title, description, data) => {
    
    const response = await api.post('/', {title, description, data});
    return response.data;
   };
