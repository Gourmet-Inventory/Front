import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Estoque.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";

const   Estoque = () => {
    return (
        <>
        <MenuLateral/>
            <div className={styles["cabecalho"]}>
            <BarraPesquisa tituloPag={"Estoque"}/>
            <button>Cadastrar Novo Item</button>
            </div>
            <ImgConfig/>

            <div className={styles["form"]}>
                <div className={styles["tituloForm"]}>
                    <span>Nome</span>
                    <span>Categoria</span>
                    <span>Telefone</span>
                </div>
            </div>

        </>
    )
};

export default Estoque;