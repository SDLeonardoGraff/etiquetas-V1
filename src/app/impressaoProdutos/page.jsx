"use client";

import React, { useEffect, useState } from "react";
//import { useRouter } from 'next/navigation';
import { useGlobalContext } from "@/context/GlobalContext";
import styles from './impressaoProdutos.module.css';
//import moment from "moment";
//import Sidebar from "../../../components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import JsBarcode from 'jsbarcode';
import Sidebar from "../../../components/sidebar/Sidebar";
import Image from "next/image";

const ImpressaoProdutos = () => {
    const { globalState } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [data, setData] = useState(null);
    //const [cpfCnpj, setCpfCnpj] = useState(null);
    const [selectedOption, setSelectedOption] = useState(0);
    const items = globalState.etiqueta;
    const [logado, setLogado] = useState(false);
    //const [displayValue, setDisplayValue] = useState(true);

    useEffect(() => {
        if (globalState && globalState.etiqueta) {
            setData(globalState.etiqueta);
        }
    }, [globalState]);

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
        setLoading(true);
        if (localStorage.getItem("logado") === false) {
            router.push("/");
        }
        setLoading(false);
        return;
    }, [localStorage]);

    console.log(globalState.etiqueta);

    /* const [produtoExemplo] = useState([
        { nome: '12 - ADVOCATE CAT 0,8 ML X 3 (COMBO)', valor: 'R$130,00', codigo: '7891106911238' },
        { nome: '14 - COMP (CX. X 4) APOQUEL 3,6 MG 20', valor: 'R$200,00', codigo: '7898049719266' },
        { nome: '13 - APOQUEL ZOETIS 5,4MG', valor: 'R$226,98', codigo: '7898049719273' }
    ]); */
    let displayValue;
    const escapeId = (id) => id.replace(/[^a-zA-Z0-9-_]/g, "-");

    const handleSelectChange = (event) => {
        const selectedValue = parseInt(event.target.value);
        setSelectedOption(selectedValue);
    };

    useEffect(() => {
        items?.forEach(produto => {
            const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
            if (document.getElementById(barcodeId)) {
                JsBarcode(`#${barcodeId}`, produto.Codigo, {
                    format: 'CODE128',
                    displayValue: displayValue,
                    width: 2,
                    height: 22,
                    fontSize: 12,
                    letterSpacing: 2
                });
            }
        });
    }, [selectedOption, items]);

    const renderProducts = () => {
        const container = [];
        let layout;//{ display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
        //let layout2;//{ display: 'grid', gridTemplateColumns: '1fr', gap: '10mm' };

        switch (selectedOption) {
            case 1:
                displayValue = true;
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                data?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: '6px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: '8px', fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 2:
                displayValue = true;
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: '6px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: '8px', fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 3:
                /* displayValue = true;
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: '6px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: '8px', fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                }); */
                displayValue = false;
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: 8, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000", fontWeight: 'bold' }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', color: "#000" }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%', height: 25 }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 4:
                /* layout = "";
                displayValue = true;
                layout = { display: 'grid', gridTemplateColumns: '1fr', gap: '10mm' };
                data?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{ fontFamily: 'Arial, sans-serif', border: '1px solid #000', padding: '10px', height: '84mm', width: '104mm', textAlign: 'center', boxSizing: 'border-box', margin: '20px auto' }} key={index}>
                            <div style={{ fontSize: '14px', marginBottom: '10px', color: "#000" }}>{produto.Nome}</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: "#000" }}>{produto.PrecoVenda}</div>
                            <img className="barcode" style={{ marginBottom: '5px', color: "#000" }} id={barcodeId} alt="barcode" />
                            <br />
                        </div>
                    );
                    container.push(productDiv);
                });*/
                displayValue = false;
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: 8, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000", fontWeight: 'bold' }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', color: "#000" }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%', height: 25 }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                
                break;
            case 5:
                /* displayValue = true;
                layout = { display: 'grid', gridTemplateColumns: '1fr', gap: '10mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{ fontFamily: 'Arial, sans-serif', border: '1px solid #000', padding: '10px', height: '150mm', width: '100mm', textAlign: 'center', boxSizing: 'border-box', margin: '20px auto' }} key={index}>
                            <div style={{ fontSize: '14px', marginBottom: '10px', color: "#000" }}>{produto.Nome}</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: "#000" }}>{produto.PrecoVenda}</div>
                            <img className="barcode" style={{ marginBottom: '5px', color: "#000" }} id={barcodeId} alt="barcode" />
                            <br />
                        </div>
                    );
                    container.push(productDiv);
                });  */
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '0.5mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: '10px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div> */}
                        </div>
                    );
                    container.push(productDiv);
                }); 
                break;
            case 6:
                /* displayValue = false;
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: 8, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000", fontWeight: 'bold' }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', color: "#000" }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%', height: 25 }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                }); */
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '0.5mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: '10px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div> */}
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 7:
                /* displayValue = false;
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: 8, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000", fontWeight: 'bold' }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', color: "#000" }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%', height: 25 }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                }); */
                displayValue = true;
                layout = { display: 'grid', gridTemplateColumns: '1fr', gap: '10mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3mm' }}>
                            <div className="product" style={{
                                fontFamily: 'Arial, sans-serif',
                                border: '1px solid #000',
                                padding: '2mm',
                                height: '30mm',
                                width: '105mm',
                                textAlign: 'left',
                                boxSizing: 'border-box',
                                margin: '1mm',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }} key={index}>
                                <div style={{ fontSize: '8px', fontWeight: 'bold', color: "#000" }}>
                                    {produto.Nome}
                                </div>
                                <div style={{ fontSize: '10px', color: "#000" }}>
                                    PREÇO UN.:<br />
                                </div>
                                <div style={{color: "#000", flexDirection: 'row', display: 'flex', flexGrow: 1, gap: 30}}>
                                    <strong style={{ fontSize: '16px' }}>{(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                    <div style={{ display: 'flex', justifyContent: 'center', color: "#000" }}>
                                        <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                                    </div>
                                </div>


                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 8:
                /* layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: 12, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000", fontWeight: 'bold' }}>CÓD: {produto.Codigo}
                            </div>
                            <div style={{ fontSize: 8, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 'bold', color: "#000", fontWeight: 'bold' }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                }); */
                displayValue = false;
                layout = { display: 'grid', gridTemplateColumns: '1fr',  gap: '0mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div
                            className="product"
                            style={{
                                fontFamily: 'Arial, sans-serif',
                                border: '1px solid #000',
                                padding: '10px',
                                height: '30mm',
                                width: '105mm',
                                textAlign: 'left',
                                boxSizing: 'border-box',
                                //marginBottom: '2mm'/* '20px auto' */, 
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                //alignItems: 'center'
                            }}
                            key={index}
                        >
                            <div className="productInfo" style={{ flexGrow: 1 }}>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: "#000" }}>{produto.Nome}</div>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: "#000" }}>PREÇO UN.:</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: "#000" }}>{produto.PrecoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                <div style={{ fontSize: '10px', color: "#000" }}>COD. BARRA: {produto.Codigo}</div>
                            </div>
                            <div className="barcodeContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4%' }}>
                                <img
                                    className="barcode"
                                    style={{ /* marginBottom: '2px' ,*/ height: '60px', transform: 'rotate(90deg)', width: '100px' }}
                                    id={barcodeId}
                                    alt="barcode"
                                />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 9:
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: '12px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div> */}
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 10:
                layout = { display: 'grid', gridTemplateColumns: 'repeat(3, 33mm)', gap: '3mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div className="product" style={{
                            fontFamily: 'Arial, sans-serif',
                            border: '1px solid #000',
                            padding: '1mm',
                            height: '22mm',
                            width: '33mm',
                            textAlign: 'center',
                            boxSizing: 'border-box',
                            margin: '1mm',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }} key={index}>
                            <div style={{ fontSize: '12px', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#000" }}>
                                {produto.Nome}
                            </div>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', color: "#000" }}>
                                {(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                            </div> */}
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 11:
                displayValue = true;
                layout = { display: 'grid', gridTemplateColumns: '1fr', gap: '10mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3mm' }}>
                            <div className="product" style={{
                                fontFamily: 'Arial, sans-serif',
                                border: '1px solid #000',
                                padding: '2mm',
                                height: '30mm',
                                width: '105mm',
                                textAlign: 'left',
                                boxSizing: 'border-box',
                                margin: '1mm',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }} key={index}>
                                <div style={{ fontSize: '8px', fontWeight: 'bold', color: "#000" }}>
                                    {produto.Nome}
                                </div>
                                <div style={{ fontSize: '10px', color: "#000" }}>
                                    PREÇO UN.:<br />
                                </div>
                                <div style={{color: "#000", flexDirection: 'row', display: 'flex', flexGrow: 1, gap: 30}}>
                                    <strong style={{ fontSize: '16px' }}>{(produto.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                    <div style={{ display: 'flex', justifyContent: 'center', color: "#000" }}>
                                        <img className="barcode" id={barcodeId} alt="barcode" style={{ width: '100%' }} />
                                    </div>
                                </div>


                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            case 12:
                displayValue = false;
                layout = { display: 'grid', gridTemplateColumns: '1fr', gap: '10mm' };
                items?.forEach((produto, index) => {
                    const barcodeId = `barcode-${escapeId(produto.Codigo)}`;
                    const productDiv = (
                        <div
                            className="product"
                            style={{
                                fontFamily: 'Arial, sans-serif',
                                border: '1px solid #000',
                                padding: '10px',
                                height: '30mm',
                                width: '105mm',
                                textAlign: 'left',
                                boxSizing: 'border-box',
                                //marginBottom: '2mm'/* '20px auto' */, 
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                //alignItems: 'center'
                            }}
                            key={index}
                        >
                            <div className="productInfo" style={{ flexGrow: 1 }}>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: "#000" }}>{produto.Nome}</div>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: "#000" }}>PREÇO UN.:</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: "#000" }}>{produto.PrecoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                <div style={{ fontSize: '10px', color: "#000" }}>COD. BARRA: {produto.Codigo}</div>
                            </div>
                            <div className="barcodeContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4%' }}>
                                <img
                                    className="barcode"
                                    style={{ marginBottom: '2px', height: '60px', transform: 'rotate(90deg)', width: '100px' }}
                                    id={barcodeId}
                                    alt="barcode"
                                />
                            </div>
                        </div>
                    );
                    container.push(productDiv);
                });
                break;
            default:
                container.push(<span key="default" style={{ color: '#000' }}>Selecione uma opção válida!</span>);
                break;
        }
        return (
            <div style={layout}>
                {container}
            </div>
        );
    };

    return (
        <div>
            {/*<Sidebar className={styles.noPrint}/>*/}
            <div className={styles.buttons}>
                <div className={styles.divImage}>
                    <Image src="/logo.png" alt="Logo" width={130} height={40} quality={100} priority={true} />
                    {/* <button onClick={handleLogout} style={{ padding: 10}}>Sair</button> */}
                    {/* <h1 style={{ color: "#fff", textAlign: "center" }}>Pedidos</h1> */}
                </div>
                <div className={styles.divSidebar}>
                    <h1 className={styles.titlePage}>Impressão dos Produtos</h1>
                    <Sidebar />
                </div>
                <button className={styles.button} onClick={() => router.back()}>Voltar</button>
                <button className={styles.button} onClick={() => window.print()}>Imprimir</button>
                <select className={styles.select} onChange={handleSelectChange}>
                    <option value='default' selected>Selecione a etiqueta</option>
                    <option value='1'>Produto 1 - 2 Linhas</option>
                    <option value='2'>Produtos 1 - 3 Linhas</option>
                    <option value='3'>Produtos 2 - 2 Linhas</option>
                    <option value='4'>Produtos 2 - 3 Linhas</option>
                    <option value='5'>Produtos 3 - 2 Linhas</option>
                    <option value='6'>Produtos 3 - 3 Linhas</option>
                    <option value='7'>Gôndola 1</option>
                    <option value='8'>Gôndola 2</option>
                    {/* <option value='9'>Medida 33 x 22 - 03</option>
                    <option value='10'>Medida 33 x 25 - 03</option>
                    <option value='11'>11- Etiqueta Mode 1</option>
                    <option value='12'>12- Etiqueta Mode 2</option> */}
                </select>
            </div>
            <div id="productsContainer">
                {renderProducts()}
            </div>
        </div>
    );
}
export default ImpressaoProdutos;
