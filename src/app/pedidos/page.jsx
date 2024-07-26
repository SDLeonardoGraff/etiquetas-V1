"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import Input from "../../../components/Input/Input";
import { useGlobalContext } from "@/context/GlobalContext";
import Table from "../../../components/table/Table";
import LoadingSpinner from "../../../components/loading/Loading";
import Pagination from "../../../components/pagination/Pagination";
import Options from "../../../components/options/Options";
import Hour from "../../../components/hour/Hour";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Alert from "../../../components/alert/Alert";
//import styles from "./pedido.module.css";

const Pedidos = () => {
    const { globalState, updateGlobalState } = useGlobalContext();
    //const { pedido } = globalState || {};
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPorPagina = 12;
    const items = globalState.pedido;
    const [loadingDados, setLoadingDados] = useState(false);
    const router = useRouter();
    const [logado, setLogado] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem("logado")) {
            router.push("/");
        }
        setLoading(false);
        return;
    }, [])

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

    const indexOfLastItem = currentPage * itemsPorPagina;
    const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
    const currentItems = Array.isArray(items) ? items.slice(indexOfFirstItem, indexOfLastItem) : [];

    const [isOptionsVisible, setOptionsVisible] = useState(false);

    return (
        <div/*  className={styles.container} */>
            <div style={{ backgroundColor: "#000", padding: 20, justifyContent: 'space-evenly', flexDirection: 'row', display: 'flex' }}>
                <Image src="/logo.png" alt="Logo" width={130} height={40} quality={100} priority={true} />
                {/* <button onClick={handleLogout} style={{ padding: 10}}>Sair</button> */}
                {/* <h1 style={{ color: "#fff", textAlign: "center" }}>Pedidos</h1> */}
            </div>
            <h1 style={{ color: "#000", textAlign: "center", marginTop: 15 }}>Pedidos</h1>
            <Sidebar />
            <Input setLoading={setLoading} />
            {isOptionsVisible && <Options />}
            {
                loading ? (
                    <LoadingSpinner /> // Mostrando mensagem de carregamento
                ) : (
                    items && items.length > 0 ? (
                        <>
                            <Table dados={currentItems} setVisible={setOptionsVisible} visible={isOptionsVisible} />
                            <Pagination
                                itemsPerPage={itemsPorPagina}
                                totalItems={items.length}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <></>
                    )
                )
            }
            
            {/* <Hour /> */}
        </div>
    )
};

export default Pedidos;