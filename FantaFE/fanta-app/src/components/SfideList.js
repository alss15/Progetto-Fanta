import React, { useState, useEffect } from 'react';
import { getAllSfide, deleteSfida } from '../services/api';
import { Link } from 'react-router-dom';

const SfideList = () => {
  const [sfide, setSfide] = useState([]); 
  const [loading, setLoading] = useState(true);

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


  if (loading) {
    return <div>Caricamento sfide...</div>;
  }

  return (
    <div className="sfide-list-container">
      <h2>Tutte le Sfide</h2>
      {sfide.length === 0 ? (
        <p>Non ci sono sfide disponibili.</p>
      ) : (
        <ul className="sfide-list">
          {sfide.map((sfida) => (
            <li key={sfida.id} className="sfida-item">
              <h3>{sfida.title}</h3>
              <p>{sfida.description}</p>
              <p><strong>Data di scadenza:</strong> {new Date(sfida.data).toLocaleDateString()}</p>
              <Link to={`/sfida/${sfida.id}`}>Dettagli</Link> 
              <button onClick={() => handleDelete(sfida.id)}>Elimina</button> {/* Bottone per eliminare */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SfideList;
