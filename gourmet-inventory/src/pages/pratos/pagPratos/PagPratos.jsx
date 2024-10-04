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
    const [viewData, setViewData] = useState({
        idPrato: '',
        nome: '',
        descricao: '',
        preco: '',
        alergicosRestricoes: [],
        categoria: '',
        receitaPrato: [],
        foto: '' // Adicionado campo para a URL da foto
    });

    const navigate = useNavigate();

    const getPratos = async () => {
        try {
            const response = await api.get(`/pratos/${localStorage.empresaId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            });
            if (Array.isArray(response.data)) {
                setPratos(response.data);
            } else {
                console.error('A resposta da API não é um array:', response.data);
                setPratos([]);
            }
        } catch (error) {
            console.error('Erro ao buscar pratos:', error);
        }
    };

    useEffect(() => {
        getPratos();
    }, []);

    const handleCadastro = () => {
        navigate("/gourmet-inventory/cadastrar-pratos");
    };

    const handleEditar = (prato) => {
        navigate("/gourmet-inventory/cadastrar-pratos", { state: { prato } });
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
        setViewData(prato); // Atualiza o estado com os dados do prato
        setOpenVizualizar(true);
    };

    const handleDelete = (id, closeToast) => {
        if (id) {
            api.delete(`/pratos/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            })
            .then(() => {
                setPratos(pratos.filter(prato => prato.idPrato !== id));
                closeToast();
                setOpenVizualizar(false);
                getPratos();
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

    const handleRelatorio = async () => {
        try {
            const response = await api.get(`/consulta-nutricao-api/${localStorage.empresaId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` },
                responseType: 'arraybuffer' // Important for handling binary data
            });

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'nutrition_data.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                toast.success("Relatório gerado com sucesso!");
            } else {
                toast.error("Erro ao gerar relatório.");
            }
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            toast.error("Erro ao gerar relatório.");
        }
    };

    return (
        <>
            <MenuLateral />
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Pratos"} />
                    <ImgConfig />
                    <button className={styles.botaoCadastro} onClick={handleCadastro}>Cadastrar Pratos</button>
                </div>

                <div className={styles["form"]}>
                    {pratos.map(prato => (
                        <div className={styles["card"]} key={prato.idPrato}>
                            <div className={styles["nome"]}>
                                <span className={styles["titulo"]}>{prato.nome}</span>
                                <span>Categoria: {prato.categoria}</span>
                            </div>
                            <div className={styles["dados"]}>
                                <span>Descrição: {prato.descricao}</span>
                                <span>Preço: R$ {prato.preco}</span>
                            </div>
                            {/* Exibição da imagem do prato */}
                            {prato.foto && (
                                <div className={styles["imagem-container"]}>
                                    <img
                                        src={prato.foto}
                                        alt={`Imagem de ${prato.nome}`}
                                        className={styles["imagem-prato"]}
                                    />
                                </div>
                            )}
                            <button onClick={() => handleView(prato)}>Ver Mais</button>
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
                                    <div className={styles["textDescricao"]}>
                                        <span>Preço: {viewData.preco},00</span>
                                        <span>Alérgicos: {viewData.alergicosRestricoes?.join(", ")}</span>
                                        <span>Descrição: {viewData.descricao}</span>
                                    </div>
                                </div>
                                {/* Exibição da imagem no modal */}
                                {viewData.foto && (
                                    <div className={styles["imagem-container-modal"]}>
                                        <img
                                            src={viewData.foto}
                                            alt={`Imagem de ${viewData.nome}`}
                                            className={styles["imagem-prato-modal"]}
                                        />
                                    </div>
                                )}
                                <div className={styles["ingredientesModal"]}>
                                    <h2>Ingredientes</h2>
                                    <div className={styles["ingredientes"]}>
                                        {viewData.receitaPrato?.map((item, index) => (
                                            <div key={index}>
                                                - {item.estoqueIngrediente.nome}: {item.valorMedida} {item.tipoMedida}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles["buttonModal"]}>
                                <button id={styles["editar"]} onClick={() => handleEditar(viewData)}>Editar</button>
                                <button id={styles["excluir"]} onClick={() => confirmRemove(viewData.idPrato)}>Excluir</button>
                            </div>
                        </div>
                    </ModalPratos>
                )}
            </div>
        </>
    );
}

export default PagPratos;
