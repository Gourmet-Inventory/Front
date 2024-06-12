import React, { Children, useEffect, useState } from "react";
import styles from "./modalSaida.module.css";
import fechar from "../../utils/assets/Fechar.svg"

function ModalSaida({isOpen, setModalOpen, children, tituloModal, categoriaModal}) {
    

    if(isOpen){
        return (
            <>
                <div className={styles["form"]}>
                
                    <div className={styles["modal"]}>
                    <div className={styles["tituloModal"]}>
                    
                        <div className={styles["titulos"]}>
                            <span id={styles["titulo"]}>{tituloModal}</span>    
                        </div>
                    
                        <img src={fechar} onClick={setModalOpen }/>
                    </div>
                        <div className={styles["data"]}>
                            <span>Data:</span>
                            <input type="text"/>
                        </div>
                    <div className={styles["corpoModal"]}>
                        <div className={styles["tituloSaida"]}>
                            <span>Quant</span>
                            <span>Pratos</span>
                        </div>
                        <div className={styles["cardSaida"]}>
                            <div className={styles["quantPrato"]}>
                                <span>1</span>
                            </div>
                            <span>Prato1</span>
                        </div>
                    </div>

                    <div className={styles["buttonModal"]}>
                        <button id={styles["finalizar"]}>Finalizar</button>
                        <button id={styles["cancelar"]}>Cancelar</button>
                    </div>
                    </div>
                </div>
            </>
        )
    }

    return null;
   
}

export default ModalSaida;