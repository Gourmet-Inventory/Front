import React from "react";
import styles from "./ModalRelatorios.module.css";
import fechar from "../../../utils/assets/Fechar.svg";

const ModalRelatorios = ({ isOpen, setModalOpen, children, tituloModal, categoriaModal, dataModal }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.form}>
            <div className={styles.modal}>
                <div className={styles.tituloModal}>
                   
                    <div className={styles.titulos}>
                        <span id={styles.titulo}>{tituloModal}</span>
                        <span>{categoriaModal}</span>
                        </div>
                        <img src={fechar} onClick={setModalOpen} alt="Fechar" />
                    </div>
                    <div className={styles.dataModal}>
                        <div className={styles.datas}>
                        
                        <span id={styles.data}>{dataModal}</span>
                        <span>{categoriaModal}</span>
                        </div>
                    
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default ModalRelatorios;
