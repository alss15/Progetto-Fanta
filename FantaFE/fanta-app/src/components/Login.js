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
    if (!selectedRole) {
      alert("Seleziona un ruolo prima di accedere.");
      return;
    }
    try {
      await login(username, password);
      console.log("Login effettuato con successo");

      // Naviga in base al ruolo selezionato
      if (selectedRole === "admin") {
        navigate("/admin");
      } else if (selectedRole === "creator") {
        navigate("/creator");
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
          <ToggleButtonGroup
            value={selectedRole}
            exclusive
            onChange={handleRoleChange}
            sx={{ marginBottom: 3 }}
          >
            <ToggleButton
              value="admin"
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
          </ToggleButtonGroup>
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