import React from "react";
import logo from "../assets/logo.png";
import styles from "./Header.module.css";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Website Logo" className={styles.logo} />
            </div>
        </header>
    );
};

export default Header;