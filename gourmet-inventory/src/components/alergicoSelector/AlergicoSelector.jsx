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

const AlergicoSelect = ({ selected, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(selected);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log("Opção selecionada:", event.target.value); // Verifique se está recebendo o valor corretamente
        onSelect(event.target.value); // Verifique se está chamando a função onSelect corretamente
    };

    console.log("Selected no AlergicoSelect:", selected); // Verifique o estado inicial de selected

    return (
        <div>
            <div className={styles["alergicos"]}>
                <select id="alergicos" value={selectedOption} onChange={handleChange}>
                    <option value="">Selecione um alérgico</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option.replace(/_/g, ' ')}</option>
                    ))}
                </select>
            </div>
            {selectedOption && (
                <div className={styles["div"]}>
                    <p>Você selecionou: {String(selectedOption).replace(/_/g, ' ')}</p>
                </div>
            )}
        </div>
    );
};

export default AlergicoSelect;
