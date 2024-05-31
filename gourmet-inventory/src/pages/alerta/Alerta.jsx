import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import diaChecagem from "../../utils/assets/Alerta data de verificar.svg"
import ItemAcabando from "../../utils/assets/Alerta Item Acabando Branco.svg"
import dataProxima from "../../utils/assets/Alerta data próxima.svg"
import itemVazio from "../../utils/assets/Alerta Item Vazio.svg"
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
                <div className={styles["tabelaForm"]}>
                    <span>Item</span>
                    <span>Tipo de Alerta</span>
                    <span>Info</span>
                </div>
                <div className={styles["filtrosForm"]}>
                    <h1>Filtros</h1>
                    <div className={styles["filtros"]}>
                        <div className={styles["card"]}>
                            <span>Dia de Checagem</span>
                            <div className={styles["legenda"]}>
                                <img src={diaChecagem}/>
                                <span>0</span>
                            </div>
                        </div>
                        <div className={styles["card"]}>
                            <span>Estoque Vazio</span>
                            <div className={styles["legenda"]}>
                                <img src={itemVazio}/>
                                <span>0</span>
                            </div>
                        </div>
                        <div className={styles["card"]}>
                            <span>Data Próxima</span>
                            <div className={styles["legenda"]}>
                                <img src={dataProxima}/>
                                <span>0</span>
                            </div>
                        </div>
                        <div className={styles["card"]}>
                            <span>Estoque Acabando</span>
                            <div className={styles["legenda"]}>
                                <img src={ItemAcabando}/>
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        </>
    )
};

export default Alerta;