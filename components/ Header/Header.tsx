import React from "react";
import Link from "next/link";
import logo from "../../logo.png";
import styles from "./Header.module.css";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <img src={logo.src} alt="Website Logo" className={styles.logo} />
            </div>
            <nav>
                <Link href="/">Home</Link> | <Link href="/about">About</Link> |{" "}
                {/* <Link href="/users">Users List</Link> |{" "}
                <a href="/api/users">Users API</a> */}
            </nav>
        </header>
    );
};

export default Header;