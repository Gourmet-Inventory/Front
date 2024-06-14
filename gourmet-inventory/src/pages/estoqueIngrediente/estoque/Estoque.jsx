import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./Estoque.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import CardEstoque from "../../../components/cardEstoque/CardEstoque";
import ModalAlertas from "../../../components/modalAlertas/modalAlertas";
import api from "../../../api";
import fechar from "../../../utils/assets/Fechar.svg";

const Estoque = () => {
    const [cardsEstoqueData, setCardsEstoqueData] = useState([]);
    const navigate = useNavigate();
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    function recuperarValorCard() {
        api.get(`/estoque-ingrediente/${localStorage.empresaId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then((response) => {
            console.log(response);
            const { data } = response;
            setCardsEstoqueData(data);
        }).catch(() => {
            toast.error("Erro ao buscar estoque!");
        });
    }

    useEffect(() => {
        recuperarValorCard();
    }, []);

    const handleOpenModal = (data) => {
        setSelectedData(data);
        setOpenVizualizar(true);
    };

    return (
        <>
            <MenuLateral />
            <div className={styles["cabecalho"]}>
                <BarraPesquisa tituloPag={"Estoque"} />
                <ImgConfig />
                <button onClick={() => navigate('/gourmet-inventory/estoque-cadastro-manipulado')}>Cadastrar Novo Item</button>
            </div>
            <div className={styles["area"]}>
                <div className={styles["card"]}>
                    {cardsEstoqueData && cardsEstoqueData.map((data) => (
                        <CardEstoque
                            key={data.idItem}
                            nome={data.nome}
                            categoria={data.categoria}
                            dtAviso={data.dtaAviso}
                            valorTotal={data.valorTotal}
                            manipulado={data.manipulado}
                            onOpenModal={handleOpenModal}
                            data={data}
                        />
                    ))}
                </div>
            </div>
            {selectedData && (
                <ModalAlertas isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)}>
                    <div className={styles["tituloModal"]}>
                        <div className={styles["tituloIngrediente"]}>
                            <span id={styles["titulo"]}>{selectedData.nome}</span>
                            <span>categoria: {selectedData.categoria}</span>
                        </div>
                        <img src={fechar} onClick={() => setOpenVizualizar(false)} alt="Fechar"/>
                    </div>
                    
                    <div className={styles["corpoModal"]}>
                        <div className={styles["legendaModal"]}>
                            <div className={styles["legendasIngred"]}>
                                <span>Lote:</span>
                                <span>Data de Checagem:</span>
                                <span>Quantidade Total:</span>
                                <span>Quantidade Unitária:</span>
                                <span>Peso unitário:</span>
                                <span>Medida:</span>
                                <span>Local de armazenamento:</span>
                            </div>
                        </div>
                        <div className={styles["dadosModal"]}>
                            <div className={styles["dadosIngred"]}>
                                <span>{selectedData.lote}</span>
                                <span>{selectedData.dtaAviso}</span>
                                <span>{selectedData.valorTotal}</span>
                                <span>{selectedData.unidades}</span>
                                <span>{selectedData.valorMedida}</span>
                                <span>{selectedData.tipoMedida}</span>
                                <span>{selectedData.localArmazenamento}</span>
                            </div>
                        </div>
                    </div>
                </ModalAlertas>
            )}
        </>
    );
};

export default Estoque;
