import React from 'react';
import styles from './Options.module.css';

const Options = () => {
    return (
        <div className={styles.options}>
            <button className={styles.optionButton}>Gerar Etiqueta de Envio</button>
        </div>
    );
};

export default Options;
