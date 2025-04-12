import React, { useState } from 'react';
import { Container, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, CardMedia } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const [openDialog, setOpenDialog] = useState(null);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      console.log("Logout effettuato con successo");
      localStorage.removeItem("user"); // Rimuovi l'oggetto utente dal localStorage
      navigate("/");
    } catch (error) {
      console.error("Errore durante il logout:", error);
      alert("Errore durante il logout. Controlla le credenziali e riprova.");
    }
  };

  const handleOpenDialog = (type) => {
    setOpenDialog(type);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  return (
    <div className="sfondoimmaginegialla">
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Sezione superiore con descrizione e pulsanti */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
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
          {isLoggedIn && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/home-social')}
              sx={{ display: 'block', margin: '0 auto' }}
            >
              Vai a Home Social
            </Button>
          )}
        </Paper>

        {/* Box per la sezione "Come funzionano le sfide?" */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 3, backgroundColor: '#f9f9f9' }}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "bold",
              color: "#white",
              mb: 2,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Come funzionano le sfide?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: "#555",
              mb: 4,
              fontSize: "1.2rem", // Stessa dimensione del testo sopra
              lineHeight: 1.8,
              fontFamily: "'Poppins', sans-serif", // Stesso font del titolo sopra
            }}
          >
            Completa in tempo le sfide che l'admin prepara per voi creator. Ogni sfida ha una tempistica e un punteggio personalizzato in base al tempo. Ci sono 3 tipi di sfide:
          </Typography>

          {/* Bottoni per le sfide */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog('giornaliera')}>
              Sfida Giornaliera
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleOpenDialog('settimanale')}>
              Sfida Settimanale
            </Button>
            <Button variant="contained" color="success" onClick={() => handleOpenDialog('mensile')}>
              Sfida Mensile
            </Button>
          </div>
        </Paper>

        {/* Dialog per Sfida Giornaliera */}
        <Dialog open={openDialog === 'giornaliera'} onClose={handleCloseDialog}>
          <DialogTitle>Sfida Giornaliera</DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              image={require("../materials/Giornaliera.png")}
              alt="Sfida Giornaliera"
              sx={{ borderRadius: 2, width: "100%", height: "auto" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Chiudi</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog per Sfida Settimanale */}
        <Dialog open={openDialog === 'settimanale'} onClose={handleCloseDialog}>
          <DialogTitle>Sfida Settimanale</DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              image={require("../materials/Settimanale.png")}
              alt="Sfida Settimanale"
              sx={{ borderRadius: 2, width: "100%", height: "auto" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Chiudi</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog per Sfida Mensile */}
        <Dialog open={openDialog === 'mensile'} onClose={handleCloseDialog}>
          <DialogTitle>Sfida Mensile</DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              image={require("../materials/mensile.png")}
              alt="Sfida Mensile"
              sx={{ borderRadius: 2, width: "100%", height: "auto" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Chiudi</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default HomePage;