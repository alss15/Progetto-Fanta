import React, { useState, useEffect } from 'react';
import { getAllSfide, deleteSfida } from '../services/api';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Chip, Select, MenuItem, Card, CardContent, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const SfideList = () => {
  const [sfide, setSfide] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState('Tutte'); // Stato per il filtro categoria

  useEffect(() => {
    const fetchSfide = async () => {
      try {
        const data = await getAllSfide();
        setSfide(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel recupero delle sfide:', error);
        setLoading(false);
      }
    };

    fetchSfide();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSfida(id);
      setSfide(sfide.filter((sfida) => sfida.id !== id));
    } catch (error) {
      console.error('Errore nell\'eliminazione della sfida:', error);
    }
  };

  const filteredSfide = categoria === 'Tutte'
    ? sfide
    : sfide.filter((sfida) => sfida.categoria === categoria);

  if (loading) {
    return <div>Caricamento sfide...</div>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Contatore sfide in corso */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Chip
          icon={<EmojiEventsIcon />}
          label={`Sfide in corso: ${sfide.length}`}
          color="primary"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px' }}
        />
      </Box>

      {/* Filtro per categoria */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          displayEmpty
          sx={{
            minWidth: 200,
            backgroundColor: '#044c93',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            '& .MuiSelect-icon': { color: 'white' },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#044c93' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#033b73' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#033b73' },
          }}
        >
          <MenuItem value="Tutte">Tutte</MenuItem>
          <MenuItem value="Giornaliera">Giornaliere</MenuItem>
          <MenuItem value="Settimanale">Settimanali</MenuItem>
          <MenuItem value="Mensile">Mensili</MenuItem>
        </Select>
      </Box>

      {/* Box per le sfide */}
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {filteredSfide.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ color: '#044c93' }}>
            Non ci sono sfide disponibili.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredSfide.map((sfida) => (
              <Card key={sfida.id} sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#044c93' }}>
                    {sfida.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {sfida.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Data di scadenza:</strong> {new Date(sfida.data).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button
                    component={Link}
                    to={`/sfida/${sfida.id}`}
                    variant="contained"
                    sx={{
                      backgroundColor: '#044c93',
                      color: 'white',
                      '&:hover': { backgroundColor: '#033b73' },
                    }}
                  >
                    Dettagli
                  </Button>
                  <Button
                    onClick={() => handleDelete(sfida.id)}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Elimina
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SfideList;
