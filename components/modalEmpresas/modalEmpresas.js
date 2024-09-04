import React from "react";
import styles from './modalEmpresa.module.css';

export default function ModalEmpresas({ isOpen, onClose, children }) {
    if(!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
            </div>
            <button className={styles.closeButton} onClick={onClose} style={{ color: "#000"}}>
                Fechar
            </button>
        </div>
    )
}