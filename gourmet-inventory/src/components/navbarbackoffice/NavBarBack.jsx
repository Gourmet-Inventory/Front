import React from 'react';
import styles from './NavBarBack.module.css';

function NavBarBack({LogoInicio}){
    return (
    <nav>
                <div className={styles.imgEmpresa}>
                    <img src={LogoInicio} alt="Logo" /> 
                    <span>BACKOFFICE</span>
                    <button>Cadastrar Empresa</button>
                    <button>Cadastrar Responsável</button>
                </div>
        </nav>
    );
};

export default NavBarBack;
