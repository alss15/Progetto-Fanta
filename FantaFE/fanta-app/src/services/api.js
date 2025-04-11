import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const api = axios.create({
 baseURL: baseURL
});

/* AUTH Endpoints */
// Registrazione
export const registerUser = async (nome, cognome, username, password, role) => {
    
    const response = await api.post('/auth/register', {nome, cognome, username, password, role});
    return response.data;
};
 // Login
export const loginUser = async (username, password) => {
    const response = await api.post('/auth/login', { 
        username,
        password
         });
        
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

   export const getAllUsers = async () => {
    const response = await api.get("/users");
    return response.data;
   }

  export const getUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

    export const getUserByRole = async (role) => {
          const response = await api.get(`/users/role/${role}`);
          return response.data; 
    };
   
 export const createSfida = async (title, description, data) => {
    const response = await api.post("/sfida", {title, description, data});
    return response.data;
   };

export const getAllSfide = async () => {
    const response = await api.get("/sfida");
    return response.data;
}

export const getSfidaById = async (id) => {
    const response = await api.get(`/sfida/${id}`);
    return response.data;
};

export const updateSfida = async (id, updatedSfida) => {
    const response = await api.put(`/sfida/${id}`, updatedSfida);
    return response.data;
};

export const deleteSfida = async (id) => {
    const response = await api.delete(`/sfida/${id}`);
    return response.data;
};