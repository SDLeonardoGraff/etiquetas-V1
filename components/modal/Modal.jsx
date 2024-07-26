import React from 'react';
import styles from './Modal.module.css';

const Modal = (closeModal, pedidoEscholido) => {
    
    console.log(pedidoEscholido.Codigo);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div key={pedidoEscholido.ID}>
                    <p className={styles.item}>Codigo Pedido: {pedidoEscholido.Codigo}</p>
                    <p className={styles.item}>Codigo Municipio: {pedidoEscholido.CodigoMunicipio}</p>
                    <p className={styles.item}>Data Pedido: {pedidoEscholido.Data}</p>
                </div>
            </div>
            <button className={styles.closeButton} onClick={() => closeModal()}>
                &times;
            </button>
        </div>
    );
};

export default Modal;
