import React, { useState } from 'react';
import styles from "./AlergicoSelector.module.css";

const options = [
    "LATICINIOS",
    "NOZES",
    "OVOS",
    "SOJA",
    "FEIJAO",
    "TRIGO_GLUTEN",
    "FRUTOS_DO_MAR",
    "SULFITOS",
    "MILHO",
    "AMENDOIM",
    "GLUTEN",
    "GORDURA",
    "CARNE",
    "ALIMENTOS_PROCESSADOS",
    "ALIMENTOS_GMO",
    "ALIMENTOS_ENLATADOS",
    "SODIO",
    "LACTOSE",
    "VEGANO",
    "VEGETARIANO",
    "ACUCAR",
    "ALIMENTOS_REFINADOS"
];

const AlergicoSelect = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <div className={styles["alergicos"]}>
            <select id="alergicos" value={selectedOption} onChange={handleChange}>
                <option value="">Selecione um alérgico</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option.replace(/_/g, ' ')}
                    </option>
                ))}
            </select>
            </div>
            {selectedOption && (
                <div className={styles["div"]}>
                    <p>Você selecionou: {selectedOption.replace(/_/g, ' ')}</p>
                </div>
            )}
        </div>
    );
};

export default AlergicoSelect;
