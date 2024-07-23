import React, { Children, useEffect, useState } from "react";
import styles from "./ModalVizualizarFunc.module.css";
import fechar from "../../utils/assets/Fechar.svg"
import Editar from "../modalCadastroForn/ModalCadastro"

function ModalVizualizarFunc({isOpen, setModalOpen, children, titulo}) {
    const[openEditar, setOpenEditar] = useState(false);

    if(isOpen){
        return (
            <>
                <div className={styles["form"]}>
                
                    <div className={styles["modal"]}>

                   
                        

                    <div className={styles["titulo"]}>
                        <div className={styles["tituloForn"]}>
                        <h3>{titulo}</h3>
                        </div>
                        <div className={styles["imagem"]}>
                            <img src={fechar} onClick={setModalOpen}/>
                        </div>
                    </div>

                    
                    <div className={styles["corpo"]}>
                        
                        {children}
                        
                    </div>

                    
                    </div>

                    
                </div>
            </>
        )
    }

    return null;
   
}

export default ModalVizualizarFunc;