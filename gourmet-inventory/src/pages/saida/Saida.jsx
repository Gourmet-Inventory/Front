import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Saida.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import exemplo from "../../utils/assets/prato-com-legumes-ilustracao-em-vetor-comida-saudavel-design-700-126717843 4.svg";


function Saida() {
    const [openVizualizar, setOpenVizualizar] = useState(false);

    const navigate = useNavigate();

    return (
        <> 
            {/* <MenuLateral/> */}
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Saída"}/>
                </div>
                <ImgConfig />

                <div className={styles["formPratos"]}>
                    <div className={styles["form"]}>
                        <div className={styles["card"]}>
                            <div className={styles["imgCard"]}>
                                <img src={exemplo}/>
                            </div>
                            <div className={styles["infoCard"]}>
                                <span>Nome: </span>
                                <span>Categoria: </span>
                                <span>Tempo de Preparo: </span>
                                <button>Adicionar</button>
                            </div>
                        </div> 
                    </div>

                    <div className={styles["saidaPratos"]}>
                        <div className={styles["saida"]}>
                            
                        </div>
                    </div>
                    
                </div>
                
                

                
            </div>
        </>
    );
}

export default Saida;
