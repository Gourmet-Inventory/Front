import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./PagPratos.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import ModalPratos from "../../../components/modalPratos/ModalPratos";
import api from "../../../api";

function PagPratos() {
    const [pratos, setPratos] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [viewData, setViewData] = useState({ nome: '', categoria: '', preco: '', alergicos: [], descricao: '', ingredientes: [] });

    const navigate = useNavigate();

    

    useEffect(() => {
        api.get(`/pratos/${localStorage.empresaId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                console.log(response.data)
                setPratos(response.data);
            } else {
                console.error('A resposta da API não é um array:', response.data);
                setPratos([]);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar pratos:', error);
            setPratos([]);
        });
    }, []);

    const handleCadastro = () => {
        navigate("/gourmet-inventory/cadastrar-pratos");
    };

    const handleEditar = (prato) => {
        navigate("/gourmet-inventory/atualizar-pratos", { state: { prato } });
    };

    const confirmRemove = (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Tem certeza que deseja excluir este prato?</p>
                    <button className={styles["toast-button-yes"]} onClick={() => handleDelete(id, closeToast)}>Sim</button>
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

    const handleView = (prato) => {
        setViewData(prato);
        setOpenVizualizar(true);
    };

    const handleDelete = (id, closeToast) => {
        if (id) {
            api.delete(`/pratos/${localStorage.empresaId}/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            })
            .then(() => {
                setPratos(pratos.filter(prato => prato.id !== id));
                closeToast();
                setOpenVizualizar(false);
                toast.success("Prato excluído com sucesso!");
            })
            .catch(error => {
                console.error('Erro ao excluir prato:', error);
                toast.error("Erro ao excluir prato.");
            });
        } else {
            toast.error("ID do prato é inválido.");
        }
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
                    {pratos.map(prato => (
                        <div className={styles["card"]} key={prato.id}>
                            <div className={styles["imgCard"]}>
                                {/* Aqui você pode colocar a imagem do prato, se tiver */}
                                {/* <img src={prato.imagem} alt={prato.nome} /> */}
                            </div>
                            <div className={styles["infoCard"]}>
                                <span>Nome: {prato.nome}</span>
                                <span>Descrição: {prato.descricao}</span>
                                <span>Preço: {prato.preco}</span>
                                <span>Categoria: {prato.categoria}</span>
                                <button onClick={() => handleView(prato)}>Ver Mais</button>
                            </div>
                        </div>
                    ))}
                </div>

                {viewData && (
                    <ModalPratos
                        isOpen={openVizualizar}
                        setModalOpen={() => setOpenVizualizar(!openVizualizar)}
                        tituloModal={viewData.nome}
                        categoriaModal={`Categoria: ${viewData.categoria}`}
                    >
                        <div className={styles["corpoVizualizar"]}>
                            <div className={styles["corpoModal"]}>
                                <div className={styles["descricaoModal"]}>
                                    <div className={styles["imgDescricao"]}>
                                        <img src={viewData.imagem} alt={viewData.nome} />
                                    </div>
                                    <div className={styles["textDescricao"]}>
                                        <span>Preço: {viewData.preco}</span>
                                        <span>Alérgicos: {viewData.alergicos?.join(", ")}</span>
                                        <span>Descrição: {viewData.descricao}</span>
                                    </div>
                                </div>
                                <div className={styles["ingredientesModal"]}>
                                    <h2>Ingredientes</h2>
                                    <div className={styles["ingredientes"]}>
                                        {viewData.ingredientes?.map((ing, index) => (
                                            <div key={index}>
                                                {ing.ingrediente}: {ing.valorMedida} {ing.tipoMedida}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles["buttonModal"]}>
                                <button id={styles["editar"]} onClick={() => handleEditar(viewData)}>Editar</button>
                                <button id={styles["excluir"]} onClick={() => confirmRemove(viewData.id)}>Excluir</button>
                            </div>
                        </div>
                    </ModalPratos>
                )}
            </div>
        </>
    );
}

export default PagPratos;
