import React, { createContext, useContext, useState } from 'react';

// Criar o contexto
const PratosContext = createContext();

// Provedor dos pratos
export const PratosProvider = ({ children }) => {
    const [pratos, setPratos] = useState([]);

    return (
        <PratosContext.Provider value={{ pratos, setPratos }}>
            {children}
        </PratosContext.Provider>
    );
};

// Hook personalizado para consumir o contexto
export const usePratos = () => useContext(PratosContext);
