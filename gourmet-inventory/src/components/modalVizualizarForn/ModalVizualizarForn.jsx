import React, { Children, useEffect, useState } from "react";
import styles from "./ModalVizualizarForn.module.css";
import fechar from "../../utils/assets/Fechar.svg"

function ModalVizualizarForn({isOpen, setModalOpen, children, titulo}) {

    if(isOpen){
        return (
            <>
                <div className={styles["form"]}>
                
                    <div className={styles["modal"]}>

                    <div className={styles["imagem"]}>
                        <img src={fechar} onClick={setModalOpen}/>
                    </div>

                    <div className={styles["titulo"]}>
                        <h3>{titulo}</h3>
                    </div>

                    
                    <div className={styles["corpo"]}>
                        <div className={styles["dados"]}>
                        {children}
                        </div>

                        <div className={styles["botao"]}>
                            <button id={styles["editar"]}>Editar</button>
                            <button id={styles["excluir"]}>Excluir</button>
                        </div>
                    </div>

                    
                    </div>
                </div>
            </>
        )
    }

    return null;
   
}

export default ModalVizualizarForn;