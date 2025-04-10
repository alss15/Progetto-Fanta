import React, { useState } from 'react';
import { createSfida } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Avatar } from "@mui/material";


const CreateSfida = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSfida(title, description, data);
      alert("Sfida creata con successo!");
      navigate('/sfide'); // Oppure dove vuoi portare l’utente
    } catch (error) {
      console.error("Errore nella creazione della sfida:", error);
      alert("Errore durante la creazione. Riprova.");
    }
  };

  return (
    <div className="crea-sfida-container">
      <h2>Crea una nuova sfida</h2>
      <form onSubmit={handleSubmit} className="sfida-form">
        <div>
          <label>Titolo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrizione:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data di scadenza:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={() => navigate('/sfide')}>Crea Sfida</button>
      </form>
    </div>
  );
};

export default CreateSfida;
