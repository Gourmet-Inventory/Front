import React,{useState,useEffect} from "react";
import styles from './MenuLateral.module.css'
import { useLocation,useNavigate } from 'react-router-dom';

import logo from "../../utils/assets/Possíveis Paletas (5) 1.svg";
import logoExpanded from "../../utils/assets/IconesSidebar/imgBox.svg";

import homeImg from "../../utils/assets/IconesSidebar/home.svg"
import homeImgSelected from "../../utils/assets/IconesSidebar/homeSelected.svg"

import pratosImg from "../../utils/assets/IconesSidebar/prato.svg"
import pratosImgSelected from "../../utils/assets/IconesSidebar/pratoSelected.svg"

import estoqueImg from "../../utils/assets/IconesSidebar/maca.svg"
import estoqueImgSelected from "../../utils/assets/IconesSidebar/macaSelected.svg"

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

    useEffect(() => {
       const nomeGuardado = localStorage.getItem('empresaNome');
        if(nomeGuardado){
            setNome(nomeGuardado)
        }
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
                <span className={styles.nomeEmpresa}>
                    <p>{nome}</p>
                    <img className={styles['imgBox']} src={logoExpanded} />
                </span>
            )}
            <div className={styles["icons"]}>
                <span className={getClassName('/gourmet-inventory/menu')} onClick={!isExpanded ? null : () => navigate('/gourmet-inventory/menu')}  >
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/menu' ? homeImgSelected : homeImg} alt="Home Selected" />
                    {isExpanded && <span className={styles.iconText}>Menu Início</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/estoque')}>
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/estoque' ? estoqueImgSelected : estoqueImg} alt="Estoque" />
                    {isExpanded && <span className={styles.iconText} onClick={() => navigate('/gourmet-inventory/estoque')} >Estoque </span> }
                </span>
                <span className={getClassName('/gourmet-inventory/pratos')}>
                    <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/pratos' ? pratosImgSelected : pratosImg} alt="Pratos" />
                    {isExpanded && <span className={styles.iconText} onClick={() => navigate('/gourmet-inventory/pratos')}>Pratos</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/saida')}>
                <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/saida' ? saidaImgSelected : saidaImg} alt="Saída" />
                    {isExpanded && <span className={styles.iconText} onClick={() => navigate('/gourmet-inventory/saida-pratos')}>Saída</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/fornecedor')}>
                <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/fornecedor' ? fornecedorImgSelected : fornecedorImg} alt="Fornecedor" />
                    {isExpanded && <span className={styles.iconText} onClick={() => navigate('/gourmet-inventory/fornecedor')}>Fornecedor</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/alertas')}>
                <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/alertas' ? alertaImgSelected : alertaImg} alt="Alertas" />
                    {isExpanded && <span className={styles.iconText} onClick={() => navigate('/gourmet-inventory/alertas')}>Alertas</span>}
                </span>
                <span className={getClassName('/gourmet-inventory/relatorios')}>
                <img className={styles["imgHome"]} src={location.pathname === '/gourmet-inventory/relatorios' ? relatorioSelected : relatorioImg} alt="Alertas" />
                    {isExpanded && <span className={styles.iconText} onClick={() => navigate('/gourmet-inventory/relatorios')}>Relatórios</span>}
                </span>
            </div>
        </div>
    );
};

export default MenuLateral;