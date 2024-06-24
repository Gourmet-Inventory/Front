import React, { useState, useEffect } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import diaChecagem from "../../utils/assets/Alerta data de verificar.svg";
import ItemAcabando from "../../utils/assets/Alerta Item Acabando Branco.svg";
import dataProxima from "../../utils/assets/Alerta data próxima.svg";
import itemVazio from "../../utils/assets/Alerta Item Vazio.svg";
import styles from "./Alerta.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import fechar from "../../utils/assets/Fechar.svg";
import ModalAlertas from "../../components/modalAlertas/modalAlertas";
import api from "../../api";

const Alerta = () => {
    const [itens, setItens] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [shownMessages, setShownMessages] = useState(new Set());

    useEffect(() => {
        const fetchAlertas = async () => {
            try {
                const response = await api.get(`/alerta/${localStorage.empresaId}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.token}` }
                });
                
                if (Array.isArray(response.data)) {
                    setItens(response.data);
                    if (!shownMessages.has("Alertas carregados com sucesso!")) {
                        toast.success("Alertas carregados com sucesso!");
                        setShownMessages(prev => new Set(prev).add("Alertas carregados com sucesso!"));
                    }
                } else {
                    console.error('A resposta da API não é um array:', response.data);
                    setItens([]);
                    if (!shownMessages.has("Erro ao carregar alertas.")) {
                        toast.error("Erro ao carregar alertas.");
                        setShownMessages(prev => new Set(prev).add("Erro ao carregar alertas."));
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar alertas:', error);
                setItens([]);
                if (!shownMessages.has("Erro ao buscar alertas.")) {
                    toast.error("Erro ao buscar alertas.");
                    setShownMessages(prev => new Set(prev).add("Erro ao buscar alertas."));
                }
            }
        };

        fetchAlertas();
        const intervalId = setInterval(fetchAlertas, 10000);

        return () => clearInterval(intervalId);
    }, [shownMessages]);

    const handleDelete = (idAlerta, e) => {
        e.stopPropagation();
        api.delete(`/alerta/${idAlerta}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
        .then(response => {
            setItens(itens.filter(item => item.idAlerta !== idAlerta));
            toast.success("Alerta excluído com sucesso!");
        })
        .catch(error => {
            console.error('Erro ao excluir alerta:', error);
            toast.error("Erro ao excluir alerta.");
        });
    };

    const handleView = (item) => {
        setSelectedItem(item);
        setOpenVizualizar(true);
    };

    const getAlertaImage = (tipoAlerta) => {
        switch (tipoAlerta) {
            case 'Dia de Checagem':
                return diaChecagem;
            case 'Estoque acabando':
                return ItemAcabando;
            case 'Data Proxima':
                return dataProxima;
            case 'Estoque vazio':
                return itemVazio;
            default:
                return diaChecagem;
        }
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // Função para contar o número de alertas de cada tipo
    const contarAlertas = () => {
        const quantidade = {
            estoqueVazioQtd: 0,
            estoqueAcabandoQtd: 0,
            diaChecagemQtd: 0,
            dataProximaQtd: 0,
            somaTotalAlertar: 0
        };

        itens.forEach(item => {
            switch (item.tipoAlerta) {
                case 'Estoque vazio':
                    quantidade.estoqueVazioQtd++;
                    break;
                case 'Estoque acabando':
                    quantidade.estoqueAcabandoQtd++;
                    break;
                case 'Dia de Checagem':
                    quantidade.diaChecagemQtd++;
                    break;
                case 'Data Proxima':
                    quantidade.dataProximaQtd++;
                    break;
                default:
                    break;
            }
        });

        quantidade.somaTotalAlertar = quantidade.estoqueVazioQtd + quantidade.estoqueAcabandoQtd + quantidade.diaChecagemQtd + quantidade.dataProximaQtd;
        return quantidade;
    };

    const quantidades = contarAlertas();

    return (
        <>  
            <MenuLateral/>
            <div className={styles.body}>
                <div className={styles.cabecalho}>
                    <BarraPesquisa tituloPag={"Histórico Alertas"}/>
                </div>
                <ImgConfig/>

                <div className={styles.form}>
                    <div className={styles.tabelaForm}>
                        <div className={styles["tabelaAlertas"]}>
                            <div className={styles.tituloForm}>
                                <span>Imagem</span>
                                <span>Item</span>
                                <span>Tipo de Alerta</span>
                                <span>Info</span>
                                <span>Ação</span>
                            </div>
                            <div className={styles["tabela"]}>
                                <table>
                                    <thead>
                                       
                                    </thead>
                                    <tbody>
                                        {itens.map((item, index) => (
                                            <tr key={index} onClick={() => handleView(item)}>
                                                <td><img src={getAlertaImage(item.tipoAlerta)} alt={item.tipoAlerta}/></td>
                                                <td>{item.estoqueIngrediente.nome}</td>
                                                <td>{item.tipoAlerta}</td>
                                                <td>{formatDate(item.estoqueIngrediente.dtaAviso)}</td>
                                                <td>
                                                    <img 
                                                        src={fechar} 
                                                        id={styles["imgfechar"]} 
                                                        alt="Fechar"
                                                        onClick={(e) => handleDelete(item.idAlerta, e)} 
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={styles["filtro"]}>
                            <span>Quantidade</span>
                            <div className={styles["filtroCard"]}>
                                <span>Dia de Checagem</span>
                                <div className={styles["infoCard"]}>
                                    <img src={diaChecagem} alt="" />
                                    <span>{quantidades.diaChecagemQtd}</span>
                                </div>
                            </div>
                            <div className={styles["filtroCard"]}>
                                <span>Estoque Vazio</span>
                                <div className={styles["infoCard"]}>
                                    <img src={itemVazio} id={styles["imgCard"]}/>
                                    <span>{quantidades.estoqueVazioQtd}</span>
                                </div>
                            </div>
                            <div className={styles["filtroCard"]}>
                                <span>Data Próxima</span>
                                <div className={styles["infoCard"]}>
                                    <img src={dataProxima} alt="" />
                                    <span>{quantidades.dataProximaQtd}</span>
                                </div>
                            </div>
                            <div className={styles["filtroCard"]}>
                                <span>Estoque Acabando</span>
                                <div className={styles["infoCard"]}>
                                    <img src={ItemAcabando} id={styles["imgCard"]}/>
                                    <span>{quantidades.estoqueAcabandoQtd}</span>
                                </div>
                            </div>
                        </div>

                        {openVizualizar && selectedItem && (
                            <ModalAlertas isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)}>
                                <div className={styles["tituloModal"]}>
                                    <div className={styles["tituloIngrediente"]}>
                                        <span id={styles["titulo"]}>{selectedItem.estoqueIngrediente.nome}</span>
                                        <span>categoria: {selectedItem.estoqueIngrediente.categoria}</span>
                                    </div>
                                    <img src={fechar} onClick={() => setOpenVizualizar(false)} alt="Fechar"/>
                                </div>
                                
                                <div className={styles["corpoModal"]}>
                                    <div className={styles["legendaModal"]}>
                                        <div className={styles["legendasIngred"]}>
                                            <span>Lote:</span>
                                            <span>Data de Checagem:</span>
                                            <span>Quantidade Total:</span>
                                            <span>Tipo de Alerta:</span>
                                            <span>Medida:</span>
                                            <span>Local de armazenamento:</span>
                                            <span>Data de Cadastro:</span>
                                        </div>
                                    </div>
                                    <div className={styles["dadosModal"]}>
                                        <div className={styles["dadosIngred"]}>
                                            <span>{selectedItem.estoqueIngrediente.lote}</span>
                                            <span>{formatDate(selectedItem.estoqueIngrediente.dtaAviso)}</span>
                                            <span>{selectedItem.estoqueIngrediente.valorTotal}</span>
                                            <span>{selectedItem.tipoAlerta}</span>
                                            <span>{selectedItem.estoqueIngrediente.tipoMedida}</span>
                                            <span>{selectedItem.estoqueIngrediente.localArmazenamento}</span>
                                            <span>{formatDate(selectedItem.estoqueIngrediente.dtaCadastro)}</span>
                                        </div>
                                    </div>
                                </div>
                            </ModalAlertas>
                        )}
                    
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alerta;
