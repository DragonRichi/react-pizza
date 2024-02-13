import { Outlet } from "react-router-dom";

import styles from "./AuthLayout.module.scss"

export const AuthLayout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.logo}>
                <img width={300} height={300} src={`${import.meta.env.BASE_URL}/registerLogo.png`} alt="Logo" />
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
};