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
                <option value="LATICINIOS">LATICINIOS</option>
                <option value="NOZES">NOZES</option>
                <option value="OVOS">OVOS</option>
                <option value="SOJA">SOJA</option>
                <option value="FEIJAO">FEIJAO</option>
                <option value="TRIGO_GLUTEN">TRIGO_GLUTEN</option>
                <option value="FRUTOS_DO_MAR">FRUTOS_DO_MAR</option>
                <option value="SULFITOS">SULFITOS</option>
                <option value="MILHO">MILHO</option>
                <option value="AMENDOIM">AMENDOIM</option>
                <option value="GLUTEN">GLUTEN</option>
                <option value="GORDURA">GORDURA</option>
                <option value="CARNE">CARNE</option>
                <option value="ALIMENTOS_PROCESSADOS">ALIMENTOS_PROCESSADOS</option>
                <option value="ALIMENTOS_GMO">ALIMENTOS_GMO</option>
                <option value="ALIMENTOS_ENLATADOS">ALIMENTOS_ENLATADOS</option>
                <option value="SODIO">SODIO</option>
                <option value="LACTOSE">LACTOSE</option>
                <option value="VEGANO">VEGANO</option>
                <option value="VEGETARIANO">VEGETARIANO</option>
                <option value="ACUCAR">ACUCAR</option>
                <option value="ALIMENTOS_REFINADOS">ALIMENTOS_REFINADOS</option>
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
