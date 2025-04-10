import React, { useState } from 'react';
import { createSfida } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Paper, IconButton, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CreateSfida = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scadenza, setScadenza] = useState('24 ore'); // Stato per la scadenza
  const [punteggio, setPunteggio] = useState(0); // Stato per il punteggio
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calcolo della data di scadenza in base all'opzione selezionata
    const now = new Date();
    let dataScadenza;
    if (scadenza === '24 ore') {
      dataScadenza = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Aggiunge 24 ore
    } else if (scadenza === '1 settimana') {
      dataScadenza = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Aggiunge 7 giorni
    } else if (scadenza === 'mese corrente') {
      dataScadenza = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Ultimo giorno del mese corrente
    }

    try {
      await createSfida(title, description, dataScadenza.toISOString(), punteggio);
      alert("Sfida creata con successo!");
      navigate('/sfide');
    } catch (error) {
      console.error("Errore nella creazione della sfida:", error);
      alert("Errore durante la creazione. Riprova.");
    }
  };

  const incrementPunteggio = () => {
    setPunteggio((prev) => prev + 5);
  };

  const decrementPunteggio = () => {
    setPunteggio((prev) => (prev > 0 ? prev - 5 : 0)); // Evita valori negativi
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#044c93",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "1px",
            textTransform: "uppercase",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Crea una nuova Sfida
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Titolo */}
            <TextField
              label="Titolo"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Descrizione */}
            <TextField
              label="Descrizione"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Scadenza */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="scadenza-label" sx={{ top: "-5px" }}> {/* Sposta l'etichetta leggermente verso l'alto */}
                Scadenza
              </InputLabel>
              <Select
                labelId="scadenza-label"
                value={scadenza}
                onChange={(e) => setScadenza(e.target.value)}
              >
                <MenuItem value="24 ore">1 Giorno</MenuItem>
                <MenuItem value="1 settimana">1 Settimana</MenuItem>
                <MenuItem value="mese corrente">1 Mese</MenuItem>
              </Select>
            </FormControl>

            {/* Contenitore FantaMonete */}
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                padding: "20px",
                borderRadius: "8px",
                textAlign: "center",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#044c93",
                  mb: 2,
                }}
              >
                Fanta Monete
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <IconButton
                  onClick={decrementPunteggio}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    '&:hover': { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <RemoveIcon sx={{ color: "#044c93" }} />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#044c93",
                    minWidth: "50px",
                    textAlign: "center",
                  }}
                >
                  {punteggio}
                </Typography>
                <IconButton
                  onClick={incrementPunteggio}
                  sx={{
                    backgroundColor: "#f0f0f0",
                    '&:hover': { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <AddIcon sx={{ color: "#044c93" }} />
                </IconButton>
              </Box>
            </Box>

            {/* Pulsante Crea Sfida */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#044c93",
                color: "white",
                fontWeight: "bold",
                '&:hover': { backgroundColor: "#033b73" },
              }}
            >
              Crea Sfida
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateSfida;
