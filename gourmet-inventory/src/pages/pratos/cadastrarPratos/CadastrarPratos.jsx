import React, { useEffect, useState } from "react";
import styles from "./CadastrarPratos.module.css";
import {toast } from 'react-toastify';
import imgUpload from "../../../utils/assets/Group 191.svg";

function CadastrarPratos() {

    return (
    <> 
        <div className={styles["body"]}>
            <div className={styles["cabecalho"]}>
                <button>Voltar</button>
                <div className={styles["titulo"]}>
                    <h1>Cadastrar Prato</h1>
                </div>
            </div>
            <div className={styles["corpo"]}>
                <div className={styles["form"]}>
                    <div className={styles["formCadastro"]}>
                        <div className={styles["imgCadastro"]}>
                            <img src={imgUpload}/>
                            <button>Adicionar Foto</button>
                        </div>
                        <div className={styles["infoCadastro"]}>
                            <div className={styles["dadosCadastro"]}>
                            <span>Nome:</span>
                            <div className={styles["input"]}>
                                <input type="text" />
                            </div>
                            <span>Preço:</span>
                            <div className={styles["input"]}>
                                <input type="text" />
                            </div>
                            <span>Alérgicos:</span>
                            <div className={styles["selected"]}>
                                <select name="alergicos">
                                    <option value=""></option>
                                </select>
                            </div>
                            <span>Descrição:</span>
                            <div className={styles["inputDescrição"]}>
                                <input type="text" />
                            </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className={styles["medidas"]}>
                    <h1>Ingredientes</h1>
                    <select name="ingredientes">
                            <option value=""></option>
                    </select>
                    <div className={styles["formMedidas"]}>
                            <div className={styles["valorMedida"]}>
                                <span>Valor Medida:</span>
                                <input type="text" />
                            </div>
                            <div className={styles["tipoMedida"]}>
                                <span>Tipo Medida:</span>
                                <select name="tipoMedida">
                                    <option value=""></option>
                                </select>
                                <button>+</button>
                            </div>
                       
                    </div>
                    <div className={styles["ingredientes"]}>

                    </div>
                    <button id={styles["botao-cadastrar-pratos"]}>Cadastrar</button>
                </div>
            </div>
            
        </div>
    </>
    );
}

export default CadastrarPratos;
