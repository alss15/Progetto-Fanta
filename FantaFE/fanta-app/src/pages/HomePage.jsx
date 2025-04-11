import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { Container, Paper, Box, Typography, Button, Grid } from '@mui/material';

const HomePage = () => {
  return (
    <div className="sfondoimmaginegialla" style={{ minHeight: "100vh", backgroundSize: "cover" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Sezione superiore con descrizione e pulsanti */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 5 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: "bold",
              color: "#044c93",
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Benvenuti su FantAzienda
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "#555",
              mb: 4,
              fontSize: "1.2rem",
              lineHeight: 1.8,
            }}
          >
            FantAzienda è il servizio che trasforma il tuo ambiente lavorativo in un'esperienza divertente e coinvolgente. 
            Le aziende possono creare sfide personalizzate per i propri dipendenti, assegnare punteggi e stabilire tempistiche. 
            Rendi la tua azienda FANTA-stica con il nostro sistema di gamification!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#044c93",
                  color: "white",
                  fontWeight: "bold",
                  '&:hover': { backgroundColor: "#033b73" },
                }}
              >
                Login
              </Button>
            </Link>
            <Link to="/registrati" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#044c93",
                  color: "#044c93",
                  fontWeight: "bold",
                  '&:hover': { backgroundColor: "#044c93", color: "white" },
                }}
              >
                Registrati
              </Button>
            </Link>
          </Box>
        </Paper>

        {/* Sezione con le sfide */}
        <Grid container spacing={4} sx={{ justifyContent: "center" }}>
          {/* Sfida Giornaliera */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: "scale(1.05)" },
            }}
          >
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <img
                src={require("../materials/Pianta.jpg")}
                alt="Sfida Giornaliera"
                style={{
                  width: "80%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#044c93",
                  mb: 2,
                }}
              >
                Sfida Giornaliera
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 2,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                Indossa una maglietta verde e guadagna <strong>+10 punti</strong>. 
                Una piccola sfida per iniziare la giornata con il piede giusto!
              </Typography>
            </Paper>
          </Grid>

          {/* Sfida Settimanale */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: "scale(1.05)" },
            }}
          >
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <img
                src={require("../materials/Pianta.jpg")}
                alt="Sfida Settimanale"
                style={{
                  width: "80%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#044c93",
                  mb: 2,
                }}
              >
                Sfida Settimanale
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 2,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                Porta una pianta in ufficio e curala per tutta la settimana. 
                Guadagna <strong>+80 punti</strong> e migliora l'ambiente lavorativo!
              </Typography>
            </Paper>
          </Grid>

          {/* Sfida Mensile */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              transition: "transform 0.3s ease-in-out",
              '&:hover': { transform: "scale(1.05)" },
            }}
          >
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, textAlign: "center" }}>
              <img
                src={require("../materials/Pianta.jpg")}
                alt="Sfida Mensile"
                style={{
                  width: "80%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#044c93",
                  mb: 2,
                }}
              >
                Sfida Mensile
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 2,
                  fontSize: "1rem",
                  lineHeight: 1.6,
                }}
              >
                Aumenta le vendite del 25% mantenendo le stesse ore di lavoro. 
                Guadagna <strong>+300 punti</strong> e dimostra il tuo valore!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;