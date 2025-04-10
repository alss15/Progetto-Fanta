import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  ToggleButton,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    username: "",
    password: "",
    role: "utente",
  });
  const [error, setError] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (newRole) => {
    setFormData((prev) => ({ ...prev, role: newRole }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { username: "", password: "" };

    // Validazione username
    if (formData.username.length < 5) {
      newErrors.username = "L'username deve contenere almeno 5 caratteri.";
      hasError = true;
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = "L'username può contenere solo lettere e numeri.";
      hasError = true;
    }

    // Validazione password
    if (!/\d/.test(formData.password)) {
      newErrors.password = "La password deve contenere almeno un numero.";
      hasError = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "La password deve contenere almeno 6 caratteri.";
      hasError = true;
    }

    setError(newErrors);

    if (hasError) {
      return;
    }

    try {
      await register(
        formData.nome,
        formData.cognome,
        formData.username,
        formData.password,
        formData.role
      );
      alert("Registrazione completata con successo!");
      navigate("/home-social");
    } catch (error) {
      alert("Errore durante la registrazione");
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
          Registrati
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
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            margin="normal"
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          <TextField
            label="Cognome"
            name="cognome"
            value={formData.cognome}
            onChange={handleChange}
            required
            margin="normal"
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            margin="normal"
            error={!!error.username}
            helperText={error.username}
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            margin="normal"
            error={!!error.password}
            helperText={error.password}
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          <Typography
            variant="subtitle1"
            sx={{ marginBottom: "10px", fontWeight: "bold", textAlign: "center" }}
          >
            Seleziona il tuo ruolo
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <ToggleButton
              value="admin"
              selected={formData.role === "admin"}
              onClick={() => handleRoleChange("admin")}
              sx={{
                color: "black",
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#115293",
                },
                padding: "10px 10px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Admin
            </ToggleButton>
            <ToggleButton
              value="creator"
              selected={formData.role === "creator"}
              onClick={() => handleRoleChange("creator")}
              sx={{
                color: "black",
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#115293",
                },
                padding: "10px 10px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              Creator
            </ToggleButton>
          </div>
          <Button variant="contained" color="primary" size="large" type="submit" sx={{ 
                backgroundColor: "#044c93", 
                color: "#ffffff", 
                fontWeight: "bold" // Rende il testo in grassetto
            }}>
            Registrati
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;