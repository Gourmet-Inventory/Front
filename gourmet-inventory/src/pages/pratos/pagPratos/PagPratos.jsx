import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./PagPratos.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import ModalPratos from "../../../components/modalPratos/ModalPratos"
import api from "../../../api";

function PagPratos() {
    const [pratos, setPratos] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [viewPrato, setViewPrato] = useState({ nome: '', categoria: '', preco: '', alergicos: [], descricao: '', ingredientes: [] });

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [alergicos, setAlergicos] = useState([]);
    const [ingrediente, setIngrediente] = useState("");
    const [valorMedida, setValorMedida] = useState("");
    const [tipoMedida, setTipoMedida] = useState("");
    const [ingredientes, setIngredientes] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [viewData, setViewData] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // Recuperar pratos da API ao carregar a página
        api.get(`/pratos/${localStorage.empresaId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
        .then(response => {
            setPratos(response.data);
        })
        .catch(() => {
           
        });
    }, []);

    const handleCadastro = () => {
        navigate("/gourmet-inventory/cadastrar-pratos"); // Ajuste o caminho conforme necessário
    };

    const handleEditar = (prato) => {
        navigate("/gourmet-inventory/atualizar-pratos", { state: { prato } }); // Ajuste o caminho conforme necessário
    };


    const confirmRemove = (nome) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Tem certeza que deseja excluir este prato?</p>
                    <button className={styles["toast-button-yes"]}>Sim</button>
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

    const handleEdit = (prato) => {
        setDataEdit(prato);
        setNome(prato.nome);
        setDescricao(prato.descricao);
        setPreco(prato.preco);
        setCategoria(prato.categoria);
        setAlergicos(prato.alergicos);
        setIngredientes(prato.ingredientes);
    };

    const handleView = (prato) => {
        setViewData(prato);
        setOpenVizualizar(true);
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
                    {console.log(pratos)}
                    {pratos.map(prato => (
                        <div className={styles["card"]} key={prato.id}>
                            <div className={styles["imgCard"]}>
                                {/* Aqui você pode colocar a imagem do prato, se tiver */}
                                <img src={prato.imagem} alt={prato.nome} />
                            </div>
                            <div className={styles["infoCard"]}>
                                <span>Nome: {prato.nome}</span>
                                <span>Descrição: {prato.descricao}</span>
                                <span>Preço: {prato.preco}</span>
                                <span>Categoria: {prato.categoria}</span>
                                <button onClick={handleView}>Ver Mais</button>
                                {/* Adicione mais detalhes do prato conforme necessário */}
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
                                        <img src={ImgConfig} alt={viewPrato.nome} />
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
