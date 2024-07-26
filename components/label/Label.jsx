import React from 'react';
import styles from './Label.module.css';

const Label = ({ doc }) => {
    console.log(doc)
    return (
        <div className={styles.labelContainer}>
            <div className={styles.remetente}>
                <p>REMETENTE: {doc.empresa}</p>
            </div>
            <div className={styles.destinatario}>
                <h2>DADOS DO DESTINATÁRIO</h2>
                <p>Nome: {doc.nome}</p>
                <p>Pedido nº: {doc.pedido}</p>
                <p>CPF/CNPJ: {doc.cpf} Telefone: {doc.telefone}</p>
                <p>Endereço: {doc.endereco}</p>
                <p>Bairro: {doc.bairro}</p>
                <p>Cidade: {doc.cidade}</p>
                <p>UF: {doc.uf} CEP: {doc.cep}</p>
            </div>
        </div>
    );
};

export default Label;
