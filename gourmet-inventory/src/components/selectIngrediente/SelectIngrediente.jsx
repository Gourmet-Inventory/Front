import React, { useState, useEffect } from "react";
import api from "../../api";
import styles from './SelectIngrediente.module.css'; // Importação do arquivo CSS para estilização

const SelectIngredientes = ({ onSelect }) => {
    const [options, setOptions] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [optionsFiltradas, setOptionsFiltradas] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const getIngredientes = async () => {
            try {
                console.log(localStorage.idEmpresa)
                const response = await api.get(`/pratos/ingredientes/${localStorage.idEmpresa}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.token}` }
                });
                const data = response.data;
                console.log(data)
                setOptions(data);
                setOptionsFiltradas(data);
            } catch (error) {
                console.error('Erro ao buscar ingredientes:', error);
            }
        };
        getIngredientes();
    }, []);

    useEffect(() => {
        const filteredOptions = options.filter(option =>
            option.nomeConcatenado.toLowerCase().includes(pesquisa.toLowerCase())
        );
        setOptionsFiltradas(filteredOptions);
    }, [pesquisa, options]);

    const handleSelect = (option) => {
        setPesquisa(option.nomeConcatenado);
        setShowSuggestions(false);
        onSelect(option);
    };

    return (
        <div className={styles["select-ingredientes-container"]}>
            <input
                type="text"
                placeholder="Pesquise um Item do estoque"
                value={pesquisa}
                onChange={e => {
                    setPesquisa(e.target.value);
                    setShowSuggestions(true);
                }}
                onBlur={() => {
                    setTimeout(() => setShowSuggestions(false), 100);
                }}
                onFocus={() => setShowSuggestions(true)}
                className={styles["select-ingredientes-input"]}
            />
            {showSuggestions && (
                <ul className={styles["suggestions-list"]}>
                    {optionsFiltradas.map(option => (
                        <li
                            key={option.idItem}
                            onClick={() => handleSelect(option)}
                            className={styles["suggestion-item"]}
                        >
                            {option.nomeConcatenado}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectIngredientes;
