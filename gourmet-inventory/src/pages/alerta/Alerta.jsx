import React from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import diaChecagem from "../../utils/assets/Alerta data de verificar.svg";
import ItemAcabando from "../../utils/assets/Alerta Item Acabando Branco.svg";
import dataProxima from "../../utils/assets/Alerta data próxima.svg";
import itemVazio from "../../utils/assets/Alerta Item Vazio.svg";
import styles from "./Alerta.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";

const Alerta = () => {
    return (
        <>  
        <MenuLateral/>
            <div className={styles.body}>
                <div className={styles.cabecalho}>
                    <BarraPesquisa tituloPag={"Históricos Alertas"}/>
                </div>
                <ImgConfig/>

                <div className={styles.form}>
                    <div className={styles.tabelaForm}>
                        <div className={styles.tituloForm}>
                            <span>Item</span>
                            <span>Tipo de Alerta</span>
                            <span>Info</span>
                        </div>

                        <div className={styles.filtrosForm}>
                            <h1>Filtros</h1>
                            <div className={styles.filtros}>
                                <div className={styles.card}>
                                    <span>Dia de Checagem</span>
                                    <div className={styles.legenda}>
                                        <img src={diaChecagem} alt="Dia de Checagem"/>
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <span>Estoque Vazio</span>
                                    <div className={styles.legenda}>
                                        <img src={itemVazio} alt="Estoque Vazio"/>
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <span>Data Próxima</span>
                                    <div className={styles.legenda}>
                                        <img src={dataProxima} alt="Data Próxima"/>
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <span>Estoque Acabando</span>
                                    <div className={styles.legenda}>
                                        <img src={ItemAcabando} alt="Estoque Acabando"/>
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alerta;
