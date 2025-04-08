import React from "react";
import "../App.css";
import Login from "../components/Login";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";


const LoginPage = () => {
  return (
    <div className="sfondoimmaginegialla" > {/* Usa la classe sfondo */}
        
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        
            <Login />
         
      </Container>
    </div> 
  );
}

export default LoginPage;
