"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from './buttonProdutos.module.css';
import { useGlobalContext } from "@/context/GlobalContext";

const Button = ({valor, setLoading}) => {

    const { globalState, updateGlobalState } = useGlobalContext();

    /* if (globalState){
        console.log(globalState);
    } else {
        console.log("Carregando...")
    } */

    

    const handleClick = async () => {
        //console.log(valor);
        setLoading(true);
        try{
            const response = await fetch(`/api/request/Produtos/Pesquisar?codigo=${valor}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization-Token": process.env.NEXT_PUBLIC_TOKEN,
                "User": process.env.NEXT_PUBLIC_USER,
                "App": process.env.NEXT_PUBLIC_APP,
            }
        })
        const json = await response.json();
        //console.log(json);
        updateGlobalState({produtos: json});
        } catch (error){
            alert(error);
        } finally{
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