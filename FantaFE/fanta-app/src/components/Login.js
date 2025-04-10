import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

/* commento di prova */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login (username, password);
      console.log("Login effettuato con successo")

      navigate("/home-social");
      } 
    catch (error) {
      console.error("Errore durante il login:", error);
      alert("Errore durante il login. Controlla le credenziali e riprova.");
    }
  
  }; 
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 0 }}> {/* Rimosso il margine superiore */}
      <Typography
                    variant="h4"
                    sx={{
                        fontFamily: "Arial, sans-serif",
                        marginBottom: "10px",
                        textAlign: "center",
                    }}
                >
                    Accedi
                </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            label="Username"
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
            sx={{ marginBottom: 3 }}
          />
          <Button 
            variant="contained" 
            size="large" 
            type="submit"
            sx={{ 
                backgroundColor: "#044c93", 
                color: "#ffffff", 
                fontWeight: "bold" // Rende il testo in grassetto
            }}
          >
            Accedi
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;