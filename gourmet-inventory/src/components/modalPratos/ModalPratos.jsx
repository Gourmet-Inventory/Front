import React, { Children, useEffect, useState } from "react";
import styles from "./ModalPratos.module.css";
import fechar from "../../utils/assets/Fechar.svg"

function ModalPratos({isOpen, setModalOpen, children, tituloModal, categoriaModal}) {
    

    if(isOpen){
        return (
            <>
                <div className={styles["form"]}>
                
                    <div className={styles["modal"]}>
                    <div className={styles["tituloModal"]}>
                    
                    <div className={styles["titulos"]}>
                        <span id={styles["titulo"]}>{tituloModal}</span>
                        <span>{categoriaModal}</span>
                    </div>
                        <img src={fechar} onClick={setModalOpen }/>
                    </div>
                    <div>
                        {children}
                    </div>
                    </div>
                </div>
            </>
        )
    }

    return null;
   
}

export default ModalPratos;