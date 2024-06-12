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
    const [pratos, setPratos] = useState([{}]);
    const [filteredPratos, setFilteredPratos] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [viewPrato, setViewPrato] = useState({ nome: '', categoria: '', preco: '', alergicos: [], descricao: '', ingredientes: [] });

    const navigate = useNavigate();

    useEffect(() => {
        const db_pratos = localStorage.getItem("cad_pratos")
            ? JSON.parse(localStorage.getItem("cad_pratos"))
            : [];
        setPratos(db_pratos);
        setFilteredPratos(db_pratos); // Inicializa com todos os dados
    }, []);

    const handleCadastro = () => {
        navigate("/gourmet-inventory/cadastrar-pratos"); // Ajuste o caminho conforme necessário
    };

    const handleEditar = (prato) => {
        navigate("/gourmet-inventory/atualizar-pratos", { state: { prato } }); // Ajuste o caminho conforme necessário
    };

    const handleView = (prato) => {
        setViewPrato(prato);
        setOpenVizualizar(true);
    };

    const handleRemove = (nome) => {
        const newArray = pratos.filter((item) => item.nome !== nome);
        setPratos(newArray);
        setFilteredPratos(newArray); // Atualiza a lista filtrada
        localStorage.setItem("cad_pratos", JSON.stringify(newArray));
        setOpenVizualizar(false);
    };

    const confirmRemove = (nome) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Tem certeza que deseja excluir este prato?</p>
                    <button className={styles["toast-button-yes"]} onClick={() => { handleRemove(nome); closeToast(); }}>Sim</button>
                    <button className={styles["toast-button-no"]} onClick={closeToast}>Não</button>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    return (
        <> 
            <MenuLateral />
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Pratos"} />
                    <button onClick={handleCadastro}>Cadastrar Pratos</button>
                </div>
                <ImgConfig />

                <div className={styles["form"]}>
                    {filteredPratos.map((prato, index) => (
                        <div className={styles["card"]} key={index}>
                            <div className={styles["imgCard"]}>
                                <img src={exemplo} alt={prato.nome} />
                            </div>
                            <div className={styles["infoCard"]}>
                                <span>Nome: {prato.nome}</span>
                                <span>Categoria: {prato.categoria}</span>
                                <span>Tempo de Preparo: {prato.tempoPreparo}</span>
                                <button onClick={() => handleView(prato)}>Ver Mais</button>
                            </div>
                        </div>
                    ))}
                </div>
                {viewPrato && (
                    <ModalPratos
                        isOpen={openVizualizar}
                        setModalOpen={() => setOpenVizualizar(!openVizualizar)}
                        tituloModal={viewPrato.nome}
                        categoriaModal={`Categoria: ${viewPrato.categoria}`}
                    >
                        <div className={styles["corpoVizualizar"]}>
                            <div className={styles["corpoModal"]}>
                                <div className={styles["descricaoModal"]}>
                                    <div className={styles["imgDescricao"]}>
                                        <img src={exemplo} alt={viewPrato.nome} />
                                    </div>
                                    <div className={styles["textDescricao"]}>
                                        <span>Preço: {viewPrato.preco}</span>
                                        <span>Alérgicos: {viewPrato.alergicos?.join(", ")}</span>
                                        <span>Descrição: {viewPrato.descricao}</span>
                                    </div>
                                </div>
                                <div className={styles["ingredientesModal"]}>
                                    <h2>Ingredientes</h2>
                                    <div className={styles["ingredientes"]}>
                                        {viewPrato.ingredientes?.map((ing, index) => (
                                            <div key={index}>
                                                {ing.ingrediente}: {ing.valorMedida} {ing.tipoMedida}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles["buttonModal"]}>
                                <button id={styles["editar"]} onClick={() => handleEditar(viewPrato)}>Editar</button>
                                <button id={styles["excluir"]} onClick={() => confirmRemove(viewPrato.nome)}>Excluir</button>
                            </div>
                        </div>
                    </ModalPratos>
                )}
            </div>
        </>
    );
}

export default PagPratos;
