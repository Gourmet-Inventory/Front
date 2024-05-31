import React, { useEffect, useState } from "react";
import styles from "./barraPesquisa.module.css";
import imgLupa from "../../utils/assets/lupa 5.svg"
import imgFiltro from "../../utils/assets/filtro.svg"

const barraPesquisa = ({tituloPag}) => {
    return (
        <>
        <div className={styles["pesquisa"]}>
            <h1>{tituloPag}</h1>
           <div className={styles["barraPesquisa"]}>
                    <input type="text" placeholder="Pesquisar"/>
                    <div className={styles["imgs"]}>
                    <img src={imgLupa} />
                    <img src={imgFiltro} />
                    </div>
           </div>
        </div>
        </>
    )
};

export default barraPesquisa;