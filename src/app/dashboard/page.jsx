"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from "../../../components/sidebar/Sidebar";
import Hour from "../../../components/hour/Hour";
import Image from 'next/image';
//import { useGlobalContext } from '@/context/GlobalContext';
//import ProtectedRoute from '../../../components/ProtectedRoute';

const Dashboard = () => {
    //const { globalState } = useGlobalContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [logado, setLogado] = useState(false);

    //const logado = localStorage.getItem("logado");

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

    function handleLogout() {
        router.push("/");
        localStorage.setItem("logado", false);
    }

    return (
        <div>
            {
                loading ? (
                    <h1>Carregando...</h1>
                ) : (
                    <>
                        <div style={{ backgroundColor: "#000", padding: 20, justifyContent: 'space-evenly', flexDirection: 'row', display: 'flex' }}>
                            <Image src="/logo.png" alt="Logo" width={130} height={40} quality={100} priority={true} />
                            {/* <button onClick={handleLogout} style={{ padding: 10}}>Sair</button> */}
                            {/* <h1 style={{ color: "#fff", textAlign: "center" }}>Pedidos</h1> */}
                        </div>
                        <h1 style={{ color: "#000", textAlign: "center", marginTop: 15 }}>Dashboard</h1>
                        <Sidebar />
                        {/*  */}

                    </>
                )
            }
        </div>
    );
};

export default Dashboard;
