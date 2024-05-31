import React, { Children, useEffect, useState } from "react";
import styles from "./ModalCadastro.module.css";
import fechar from "../../utils/assets/Fechar.svg"

function ModalCadastro({isOpen, setModalOpen, children}) {

    if(isOpen){
        return (
            <>
                <div className={styles["form"]}>
                
                    <div className={styles["modal"]}>
                    <img src={fechar} onClick={setModalOpen}/>
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

export default ModalCadastro;