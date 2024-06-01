import React, { Children, useEffect, useState } from "react";
import styles from "./ModalVizualizarForn.module.css";
import fechar from "../../utils/assets/Fechar.svg"
import Editar from "../modalCadastroForn/ModalCadastro"

function ModalVizualizarForn({isOpen, setModalOpen, children, titulo}) {
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
                        <div className={styles["dados"]}>
                        {children}
                        </div>

                        <div className={styles["botao"]}>
                            <button id={styles["editar"]} onClick={() => setOpenEditar(true)}>Editar</button>
                            <button id={styles["excluir"]}>Excluir</button>
                        </div>
                    </div>

                    
                    </div>

                    <Editar isOpen={openEditar} setModalOpen={() => setOpenEditar(!openEditar)}>
                        {/* children */}
                            
                    
                    </Editar>
                </div>
            </>
        )
    }

    return null;
   
}

export default ModalVizualizarForn;