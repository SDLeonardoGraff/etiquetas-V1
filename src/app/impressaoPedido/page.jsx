"use client";

import React, { useEffect, useState } from "react";
//import { useRouter } from 'next/navigation';
import { useGlobalContext } from "@/context/GlobalContext";
import styles from './impressaoPedido.module.css';
import moment from "moment";
//import Sidebar from "../../../components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/sidebar/Sidebar";
import Image from "next/image";
//import withAuth from "@/withAuth";

const Impressao = () => {
    const { globalState } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [data, setData] = useState(null);
    const [cpfCnpj, setCpfCnpj] = useState(null);
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            setLoading(true);
            const isLoggedIn = localStorage.getItem("logado");
            setLogado(isLoggedIn);
            if (isLoggedIn === "false") {
                router.push("/");
            }
            setLoading(false);
        };
        checkLogin();
    }, []);

    useEffect(() => {
        if (globalState && globalState.etiqueta) {
            formataCPFCNPJ(globalState.etiqueta.ClienteCNPJ)
            setData(globalState.etiqueta);
        }
    }, [globalState]);

    useEffect(() => {
        if (data && data.ID) {
            //window.print();
        }
    }, [data]);

    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem("logado")) {
            router.push("/");
        }
        setLoading(false);
        return;
    }, [])

    const formataCPFCNPJ = (value) => {
        //value = value.replace(/\D/g, '')
        if (value.length === 11) {
            setCpfCnpj(value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        } else {
            setCpfCnpj(value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"));
        }
    }

    console.log(cpfCnpj);

    return (
        <div>
            {/*<Sidebar className={styles.noPrint}/>*/}
            <div className={styles.buttons}>
            <div className={styles.divImage}>
                <Image src="/logo.png" alt="Logo" width={130} height={40} quality={100} priority={true} />
                {/* <button onClick={handleLogout} style={{ padding: 10}}>Sair</button> */}
                {/* <h1 style={{ color: "#fff", textAlign: "center" }}>Pedidos</h1> */}
            </div>
            <h1 className={styles.titlePage}>Impressão do Pedido</h1>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
                
                <button className={styles.button} onClick={() => router.back()}>Voltar</button>
                <button className={styles.button} onClick={() => window.print()}>Imprimir</button>
            </div>
            {data && (
                <div className={styles.body}>

                    <div className={styles.container}>
                        <p className={styles.remetente}>REMETENTE: {data.Empresa}</p>
                        <p className={styles.title}>DADOS DO DESTINATÁRIO</p>
                        <div className={styles.content}>
                            <p>Nome: {data.Cliente}</p> 
                            <div style={{display: 'flex', flexDirection: 'row', gap: 40}}>
                                <p>Pedido nº: {data.Codigo}</p>
                                <p>NFe nº: {data.Codigo}</p>
                            </div>
                            <p>CPF/CNPJ: {cpfCnpj}</p>
                            <p>Endereço: {data.Logradouro} nº {data.LogradouroNumero}</p>
                            <p>Bairro: {data.Bairro}</p>
                            <p>Cidade: {data.Municipio}</p>
                            <p>UF: {data.UF} CEP: {data.CEP}</p>
                            <p>Data do Pedido: {moment(data.Data).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                    {/* <div className={styles.container}>
                        <p className={styles.remetente}>REMETENTE: {data.Empresa}</p>
                        <p className={styles.title}>DADOS DO DESTINATÁRIO</p>
                        <div className={styles.content}>
                            <p>Nome: {data.Cliente}</p>
                            <div style={{display: 'flex', flexDirection: 'row', gap: 40}}>
                                <p>Pedido nº: {data.Codigo}</p>
                                <p>NFe nº: {data.Codigo}</p>
                            </div>
                            <p>CPF/CNPJ: {cpfCnpj}</p>
                            <p>Endereço: {data.Logradouro} nº {data.LogradouroNumero}</p>
                            <p>Bairro: {data.Bairro}</p>
                            <p>Cidade: {data.Municipio}</p>
                            <p>UF: {data.UF} CEP: {data.CEP}</p>
                            <p>Data do Pedido: {moment(data.Data).format('DD/MM/YYYY')}</p>
                        </div>
                    </div> */}
                </div>
            )
            }
        </div>
    );
}
export default Impressao;
