import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./PagPratos.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import exemplo from "../../../utils/assets/prato-com-legumes-ilustracao-em-vetor-comida-saudavel-design-700-126717843 4.svg";
import imgUpload from "../../../utils/assets/Group 191.svg";
import ModalPratos from "../../../components/modalPratos/ModalPratos";

function PagPratos() {
    const [openVizualizar, setOpenVizualizar] = useState(false);

    const navigate = useNavigate();

    const handleCadastro = () => {
        navigate("/gourmet-inventory/cadastrar-pratos"); // Ajuste o caminho conforme necessário
    };

    const handleEditar = () => {
        navigate("/gourmet-inventory/atualizar-pratos"); // Ajuste o caminho conforme necessário
    };

    return (
        <> 
            {/* <MenuLateral/> */}
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Pratos"}/>
                    <button onClick={handleCadastro}>Cadastrar Pratos</button>
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
                <ModalPratos isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)} tituloModal={"Hambúrguer"} categoriaModal={"Categoria: Carne"}>
                    {/* {children} */}
                    <div className={styles["corpoVizualizar"]}>
                        <div className={styles["corpoModal"]}>
                        <div className={styles["descricaoModal"]}>
                            <div className={styles["imgDescricao"]}>
                                <img src={exemplo}/>
                            </div>
                            <div className={styles["textDescricao"]}>
                                <span>Preço: </span>
                                <span>Alérgicos:</span>
                                <span>Descrição:</span>
                            </div>
                        </div>
                        <div className={styles["ingredientesModal"]}>
                            <h2>Ingredientes</h2>
                            <div className={styles["ingredientes"]}>

                            </div>
                        </div>
                        </div>

                        <div className={styles["buttonModal"]}>
                            <button id={styles["editar"]} onClick={handleEditar}>Editar</button>
                            <button id={styles["excluir"]}>Excluir</button>
                        </div>
                    </div>
                </ModalPratos>
            </div>
        </>
    );
}

export default PagPratos;
