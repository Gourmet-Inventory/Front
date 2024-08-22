import React,{useState,useEffect} from "react";
import styles from './MenuLateral.module.css'
import { useLocation,useNavigate } from 'react-router-dom';

import logo from "../../utils/assets/Menu.svg";
import fechar from "../../utils/assets/Fechar.svg"

import homeImg from "../../utils/assets/IconesSidebar/home.svg"
import homeImgSelected from "../../utils/assets/IconesSidebar/homeSelected.svg"

import pratosImg from "../../utils/assets/IconesSidebar/prato.svg"
import pratosImgSelected from "../../utils/assets/IconesSidebar/pratoSelected.svg"

import estoqueImg from "../../utils/assets/IconesSidebar/estoque.svg"
import estoqueImgSelected from "../../utils/assets/IconesSidebar/estoqueSelected.svg"

import fornecedorImg from "../../utils/assets/IconesSidebar/fornecedor.svg"
import fornecedorImgSelected from "../../utils/assets/IconesSidebar/fornecedorSelected.svg"

import saidaImg from "../../utils/assets/IconesSidebar/saida.svg";
import saidaImgSelected from "../../utils/assets/IconesSidebar/saidaSelected.svg";

import alertaImg from "../../utils/assets/IconesSidebar/alerta.svg";
import alertaImgSelected from "../../utils/assets/IconesSidebar/alertaSelected.svg";

import relatorioImg from "../../utils/assets/IconesSidebar/relatorio.svg";
import relatorioSelected from "../../utils/assets/IconesSidebar/relatorioSelected.svg";



function MenuLateral() {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    const [nome, setNome] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [nomeCargo, setNomeCargo] = useState('');

    useEffect(() => {
       const nomeGuardado = localStorage.getItem('empresaNome');
       const nomeGuardado1 = localStorage.getItem('nome');
       const nomeGuardado2 = localStorage.getItem('cargo');
            setNome(nomeGuardado)
            setNomeUsuario(nomeGuardado1)
            setNomeCargo(nomeGuardado2)
    }, []);




    const toggleOverlay = () => {
        setIsExpanded(!isExpanded);
    };

    const getClassName = (path) => {
        return location.pathname === path ?  styles.imgBorderSelected : styles.imgBorder;
    };

    

    return (
        <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`} onClick={toggleOverlay}>
            <img 
                className={styles.imgLogo} 
                src={!isExpanded ? logo : ''} 
                alt="Logo" 
                onClick={toggleOverlay} 
            />
            
            {isExpanded && (
                <span className={styles.dados}>
                    <span className={styles.empresa}> <span className={styles.nomeEmpresa}>{nome}</span> <img src={fechar} alt="fechar"/></span>
                    <span className={styles.nomeUsuario}>{nomeUsuario} </span>
                    <span className={styles.nomeCargo}>{nomeCargo}</span>
                </span>
            )}
            <div className={styles["icons"]}>
            
                <span className={getClassName('/gourmet-inventory/estoque')} onClick={!isExpanded ? null : () => navigate('/gourmet-inventory/estoque')}>
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/estoque' ? estoqueImgSelected : estoqueImg} alt="Estoque" />
                    {isExpanded && <span className={styles.iconText}>Estoque </span> }
                </span>
                <span className={getClassName('/gourmet-inventory/pratos')} onClick={!isExpanded ? null : () => navigate('/gourmet-inventory/pratos')} >
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/pratos' ? pratosImgSelected : pratosImg} alt="Pratos" />
                    {isExpanded && <span className={styles.iconText}>Pratos</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/saida-pratos')} onClick={!isExpanded ? null : () => navigate('/gourmet-inventory/saida-pratos')} >
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/saida-pratos' ? saidaImgSelected : saidaImg} alt="Saida" />
                    {isExpanded && <span className={styles.iconText}>Saída</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/fornecedor')} onClick={!isExpanded ? null : () => navigate('/gourmet-inventory/fornecedor')}>
                <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/fornecedor' ? fornecedorImgSelected : fornecedorImg} alt="Fornecedor" />
                    {isExpanded && <span className={styles.iconText}>Fornecedor</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/alertas')} onClick={!isExpanded ? null : () => navigate('/gourmet-inventory/alertas')}>
                <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/alertas' ? alertaImgSelected : alertaImg} alt="Alertas" />
                    {isExpanded && <span className={styles.iconText}>Alertas</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/relatorios')} onClick={!isExpanded ? null : () => navigate('/gourmet-inventory/relatorios')}>
                <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/relatorios' ? relatorioSelected : relatorioImg} alt="Alertas" />
                    {isExpanded && <span className={styles.iconText}>Relatórios</span>}
                </span>
            </div>
        </div>
    );
};

export default MenuLateral;