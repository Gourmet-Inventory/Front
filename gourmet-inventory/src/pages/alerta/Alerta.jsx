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
    const [previousItens, setPreviousItens] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchAlertas = () => {
            api.get(`/alerta/${localStorage.empresaId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setItens(response.data);
                    if (!areArraysEqual(response.data, previousItens)) {
                        toast.success("Alertas carregados com sucesso!");
                        setPreviousItens(response.data);
                } else {
                    console.error('A resposta da API não é um array:', response.data);
                    setItens([]);
                    toast.error("Erro ao carregar alertas.");
                }
            })
            .catch(error => {
                console.error('Erro ao buscar alertas:', error);
                setItens([]);
                toast.error("Erro ao buscar alertas.");
            });
        };

        fetchAlertas();
        const intervalId = setInterval(fetchAlertas, 10000);

        return () => clearInterval(intervalId);
    }, [previousItens]);

    const areArraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((item, index) => {
            return (
                item.idAlerta === arr2[index].idAlerta &&
                item.nomeIngrediente === arr2[index].nomeIngrediente &&
                item.tipoAlerta === arr2[index].tipoAlerta &&
                item.data === arr2[index].data
            );
        });
    };

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

    return (
        <>  
            <MenuLateral/>
            <div className={styles.body}>
                <div className={styles.cabecalho}>
                    <BarraPesquisa tituloPag={"Históricos Alertas"}/>
                </div>
                <ImgConfig/>

                <div className={styles.form}>
                    <div className={styles.tabelaForm}>
                        <div className={styles["tabelaAlertas"]}>
                            <div className={styles.tituloForm}>
                                <span>Item</span>
                                <span>Tipo de Alerta</span>
                                <span>Info</span>
                                <span>Ação</span>
                            </div>
                            <div className={styles["tabela"]}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Imagem</th>
                                            <th>Item</th>
                                            <th>Tipo de Alerta</th>
                                            <th>Info</th>
                                            <th>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itens.map((item, index) => (
                                            <tr key={index} onClick={() => handleView(item)}>
                                                <td><img src={diaChecagem} alt="Dia de Checagem"/></td>
                                                <td>{item.nomeIngrediente}</td>
                                                <td>{item.tipoAlerta}</td>
                                                <td>{item.data}</td>
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

                        {openVizualizar && selectedItem && (
                            <ModalAlertas isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)}>
                                {/* tipo modal 1 */}
                                <div className={styles["tituloModal"]}>
                                    <div className={styles["tituloIngrediente"]}>
                                        <span id={styles["titulo"]}>{selectedItem.nomeIngrediente}</span>
                                        <span>categoria: {selectedItem.categoria}</span>
                                    </div>
                                    <img src={fechar} onClick={() => setOpenVizualizar(false)} alt="Fechar"/>
                                </div>
                                
                                <div className={styles["corpoModal"]}>
                                    <div className={styles["legendaModal"]}>
                                        <div className={styles["legendasIngred"]}>
                                            <span>Lote:</span>
                                            <span>Data de Checagem:</span>
                                            <span>Quantidade Total</span>
                                            <span>Quantidade / Peso unitário:</span>
                                            <span>Medida:</span>
                                            <span>Local de armazenamento:</span>
                                            <span>Dados nutricionais:</span>
                                        </div>
                                    </div>
                                    <div className={styles["dadosModal"]}>
                                        <div className={styles["dadosIngred"]}>
                                            <span>{selectedItem.lote}</span>
                                            <span>{selectedItem.dataChecagem}</span>
                                            <span>{selectedItem.quantidadeTotal}</span>
                                            <span>{selectedItem.quantidadePesoUnitario}</span>
                                            <span>{selectedItem.medida}</span>
                                            <span>{selectedItem.localArmazenamento}</span>
                                            <span>{selectedItem.dadosNutricionais}</span>
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
