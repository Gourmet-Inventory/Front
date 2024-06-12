import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./AlergicoSelector.module.css"

const AlergicoSelector = () => {
    const [alergicos, setAlergicos] = useState([]);
    const [selectedAlergico, setSelectedAlergico] = useState('');
    const [selectedAlergicos, setSelectedAlergicos] = useState([]);

    useEffect(() => {
        axios.get('/alergicos')
            .then(response => {
                setAlergicos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the alergicos!', error);
            });
    }, []);

    const handleAddAlergico = () => {
        if (selectedAlergico && !selectedAlergicos.includes(selectedAlergico)) {
            setSelectedAlergicos([...selectedAlergicos, selectedAlergico]);
        }
    };

    const handleRemoveAlergico = (alergico) => {
        setSelectedAlergicos(selectedAlergicos.filter(a => a !== alergico));
    };

    return (
        <div className={styles["alergicos"]}>
            <select value={selectedAlergico} onChange={(e) => setSelectedAlergico(e.target.value)}>
                <option value="">Selecione um alérgico</option>
                {alergicos.map(alergico => (
                    <option key={alergico} value={alergico}>{alergico}</option>
                ))}
            </select>
            <button onClick={handleAddAlergico}>Adicionar</button>

            <div className={styles[""]}>
                {selectedAlergicos.map(alergico => (
                    <span key={alergico} style={{ margin: '5px', padding: '5px', border: '1px solid black', borderRadius: '5px' }}>
                        {alergico}
                        <button onClick={() => handleRemoveAlergico(alergico)} style={{ marginLeft: '5px' }}>Remover</button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default AlergicoSelector;