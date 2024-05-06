import React from 'react';
import styles from './NavBar.module.css';
import home from '../../pages/home/Home'

    
    const NavBar = ({ logoInicio }) => {

        // const scrollToSection = (event, sectionId) => {
        //     event.preventDefault(); // Evita o comportamento padrão do link
        //     const section = document.getElementById(sectionId); // Obtém a seção correspondente
        //     if (section) {
        //       section.scrollIntoView({ behavior: 'smooth' }); // Faz a rolagem suave para a seção
        //     }
        //   };
        
        
        return (
                <nav className={styles["navbar"]}>
                    <img src={logoInicio} className={styles["logoinicio"]} alt="Logo Início" />
                    <div className={styles["divLink"]}>
                        
                        <a href="">Início</a>
                        <a href="">Valores</a>
                        <a href="">Equipe</a>
                        <a href="">Contato</a>
                        
                    </div>
                <button onClick={() => { window.location.href = '/login' }} >Login</button>
                
            </nav>
            
        );
    };

export default NavBar;