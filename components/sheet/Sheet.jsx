import React from 'react';
import styles from './Sheet.module.css';

const Sheet = ({ isOpen, onClose, children }) => {
    return (
        <div className={`${styles.sheet} ${isOpen ? styles.open : ''}`}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.content}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default Sheet;
