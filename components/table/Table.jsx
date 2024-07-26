"use client";

import styles from "./table.module.css";
//import { useGlobalContext } from "@/context/GlobalContext";
import moment from "moment";
import escolherOpcao from "@/hooks/useEscolha";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import Alert from "../alert/Alert";

const Table = ({ dados, setVisible, visible }) => {
    const { updateGlobalState } = useGlobalContext();
    const router = useRouter();
    const [isModalOpen, setModalOpen] = useState(false);
    const [pedidoEscolido, setPedidoEscolido] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");
    const [message4, setMessage4] = useState([]);
    /* const handleCheckboxChange = () => {
        setVisible(!visible);
    } */

    const closeModal = () => {
        setModalOpen(false);
    }

    const closeAlert = () => {
        setShowAlert(!showAlert);
    }

    const handleClick = (index) => {
        //setPedidoEscolido(dados[index]);
        updateGlobalState({ etiqueta: dados[index] });
        setModalOpen(escolherOpcao(dados[index]));
        /* const newData = dadosTeste.map(item => ({
            Empresa: item.Empresa,
            Cliente: item.Cliente,
            Codigo: item.Codigo,
            NumeroNFe: item.NumeroNFe,
            ClienteCNPJ: item.ClienteCNPJ,
            Logradouro: item.Logradouro,
            LogradouroNumero: item.LogradouroNumero,
            Bairro: item.Bairro,
            Municipio: item.Municipio,
            UF: item.UF,
            CEP: item.CEP,
            Data: item.Data,
        })).forEach(item => {
            const nullOrEmptyFields = Object.entries(item).filter(([key, value]) => value === null || value === "");
            if (nullOrEmptyFields.length > 0) {
                console.log(`Pedido ${item.Codigo} tem os seguintes campos nulos ou vazios:`);
                nullOrEmptyFields.forEach(([key]) => {
                    console.log(key);
                });
            }
        }); */

        if (!escolherOpcao(dados[index])) {
            //setMessage1("A maioria das informações não está preenchida.");
            setMessage2("Etiqueta não pode ser gerada!");

            const itemArray = [dados[index]];

            itemArray.map(item => ({
                Empresa: item.Empresa,
                Cliente: item.Cliente,
                Codigo: item.Codigo,
                NumeroNFe: item.NumeroNFe,
                ClienteCNPJ: item.ClienteCNPJ,
                Logradouro: item.Logradouro,
                LogradouroNumero: item.LogradouroNumero,
                Bairro: item.Bairro,
                Municipio: item.Municipio,
                UF: item.UF,
                CEP: item.CEP,
                Data: item.Data,
            })).forEach(item => {
                const nullOrEmptyFields = Object.entries(item).filter(([key, value]) => value === null || value === "");
                if (nullOrEmptyFields.length > 0) {
                    setMessage3(`Pedido ${item.Codigo} tem os seguintes campos nulos ou vazios:`);
                    /* nullOrEmptyFields.forEach(([key]) => {
                        console.log(key);
                    }); */
                    setMessage4(nullOrEmptyFields.map(([key]) => key));
                    console.log(nullOrEmptyFields.map(([key]) => key));
                }
            });

            //console.log(itemArray);
            //console.log(nullOrEmptyFields);

            setShowAlert(!showAlert);
            return;
        }

        
        router.push('impressaoPedido');
        return;
    };

    //console.log(isModalOpen);

    return (
        <div className={styles.content}>
            <table className={styles.customTable}>
                <thead className={styles.Thead}>
                    <tr className={styles.Tr}>
                        <th className={styles.Th}>Selecione</th>
                        <th className={styles.Th}>Código</th>
                        <th className={styles.Th}>Data</th>
                        <th className={styles.Th}>Empresa</th>
                        <th className={styles.Th}>Cliente</th>
                        <th className={styles.Th}>NFe nº</th>
                        <th className={styles.Th}>Forma Pagamento</th>
                        <th className={styles.Th}>Finalizado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dados.map((item, index) => (
                            <tr className={styles.Tr} key={index}>
                                <td className={styles.Td}>
                                    {/*<input type="checkbox" onChange={handleCheckboxChange}></input>*/}
                                    <button className={styles.button} onClick={() => handleClick(index)}>📝 Imprimir</button>
                                </td>
                                <td className={styles.Th}>{item.Codigo}</td>
                                <td className={styles.Th}>{moment(item.Data).format('DD/MM/YYYY')}</td>
                                <td className={styles.Th}>{item.Empresa}</td>
                                <td className={styles.Th}>{item.Cliente}</td>
                                <td className={styles.Th}>{item.NumeroNFe}</td>
                                <td className={styles.Th}>{item.FormaPagamento}</td>
                                <td className={styles.Th}>{item.Finalizado === true ? '✔️' : '❌'}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* {
                isModalOpen ? (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContent}>
                            <h1 className={styles.title}>Layout Etiqueta</h1>
                            <div id={styles.printableModal}>
                                <div key={pedidoEscolido.ID} className={styles.modalBorda}>
                                    <p className={styles.item}>Codigo Pedido: {pedidoEscolido.Codigo}</p>
                                    <p className={styles.item}>Codigo Municipio: {pedidoEscolido.CodigoMunicipio}</p>
                                    <p className={styles.item}>Data Pedido: {pedidoEscolido.Data}</p>
                                    <p className={styles.item}>Data Pedido: {pedidoEscolido.Data}</p>
                                    <p className={styles.item}>Data Pedido: {pedidoEscolido.Data}</p>
                                    <p className={styles.item}>Data Pedido: {pedidoEscolido.Data}</p>
                                    <p className={styles.item}>Data Pedido: {pedidoEscolido.Data}</p>
                                    <p className={styles.item}>Data Pedido: {pedidoEscolido.Data}</p>
                                    <p className={styles.item}>Data Pedido: {pedidoEscolido.Data}</p>
                                </div>
                                <button className={styles.buttonPrint} onClick={() => navigation.push('/impressao')}>
                                Imprimir
                            </button>
                            </div>
                        </div>
                        <button className={styles.closeButton} onClick={() => closeModal()}>
                            &times;
                        </button>
                    </div>
                ) :
                    (
                        <></>
                    )
            } */}
            <Alert show={showAlert} handleClose={closeAlert} message1={message1} message2={message2} message3={message3} message4={message4} />
        </div>
    )
}

export default Table;

{/*  */ }