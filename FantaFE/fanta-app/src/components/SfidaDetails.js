import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Per recuperare i parametri della URL
import { Button } from '@mui/material';
import { getSfidaById, updateSfida, deleteSfida } from '../services/api'; // Assicurati di avere questa funzione

const SfidaDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [sfida, setSfida] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState ('');
  const [data, setData] = useState('');


  useEffect(() => {
    const fetchSfida = async () => {
      try {
        const data = await getSfidaById(id);
        setSfida(data);
        setTitle(data.title);
        setDescription(data.description);
        setData (data.data);
        
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
  const updateSfida = {title, description, data};
  try {
    await updateSfida(id, updateSfida);
    navigate ('/sfide');
  } catch (error) {
    console.error('Errore: sfida non aggiornata');
  }
  const handleDelete = async (id) => {
    try {
      await deleteSfida(id);
      navigate ('/sfide');
      } catch (error) {
      console.error('Errore nell\'eliminazione della sfida:', error);
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (!sfida) {
    return <div>La sfida non esiste.</div>
  }
 return (
    
    <div className="sfida-details-container">
      <h2>{sfida.title}</h2>
      <p>{sfida.description}</p>
      <p><strong>Data di scadenza:</strong> {new Date(sfida.data).toLocaleDateString()}</p>
      

      <h2>Modifica Sfida</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="title">Titolo</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Descrizione</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="data">Data di scadenza</label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button type="submit">Aggiorna</button>
      </form>
    
     <Button 
       variant="contained" 
     color="error" 
    onClick={handleDelete} 
    sx={{ marginTop: '20px' }}>
    Elimina Sfida </Button>
  </div>
 );

}}

export default SfidaDetails