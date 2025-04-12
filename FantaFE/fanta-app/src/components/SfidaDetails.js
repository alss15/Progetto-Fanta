import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Box, Paper, Typography, TextField } from '@mui/material';
import { getSfidaById, updateSfida, deleteSfida } from '../services/api';

const SfidaDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [sfida, setSfida] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState('');
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    const fetchSfida = async () => {
      try {
        const data = await getSfidaById(id);
        setSfida(data);
        setTitle(data.title);
        setDescription(data.description);
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero della sfida:', error);
        setLoading(false);
      }
    };

    fetchSfida(); 
  }, [id]); 

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedSfida = { title, description, data };
    try {
      await updateSfida(id, updatedSfida);
      navigate('/sfide');
    } catch (error) {
      console.error('Errore: sfida non aggiornata', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSfida(id);
      navigate('/sfide');
    } catch (error) {
      console.error("Errore nell'eliminazione della sfida:", error);
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!sfida) {
    return <div>La sfida non esiste.</div>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '20px', maxWidth: '600px', width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          {sfida.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {sfida.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <strong>Data di scadenza:</strong> {new Date(sfida.data).toLocaleDateString()}
        </Typography>

        {user && user.role === 'admin' && (
          <>
            <Typography variant="h5" gutterBottom>
              Modifica Sfida
            </Typography>
            <form onSubmit={handleUpdate}>
              <Box sx={{ marginBottom: '15px' }}>
                <TextField
                  fullWidth
                  label="Titolo"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box sx={{ marginBottom: '15px' }}>
                <TextField
                  fullWidth
                  label="Descrizione"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box sx={{ marginBottom: '15px' }}>
                <TextField
                  fullWidth
                  label="Data di scadenza"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Aggiorna
              </Button>
            </form>

            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ marginTop: '20px', width: '100%' }}
            >
              Elimina Sfida
            </Button>
          </>
        )}

        <Button
          component={Link}
          to="/home-social"
          variant="contained"
          sx={{
            marginTop: '20px',
            backgroundColor: "#044c93",
            color: "white",
            fontWeight: "bold",
            transition: "transform 0.2s, box-shadow 0.2s",
            '&:hover': { 
              backgroundColor: "#033b73",
              transform: "scale(1.05)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
            },
          }}
          fullWidth
        >
          Vai a Home Social
        </Button>
      </Paper>
    </Box>
  );
};

export default SfidaDetails;