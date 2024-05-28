import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import Exluir from "../../components/excluir/excluir"
import styles from "./pagFornecedor.module.css";
import { toast } from 'react-toastify';

const pagFornecedor = () => {
    return (
        <>  
        <div className={styles["body"]}>
            {/* <div className={styles["cabecalho"]}>
            <BarraPesquisa tituloPag={"Fornecedor"}/>
            <button>Cadastrar Fornecedor</button>
            </div>
            <ImgConfig/>

            <div className={styles["form"]}>
                <div className={styles["tituloForm"]}>
                    <span>Nome</span>
                    <span>Categoria</span>
                    <span>Telefone</span>
                </div>
            </div> */}

            <Exluir/>

        </div>
        </>
    )
};

export default pagFornecedor;