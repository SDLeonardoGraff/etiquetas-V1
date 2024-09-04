"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from './buttonProdutos.module.css';
import { useGlobalContext } from "@/context/GlobalContext";

const Button = ({ valor, setLoading }) => {

    const { globalState, updateGlobalState } = useGlobalContext();

    /* if (globalState){
        console.log(globalState);
    } else {
        console.log("Carregando...")
    } */

    function getConfig() {
        if (typeof window !== "undefined") {
            const storedConfig = localStorage.getItem("dadosLogin");
            if (storedConfig !== null) {
                try {
                    const config = JSON.parse(storedConfig);
                    return config;
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return [];
    };

    const configApp = getConfig();

    const handleClick = async () => {
        //console.log(valor);
        setLoading(true);
        try {
            const response = await fetch(`/api/request/Produtos/Pesquisar?codigo=${valor}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization-Token": configApp.erp_token,
                    "User": configApp.erp_user,
                    "App": configApp.erp_app,
                }
            })
            const json = await response.json();
            //console.log(json);
            updateGlobalState({ produtos: json });
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
            return;
        }
    }

    //console.log(globalState.produtos);

    return (
        <button onClick={() => handleClick()} className={Styles.content}>
            <p className={Styles.image}>🔍</p>
        </button>
    )
};

export default Button;