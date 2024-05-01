import React from 'react';
import styles from './NavBar.module.css';

    const NavBar = ({ logoInicio }) => {
        return (
                <nav className={styles["navbar"]}>
                    <img src={logoInicio} className={styles["logoinicio"]} alt="Logo Início" />
                    <div className={styles["divLink"]}>
                        <a href=" ">Início</a>
                        <a href="">Valores</a>
                        <a href="">Equipe</a>
                        <a href="">Contato</a>
                    </div>
                <button onClick={() => { window.location.href = '/login' }} >Login</button>
                
            </nav>
            
        );
    };

export default NavBar;