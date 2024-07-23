import React from "react";
import styles from "./ModalMes.module.css";
import fechar from "../../utils/assets/Fechar.svg";

const ModalMes = ({ isOpen, setModalOpen, children, tituloModal, categoriaModal, dataModal }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.form}>
            <div className={styles.modal}>
                <div className={styles["imgModal"]}>
                    <img src={fechar} onClick={setModalOpen} alt="Fechar" />
                </div>
                <div className={styles["corpoModal"]}>
                    <span>Selecione o mês no qual deseje extrair:</span>
                    <select id="mesExtracao"> 
                    '   <option value="">Selecione o mês</option>
                        <option value="1">JANEIRO</option>    
                        <option value="2">FEVEREIRO</option>   
                        <option value="3">MARÇO</option> 
                        <option value="4">ABRIL</option> 
                        <option value="5">MAIO</option> 
                        <option value="6">JUNHO</option> 
                        <option value="7">JULHO</option> 
                        <option value="8">AGOSTO</option> 
                        <option value="9">SETEMBRO</option> 
                        <option value="10">OUTUBRO</option> 
                        <option value="11">NOVEMBRO</option> 
                        <option value="12">DEZEMBRO</option>      
                    </select>
                    <button>EXTRAIR</button>
                </div>
            </div>
        </div>
    );
};

export default ModalMes;
