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

                        
                    </div>

                    
                    </div>

                    <Editar isOpen={openEditar} setModalOpen={() => setOpenEditar(!openEditar)}>
                        {/* children */}
                        <div className={styles["editar"]}>
                                <h3>Editar Fornecedor</h3>
                            <div className={styles["inputEditar"]}>
                                <div className={styles["input"]}>
                                    <span>Nome</span>
                                    <input type="text" />
                                </div>
                                <div className={styles["input"]}>
                                    <span>Logradouro</span>
                                    <input type="text" />
                                </div>
                                <div className={styles["input"]}>
                                    <span>Numeração</span>
                                    <input type="text" />
                                </div>
                                <div className={styles["input"]}>
                                    <span>Telefone</span>
                                    <input type="text" />
                                </div>
                                <div className={styles["input"]}>
                                    <span>Categoria</span>
                                    <input type="text" />
                                </div>
                            </div>
                            <button>Salvar</button>
                        </div>
                    
                    </Editar>
                </div>
            </>
        )
    }

    return null;
   
}

export default ModalVizualizarForn;