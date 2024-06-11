import React, { useState } from "react";
import styles from "./barraPesquisa.module.css";
import imgLupa from "../../utils/assets/lupa 5.svg";
import imgFiltro from "../../utils/assets/filtro.svg";

const BarraPesquisa = ({ tituloPag }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // const handleSearchChange = (e) => {
    //     const term = e.target.value;
    //     setSearchTerm(term);
    //     onSearch(term); // Chama a função de callback passada via props
    // };

    return (
        <>
            <div className={styles["pesquisa"]}>
                <h1>{tituloPag}</h1>
                <div className={styles["barraPesquisa"]}>
                    <input
                        type="text"
                        placeholder="Pesquisar"
                    />
                    <div className={styles["imgs"]}>
                        <img src={imgLupa} alt="Lupa" />
                        <img src={imgFiltro} alt="Filtro" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BarraPesquisa;
