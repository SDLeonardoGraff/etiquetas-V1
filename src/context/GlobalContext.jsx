"use client";

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState({
        pedido: null,
        etiqueta: null,
        produtos: null,
        config: null,
    });

    const updateGlobalState = (newState) => {
        setGlobalState((prevState) => ({
            ...prevState,
            ...newState
        }));
    };

    return (
        <GlobalContext.Provider value={{ globalState, updateGlobalState }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);