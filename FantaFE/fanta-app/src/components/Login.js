import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { loginUser } from "../services/api"; // Importa l'API di login

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chiamata all'API di login
      const response = await loginUser(username, password);
      
      // Salva il token restituito dal backend (se presente)
      const token = response.token; // Assumendo che il backend restituisca un campo "token"
      if (token) {
        localStorage.setItem("authToken", token); // Salva il token in localStorage
        console.log("Login effettuato con successo:", response);
        navigate("/"); // Reindirizza alla home
      } else {
        alert("Errore: Token non ricevuto dal backend.");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Errore durante il login. Controlla le credenziali e riprova.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Accedi
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" size="large" type="submit">
            Accedi
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;