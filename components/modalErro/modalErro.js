import React from "react";
import styles from './modal.module.css';

export default function ModalErro({ isOpen, onClose, children }) {
    if(!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
            </div>
            <button className={styles.closeButton} onClick={onClose}>
                Fechar
            </button>
        </div>
    )
}

