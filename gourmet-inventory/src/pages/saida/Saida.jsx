import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Saida.module.css";
import imgFechar from "../../utils/assets/Fechar.svg";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import ModalSaida from "../../components/modais/modalSaida/modalSaida";
import fechar from "../../utils/assets/Fechar.svg";
import api from "../../api";

function Saida() {
    const [descontarEstoque, setDescontarEstoque] = useState(false);    
    const [pratos, setPratos] = useState([]);
    const [pratosSelecionados, setPratosSelecionados] = useState([]);
    const [historicoAdicoes, setHistoricoAdicoes] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [modalPratos, setModalPratos] = useState([]);
    const [dataRelatorio, setDataRelatorio] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/pratos/${localStorage.idEmpresa}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
        .then(response => {
            if (Array.isArray(response.data)) {
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

    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };

    const gerarRelatorio = () => {
        const idPratoList = modalPratos.map(prato => prato.idPrato);
        if (!dataRelatorio) {
            toast.error("Por favor, selecione uma data.");
            return;
        }
        const formattedDate = formatDate(dataRelatorio);
        const requestBody = { idPratoList, descontarEstoque };

        api.post(`/relatorio/gerar/${formattedDate}`, requestBody, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then(response => {
            if (response.status === 200) {
                toast.success("Saída salva com sucesso!");
                setPratosSelecionados([]);  // Limpar a lista de pratos
                setHistoricoAdicoes([]);    // Limpar o histórico de adições
                setModalPratos([]);         // Limpar os pratos do modal
                setOpenVizualizar(false);   // Fechar o modal
            } else {
                toast.error("Erro ao salvar saída.");
            }
        }).catch(error => {
            console.error('Erro ao gerar relatório:', error);
            toast.error("Erro ao gerar relatório.");
        });
    };

    const adicionarPrato = (prato) => {
        setPratosSelecionados([...pratosSelecionados, prato]);
        setHistoricoAdicoes([...historicoAdicoes, prato]);
    };

    const desfazerAdicao = () => {
        if (historicoAdicoes.length > 0) {
            const ultimoPratoAdicionado = historicoAdicoes[historicoAdicoes.length - 1];
            const novosPratosSelecionados = pratosSelecionados.filter(
                (prato, index) => index !== pratosSelecionados.lastIndexOf(ultimoPratoAdicionado)
            );
            setPratosSelecionados(novosPratosSelecionados);
            setHistoricoAdicoes(historicoAdicoes.slice(0, -1));
        }
    };

    const limparLista = () => {
        setPratosSelecionados([]);
        setHistoricoAdicoes([]);
    };

    const removerPrato = (index) => {
        const novosPratos = pratosSelecionados.filter((_, i) => i !== index);
        setPratosSelecionados(novosPratos);
    };

    const finalizar = () => {
        setModalPratos(pratosSelecionados);
        setOpenVizualizar(true);
    };

    const toggleOpenVizualizar = () => {
        setOpenVizualizar(!openVizualizar);
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
                            <div className={styles["card"]} key={prato.idPrato}>
                                <div className={styles["nome"]}>
                                <span className={styles["titulo"]}> {prato.nome}</span>
                                <span>Categoria: {prato.categoria}</span>
                                </div>
                                <div className={styles["dados"]}>
                                <span>Descrição: {prato.descricao}</span>
                                <span>Preço:R$  {prato.preco}</span>
                                </div>
                                <button onClick={() => adicionarPrato(prato)}>Adicionar</button>
                            </div>
                        ))}
                    </div>

                    <div className={styles["saidaPratos"]}>
                        <div className={styles["saida"]}>
                            <div className={styles["tituloSaida"]}>
                                <span>Pratos</span>
                            </div>
                            <div className={styles["corpoSaida"]}>
                                {pratosSelecionados.map((prato, index) => (
                                    <div className={styles.cardSaida} key={index}>
                                        <span className={styles.texto}>
                                        <span>{prato.nome}</span>
                                        </span>
                                        <img src={imgFechar} alt="Remover" onClick={() => removerPrato(index)} />
                                    </div>
                                ))}
                            </div>
                            <span className={styles.botoes1}>
                            <button onClick={desfazerAdicao}>Desfazer</button>
                            <button onClick={limparLista}>Limpar Lista</button>
                            </span>
                        </div>
                        <div className={styles["botoes"]}>
                            <button id={styles["buttonSaida"]} onClick={finalizar}>Finalizar</button>
                        
                        </div>
                    </div>

                    <ModalSaida
                        isOpen={openVizualizar}
                        setOpenVizualizar={toggleOpenVizualizar}
                    >
                        <div className={styles["modal"]}>
                            <div className={styles["tituloModal"]}>
                                <div className={styles["titulos"]}>
                                    <span id={styles["titulo"]}>Revisão</span>
                                </div>
                                <img src={fechar} onClick={() => setOpenVizualizar(false)} />
                            </div>
                            <div className={styles["data"]}>
                                <span>Data:</span>
                                <input
                                    type="date"
                                    value={dataRelatorio}
                                    onChange={(e) => setDataRelatorio(e.target.value)}
                                />
                            </div>
                            <div> <input  type="checkbox" id="1"  checked={descontarEstoque} onChange={(e) => setDescontarEstoque(e.target.checked)}  /> Descontar do estoque.</div>
                            <div className={styles["corpoModal"]}>
                                <div className={styles["tituloSaida"]}>
                                    <span>Preço</span>
                                    <span>Pratos</span>
                                </div>
                                {modalPratos.map((prato, index) => (
                                    <div className={styles["cardSaida1"]} key={index}>
                                        <div className={styles["quantPrato"]}>
                                            <span>{prato.preco}</span>
                                        </div>
                                        <span>{prato.nome}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className={styles["buttonModal"]}>
                                <button id={styles["finalizar"]} onClick={gerarRelatorio}>Finalizar</button>
                                <button id={styles["cancelar"]} onClick={() => setOpenVizualizar(false)}>Cancelar</button>
                            </div>
                        </div>
                    </ModalSaida>
                </div>
            </div>
        </>
    );
}

export default Saida;
