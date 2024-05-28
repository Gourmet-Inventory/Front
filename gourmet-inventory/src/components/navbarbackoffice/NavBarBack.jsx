import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavBarBack.module.css';
import { Link } from 'react-router-dom';

function NavBarBack({ LogoInicio }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCadastroEmpresa = () => {
        navigate('/empresas/cadastro');
    };

    const handleResponsavel = () => {
        navigate('/empresas/responsaveis');
    };

    return (
        <nav className={styles.nav}>
            <Link to="/empresas">
                <img src={LogoInicio} alt="Logo" className={styles.logo} />
                </Link>
                <span className={styles.title}>BACKOFFICE</span>
            
            <div className={styles.buttons}>
                {location.pathname !== '/empresas/cadastro' && (
                    <button onClick={handleCadastroEmpresa} className={styles.button}>Cadastrar Empresa</button>
                )}
                {location.pathname !== '/empresas/responsavel' && (
                <button className={styles.button}>Área Responsavel</button>
                )}
                </div>
        </nav>
    );
}

export default NavBarBack;
