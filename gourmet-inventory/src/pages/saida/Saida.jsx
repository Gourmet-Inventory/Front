import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Saida.module.css";
import imgFechar from "../../utils/assets/Fechar.svg";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import ModalSaida from "../../components/modalSaida/modalSaida";
import api from "../../api";

function Saida() {
    const [pratos, setPratos] = useState([]);
    const [pratosSelecionados, setPratosSelecionados] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/pratos/${localStorage.empresaId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
                console.log(response.data);
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

    const adicionarPrato = (prato) => {
        setPratosSelecionados([...pratosSelecionados, prato]);
    };

    const limparLista = () => {
        setPratosSelecionados([]);
    };

    const removerPrato = (index) => {
        const novosPratos = pratosSelecionados.filter((_, i) => i !== index);
        setPratosSelecionados(novosPratos);
    };

    return (
        <>
            <MenuLateral/>
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Saída"}/>
                </div>
                <ImgConfig />

                <div className={styles["formPratos"]}>
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
                                    <button onClick={() => adicionarPrato(prato)}>Adicionar</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles["saidaPratos"]}>
                        <div className={styles["saida"]}>
                            <div className={styles["tituloSaida"]}>
                                <span>Quant</span>
                                <span>Pratos</span>
                                <button onClick={limparLista}>Limpar Lista</button>
                            </div>
                            <div className={styles["corpoSaida"]}>
                                {pratosSelecionados.map((prato, index) => (
                                    <div className={styles["cardSaida"]} key={index}>
                                        <div className={styles["quantPrato"]}>
                                            <span>-</span>
                                            <span>1</span>
                                            <span>+</span>
                                        </div>
                                        <span>{prato.nome}</span>
                                        <img src={imgFechar} alt="Remover" onClick={() => removerPrato(index)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles["botoes"]}>
                            <button id={styles["buttonSaida"]} onClick={() => setOpenVizualizar(true)}>Finalizar</button>
                            <button id={styles["buttonRelatorio"]} onClick={() => setOpenVizualizar(true)}>Relatório</button>
                        </div>
                    </div>

                    <ModalSaida isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)} tituloModal={"Revisão"}/>
                </div>
            </div>
        </>
    );
}

export default Saida;
