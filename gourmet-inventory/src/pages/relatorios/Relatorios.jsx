import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa"
import api from '../../api';
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Relatorios.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import 'react-toastify/dist/ReactToastify.css';

function Relatorios() {

    return (
        <>
           <MenuLateral/>
            <div className={styles["body"]}>
                 <BarraPesquisa tituloPag={"Relatórios"}/>
                 
            
            </div>
        </>
    );
}

export default Relatorios;

