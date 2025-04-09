import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/system";

const RegisterForm = () => {
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
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            setFormData((prev) => ({ ...prev, role: newRole }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = { username: "", password: "" };

        if (formData.username.length < 5) {
            newErrors.username = "L'username deve contenere almeno 5 caratteri.";
            hasError = true;
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
            newErrors.username = "L'username può contenere solo lettere e numeri.";
            hasError = true;
        }

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

        setLoading(true);
        try {
            await register(formData.nome, formData.cognome, formData.username, formData.password, formData.role);
            alert ("Registrazione completata con successo!");
            navigate("/home-social");
        } catch (error) {
            alert("Errore durante la registrazione");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundImage: `url(${require("../materials/sfondo-login2.jpg")})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    width: "350px",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        fontFamily: "Arial, sans-serif",
                        marginBottom: "20px",
                    }}
                >
                    REGISTRATI
                </Typography>
                <div>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        margin="normal"
                        error={!!error.username}
                        helperText={error.username}
                        sx={{
                            backgroundColor: "white",
                            width: "100%",
                        }}
                    />
                    <Typography
                        variant="caption"
                        sx={{
                            color: "rgba(0, 0, 0, 0.6)",
                            fontSize: "0.6rem",
                            display: "block",
                            marginTop: "4px",
                        }}
                    >
                        L'username deve contenere almeno 5 caratteri e solo lettere o numeri.
                    </Typography>
                </div>
                
                <TextField
    label="Nome"
    type="nome"
    name="nome"
    value={formData.nome}
    onChange={handleChange}
    required
    margin="normal"
    
    sx={{
        backgroundColor: "white",
        width: "100%",
    }}
     />
     <TextField
    label="Cognome"
    type="cognome"
    name="cognome"
    value={formData.cognome}
    onChange={handleChange}
    required
    margin="normal"
    sx={{
        backgroundColor: "white",
        width: "100%",
    }}
/>


                <div>
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        margin="normal"
                        error={!!error.password}
                        helperText={error.password}
                        sx={{
                            backgroundColor: "white",
                            width: "100%",
                        }}
                    />
                    <Typography
                        variant="caption"
                        sx={{
                            color: "rgba(0, 0, 0, 0.6)",
                            fontSize: "0.6rem",
                            display: "block",
                            marginTop: "4px",
                            marginBottom: "20px",
                        }}
                    >
                        La password deve contenere almeno 6 caratteri e un numero.
                    </Typography>
                </div>
                <div>
                    <Typography
                        variant="subtitle1"
                        sx={{ marginBottom: "10px", fontWeight: "bold" }}
                    >
                        Seleziona il tuo ruolo
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
                        <ToggleButton
                            value="admin"
                            selected={formData.role === "admin"} 
                            onClick={() => setFormData((prev) => ({ ...prev, role: "admin" }))}
                            sx={{
                                color: "black",
                                "&.Mui-selected": {
                                    backgroundColor: "#1976d2", 
                                    color: "white",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#115293", 
                                },
                                padding: "10px 20px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                            }}
                        >
                            Admin
                        </ToggleButton>
                        <ToggleButton
                            value="creator"
                            selected={formData.role === "creator"} 
                            onClick={() => setFormData((prev) => ({ ...prev, role: "creator" }))}
                            sx={{
                                color: "black",
                                "&.Mui-selected": {
                                    backgroundColor: "#1976d2", 
                                    color: "white",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#115293", 
                                },
                                padding: "10px 20px",
                                borderRadius: "8px",
                                fontWeight: "bold",
                            }}
                        >
                            Creator
                        </ToggleButton>
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    {success ? (
                        <CheckCircleIcon
                            sx={{ color: "green", fontSize: "48px", animation: "fadeIn 1s" }}
                        />
                    ) : loading ? (
                        <div className="loader"></div> 
                    ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "16px",
                                padding: "10px 20px",
                                marginBottom: "20px",
                            }}
                        >
                            REGISTRATI
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;