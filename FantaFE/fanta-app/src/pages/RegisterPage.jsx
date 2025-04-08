import React from "react";
import "../App.css";
import Register from "../components/Register";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

const RegisterPage = () => {
  return (
    <div className="sfondoimmaginegialla" > {/* Usa la classe sfondo */}
      <Register/>
    </div>
  );
};

export default RegisterPage;
