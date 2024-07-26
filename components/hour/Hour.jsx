"use client";
import { useEffect, useState } from "react";
import styles from "./hour.module.css";

const Hour = ({}) => {
    const [hour, setHour] = useState(null);

    useEffect(() => {
        const getHour = () => {
            let h = new Date();
            let relogio = h.getHours() + ":" + String(h.getMinutes()).padStart(2, '0') + ":" + String(h.getSeconds()).padStart(2, '0');
            setHour(relogio);
        }

        getHour();
        const interval =setInterval(getHour, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.relogio}>
            Hora Atual: {hour}
        </div>
    )
}

export default Hour;