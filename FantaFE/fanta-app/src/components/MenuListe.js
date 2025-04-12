import React, { useEffect, useState } from 'react';
import { getAllSfide } from '../services/api';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const MenuListe = () => {
    const [sfide, setSfide] = useState([]);
    const [selectedSfida, setSelectedSfida] = useState("");

    useEffect(() => {
        const fetchSfide = async () => {
            try {
                const sfideData = await getAllSfide();
                setSfide(sfideData);

                // Salva le sfide in localStorage
                localStorage.setItem('sfideinfo', JSON.stringify(sfideData));
            } catch (error) {
                console.error('Errore nel recupero delle sfide:', error);
            }
        };

        fetchSfide();
    }, []);

    const handleChange = (event) => {
        setSelectedSfida(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="sfide-select-label">Seleziona una sfida</InputLabel>
            <Select
                labelId="sfide-select-label"
                value={selectedSfida}
                onChange={handleChange}
                label="Seleziona una sfida"
            >
                {sfide.map((sfida) => (
                    <MenuItem key={sfida.id} value={sfida.title}>
                        {sfida.title}
                    </MenuItem>
                ))}
            </Select>
            
        </FormControl>
        
    );
};

export default MenuListe;