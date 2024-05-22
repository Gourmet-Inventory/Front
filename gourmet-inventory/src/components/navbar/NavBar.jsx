import React from 'react';
import styles from './NavBar.module.css';

    
    function NavBar({ logoInicio, scrollToSection}){
       

        return (
                <nav className={styles["navbar"]}>
                    <img src={logoInicio} className={styles["logoinicio"]} alt="Logo Início" />
                    <div className={styles["divLink"]}>
                    <ul>
                        <li><a href="#inicio" onClick={() => scrollToSection('inicio')}>Início</a></li>
                        <li><a href="#valores" onClick={() => scrollToSection('valores')}>Valores</a></li>
                        <li><a href="#equipe" onClick={() => scrollToSection('equipe')}>Equipe</a></li>
                        <li><a href="#contato" onClick={() => scrollToSection('contato')}>Contato</a></li>
                    </ul>
                        
                    </div>
                <button onClick={() => { window.location.href = '/login' }} >Login</button>
                
            </nav>
            
        );
    };

export default NavBar;