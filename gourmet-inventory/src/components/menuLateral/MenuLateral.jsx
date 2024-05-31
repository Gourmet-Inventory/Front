import React,{useState} from "react";
import styles from './MenuLateral.module.css'
import { useLocation,useNavigate } from 'react-router-dom';

import logo from "../../utils/assets/Possíveis Paletas (5) 1.svg";

import homeImg from "../../utils/assets/IconesSidebar/home.svg"
import homeImgSelected from "../../utils/assets/IconesSidebar/homeSelected.svg"

import pratosImg from "../../utils/assets/IconesSidebar/prato.svg"
import pratosImgSelected from "../../utils/assets/IconesSidebar/pratoSelected.svg"

import estoqueImg from "../../utils/assets/IconesSidebar/maca.svg"
import estoqueImgSelected from "../../utils/assets/IconesSidebar/macaSelected.svg"

import fornecedorImg from "../../utils/assets/IconesSidebar/fornecedor.svg"
import fornecedorImgSelected from "../../utils/assets/IconesSidebar/fornecedorSelected.svg"



function MenuLateral() {
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();


    const toggleOverlay = () => {
        setIsExpanded(!isExpanded);
    };

    const getClassName = (path) => {
        return location.pathname === path ?  styles.imgBorderSelected : styles.imgBorder;
    };

    return (
        <div 
            className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}
            onClick={toggleOverlay} 
        >
            <img className={styles["imgLogo"]} src={logo} alt="Logo" onClick={toggleOverlay} />
            <div className={styles["icons"]}>
                <span className={getClassName('/gourmet-inventory/menu')}>
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/menu' ? homeImgSelected : homeImg} alt="Home Selected" />
                    {isExpanded && <span className={styles.iconText}>Menu Início</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/estoque')}>
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/estoque' ? estoqueImgSelected : estoqueImg} alt="Estoque" />
                    {isExpanded && <span className={styles.iconText}>Estoque</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/Pratos')}>
                    <img className={styles.imgHome} src={pratosImg} alt="Pratos" />
                    {isExpanded && <span className={styles.iconText}>Pratos</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/Saida')}>
                    <img className={styles.imgHome} src={homeImg} alt="Home" />
                    {isExpanded && <span className={styles.iconText}>Saída</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/Fornecedor')}>
                    <img className={styles.imgHome} src={fornecedorImg} alt="Fornecedor" />
                    {isExpanded && <span className={styles.iconText}>Fornecedor</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/Alertas')}>
                    <img className={styles.imgHome} src={homeImg} alt="Home" />
                    {isExpanded && <span className={styles.iconText}>Alertas</span>}
                </span>
            </div>
            <button className={`${isExpanded ? styles.botao : ''}`}>Sair</button>
        </div>
    );
};

export default MenuLateral;