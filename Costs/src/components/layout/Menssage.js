import { useState, useEffect } from 'react';

import styles from './Menssage.module.css';

function Menssage({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        if (!msg) {
            setVisible(false);
            return;
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000000000000000)

        return () => clearTimeout(timer)

    }, [msg])



    return (
        <>
            {visible && (
                <div className={`${styles.menssage} ${styles[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Menssage