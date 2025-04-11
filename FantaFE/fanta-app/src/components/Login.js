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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // Stato per il ruolo selezionato
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (event, newRole) => {
    setSelectedRole(newRole); // Aggiorna il ruolo selezionato
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const user = await login(username, password);
      localStorage.setItem("user", JSON.stringify(user)); // Salva l'oggetto utente nel localStorage
      console.log("Login effettuato con successo");

      // Naviga in base al ruolo selezionato
      
      if (user.role === "admin") { //user is not defined
        navigate("/admin");
      } else if (user.role === "creator") {
        navigate("/profilo");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert("Errore durante il login. Controlla le credenziali e riprova.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 0 }}>
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
              fontWeight: "bold",
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