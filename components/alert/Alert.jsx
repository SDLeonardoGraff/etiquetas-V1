import React from 'react';
import styles from './Alert.module.css';

const Alert = ({ show, handleClose, message1, message2, message3, message4 }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h2 className={styles.h2}>Alerta</h2>
                <p>{message1 ? message1 : ""}</p>
                <br></br>
                <p>{message2 ? message2 : ""}</p>
                <br></br>
                <p>{message3 ? message3 : ""}</p>
                <br></br>
                {/*  */}
                {message4.length > 0 && (
                    <ul>
                        {message4.map((field, index) => (
                            <p key={index}>{field}</p>
                        ))}
                    </ul>
                )}
                <button onClick={handleClose} className={styles.button}>OK</button>
            </div>
        </div>
    );
};

export default Alert;
