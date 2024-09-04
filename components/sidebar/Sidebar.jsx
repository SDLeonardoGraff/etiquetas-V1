"use client";

import React, { useState } from 'react';
import './styles.css';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(!open);
    };

    const router = useRouter();

    function limparData() {
        localStorage.removeItem('dadosLogin');
        localStorage.setItem('logado', false);
        router.push('/');
    };

    return (
        <div>
            <div
                id="mySidebar"
                className={`sidebar ${open ? 'open' : ''}`}
                style={{ width: open ? '250px' : '0' }}
            >
                <div className="sidebar-content">
                    {/* <a href="javascript:void(0)" className="closebtn" onClick={toggleSidebar}>&times;</a> */}
                    <a href="/produtos">Etiquetas Produtos</a>
                    <a href='/pedidos'>Etiquetas Pedidos</a>
                    {/* <a href="/dashboard">Dashboard</a> */}
                </div>
                <a href="/" onClick={() => limparData()}>Sair do App</a>
            </div>
            <div id="main" style={{ marginLeft: open ? '250px' : '0' }}>
                <button className="openbtn" onClick={toggleSidebar}>&#9776;</button>
            </div>
        </div>
    );
}

export default Sidebar;
