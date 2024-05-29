import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Alerta.module.css";
import { toast } from 'react-toastify';

const Alerta = () => {
    return (
        <>  
        <div className={styles["body"]}>
            <div className={styles["cabecalho"]}>
            <BarraPesquisa tituloPag={"Históricos Alertas"}/>
            </div>
            <ImgConfig/>

            <div className={styles["form"]}>
                <div className={styles["tituloForm"]}>
                    <span>Item</span>
                    <span>Tipo de Alerta</span>
                    <span>Info</span>
                </div>
            </div>


        </div>
        </>
    )
};

export default Alerta;