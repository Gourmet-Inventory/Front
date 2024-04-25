import React from 'react';
import styles from './NavBar.module.css';

    const NavBar = ({ logoInicio }) => {
        return (
            <nav className={styles["navbar"]}>
                <img src={logoInicio} className={styles["logoinicio"]} alt="Logo Início" />
                
                    <a href="">Início</a>
                    <a href="">Valores</a>
                    <a href="">Aplicação</a>
                    <a href="">Equipe</a>
                    <a href="">Contato</a>

                    <button>Login</button>
                
            </nav>
            
        );
    };

export default NavBar;