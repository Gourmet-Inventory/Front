import React, { useEffect, useState, useNavigate } from "react";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./PagPratos.module.css";
import {toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import exemplo from "../../../utils/assets/prato-com-legumes-ilustracao-em-vetor-comida-saudavel-design-700-126717843 4.svg";
import ModalPratos from "../../../components/modalPratos/ModalPratos";

function PagPratos() {

    const [openVizualizar, setOpenVizualizar] = useState(false);

    return (
    <> 
     {/* <MenuLateral/> */}
        <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Pratos"}/>
                    <button>Cadastrar Pratos</button>
                </div>
                <ImgConfig />

                <div className={styles["form"]}>
                    
                   <div className={styles["card"]}>
                        <div className={styles["imgCard"]}>
                            <img src={exemplo}/>
                        </div>
                        <div className={styles["infoCard"]}>
                            <span>Nome: </span>
                            <span>Categoria: </span>
                            <span>Tempo de Preparo: </span>
                            <button onClick={() => {setOpenVizualizar(true); }}>Ver Mais</button>
                        </div>
                    </div> 
                </div>
            <ModalPratos isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)}/>
        </div>
    </>
    );
}

export default PagPratos;
