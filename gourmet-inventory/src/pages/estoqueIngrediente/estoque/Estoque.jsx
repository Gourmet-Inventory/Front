import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./Estoque.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import CardEstoque from "../../../components/cardEstoque/CardEstoque";

const   Estoque = () => {
    return (
        < >
        <MenuLateral/>
            <div className={styles["cabecalho"]}>
            <BarraPesquisa tituloPag={"Estoque"}/>
            <ImgConfig/>
            <button>Cadastrar Novo Item</button>
            </div>
            <div className={styles["area"]}>
                <CardEstoque/>
            </div>
            
        </>
    )
};

export default Estoque;