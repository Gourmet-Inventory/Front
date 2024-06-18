import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import ModalAlertas from "../../../components/modalAlertas/modalAlertas";
import ModalEstoque from "../../../components/modalEstoque/ModalEstoque";
import api from "../../../api";
import fechar from "../../../utils/assets/Fechar.svg";
import styles from "./Estoque.module.css";

const Estoque = () => {
    const [itens, setItens] = useState([]);
    const [cardsEstoqueData, setCardsEstoqueData] = useState([]);
    const navigate = useNavigate();
    const [openCadastro, setOpenCadastro] = useState(false);
    const [openVisualizar, setOpenVisualizar] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [dataEdit, setDataEdit] = useState({});
    const [idItem, setIdItem] = useState("");
    const [lote, setLote] = useState("");
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipoMedida, setTipoMedida] = useState("");
    const [valorMedida, setValorMedida] = useState("");
    const [unidades, setUnidades] = useState("");
    const [localArmazenamento, setLocalArmazenamento] = useState("");
    const [dtaCadastro, setDtaCadastro] = useState("");
    const [dtaAviso, setDtaAviso] = useState("");

    useEffect(() => {
        recuperarItens();
    }, []);

    const recuperarItens = () => {
        api.get(`/estoque-ingrediente/${localStorage.empresaId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then(response => {
            console.log(response);
            setItens(response.data);
            recuperarValorCard();
        }).catch(() => {
            toast.error("Erro ao buscar estoque!");
        });
    };

    const handleSave = () => {
        if (!lote || !nome || !categoria || !tipoMedida || !valorMedida || !localArmazenamento || !dtaCadastro || !dtaAviso) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        const item = { idItem, lote, nome, categoria, tipoMedida, valorMedida, unidades, localArmazenamento, dtaCadastro, dtaAviso };

        if (dataEdit.idItem) {
            // Editar item existente
            api.put(`/estoque-ingrediente/atualizar-estoque/${dataEdit.idItem}`, item, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Item atualizado com sucesso!");
                console.log(item);
                recuperarItens();
                setOpenCadastro(false);
            }).catch(() => {
                toast.error("Erro ao atualizar o item.");
            });
        } else {
            // Criar novo item
            api.post(`/estoque-ingrediente/${localStorage.empresaId}`, item, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Item cadastrado com sucesso!");
                recuperarItens();
                setOpenCadastro(false);
            }).catch(() => {
                toast.error("Erro ao cadastrar o item.");
            });
        }
    };

    const handleCadastrar = () => {
        setDataEdit({});
        limparCampos();
        setOpenCadastro(true);
    };

    const limparCampos = () => {
        setLote("");
        setNome("");
        setCategoria("");
        setTipoMedida("");
        setValorMedida("");
        setUnidades("");
        setLocalArmazenamento("");
        setDtaCadastro("");
        setDtaAviso("");
    };

    const handleEdit = (item) => {
        setDataEdit(item);
        setIdItem(item.idItem);
        setLote(item.lote);
        setNome(item.nome);
        setCategoria(item.categoria);
        setTipoMedida(item.tipoMedida);
        setValorMedida(item.valorMedida);
        setUnidades(item.unidades);
        setLocalArmazenamento(item.localArmazenamento);
        setDtaCadastro(item.dtaCadastro);
        setDtaAviso(item.dtaAviso);
        setOpenCadastro(true);
    };

    const handleView = (item) => {
        setSelectedData(item);
        setOpenVisualizar(true);
    };

    const handleExcluir = (idItem) => {
        if (window.confirm("Tem certeza de que deseja excluir este item?")) {
            api.delete(`/estoque-ingrediente/deletar-item/${idItem}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                recuperarItens();
                toast.success("Item excluído com sucesso!");
            }).catch(() => {
                toast.error("Erro ao excluir o item.");
            });
        }
    };

    const recuperarValorCard = () => {
        api.get(`/estoque-ingrediente/${localStorage.empresaId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then((response) => {
            const { data } = response;
            if (Array.isArray(data)) {
                setCardsEstoqueData(data);
            } else {
                setCardsEstoqueData([]);
            }
        }).catch(() => {
            toast.error("Erro ao buscar estoque!");
        });
    };

    return (
        <>
            <MenuLateral />
            <div className={styles.cabecalho}>
                <BarraPesquisa tituloPag="Estoque" />
                <ImgConfig />
                <button onClick={handleCadastrar}>Cadastrar Novo Item</button>
            </div>
            <div className={styles.area}>
                <div className={styles.card}>
                    {cardsEstoqueData.map((item) => (
                        <div key={item.idItem} className={styles['main-container']}>
                            <div className={styles['rectangle']}>
                                <span className={styles['molho-de-tomate-2']}>{item.nome}</span>
                                <span className={styles['categoria-molhos']}>Categoria: {item.categoria}</span>
                            </div>
                            <div className={styles['dados']}>
                                <span className={styles['titulo']}>Data de Aviso</span>
                                <span className={styles['aviso']}>{item.dtaAviso}</span>
                                <span className={styles['titulo']}>Quantidade</span>
                                <span className={styles['aviso']}>{item.valorTotal}</span>
                                <button onClick={() => handleView(item)} className={styles['Button']}>Ver Mais</button>
                            </div>
                        </div>
                    ))}
                </div>

                {openCadastro && (
                    <ModalEstoque isOpen={openCadastro} setModalOpen={() => setOpenCadastro(!openCadastro)}>
                        <div className={styles.tituloModal2}>
                            <div className={styles.tituloIngrediente2}>
                                <span id={styles.titulo}>{dataEdit.idItem ? "Editar Item" : "Cadastrar Item"}</span>
                            </div>
                            <img src={fechar} onClick={() => setOpenCadastro(false)} alt="Fechar" />
                        </div>

                        <div className={styles.corpoItem}>
                            <div className={styles.cadastroItens}>
                                <div className={styles.legendaItem}>
                                    <div className={styles.itens}>
                                        <div className={styles.legenda}>
                                            <span>Lote:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Nome:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Categoria:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Tipo Medida:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Valor Medida:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Quantidade Unitária:</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Local Armazenamento:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Data Cadastro:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Data de Aviso:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.dadosItem}>
                                    <div className={styles.dados}>
                                        <input type="text" value={lote} onChange={(e) => setLote(e.target.value)} />
                                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                        <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                                        <select id="tipoMedida" value={tipoMedida} onChange={(e) => setTipoMedida(e.target.value)}>
                                            <option value="">Selecione o tipo de medida</option> 
                                            <option value="GRAMAS">GRAMAS</option>    
                                            <option value="UNIDADE">UNIDADE</option>        
                                        </select>
                                        <input type="text" value={valorMedida} onChange={(e) => setValorMedida(e.target.value)} />
                                        <input type="text" value={unidades} onChange={(e) => setUnidades(e.target.value)} placeholder="Opcional (cadastro de mais de um item)" />
                                        <input type="text" value={localArmazenamento} onChange={(e) => setLocalArmazenamento(e.target.value)} />
                                        <input type="date" value={dtaCadastro} onChange={(e) => setDtaCadastro(e.target.value)} />
                                        <input type="date" value={dtaAviso} onChange={(e) => setDtaAviso(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.botaoItem}>
                                <button onClick={handleSave}>Salvar</button>
                            </div>
                        </div>
                    </ModalEstoque>
                )}

                {openVisualizar && selectedData && (
                    <ModalAlertas isOpen={openVisualizar} setModalOpen={() => setOpenVisualizar(!openVisualizar)}>
                        <div className={styles.tituloModal}>
                            <div className={styles.tituloIngrediente}>
                                <span id={styles.titulo}>{selectedData.nome}</span>
                                <span>Categoria: {selectedData.categoria}</span>

                            </div>
                            <img src={fechar} onClick={() => setOpenVisualizar(false)} alt="Fechar" />
                        </div>

                        <div className={styles.corpoModal}>
                            <div className={styles.legendaModal}>
                                <div className={styles.legendasIngred}>
                                    <span>Lote:</span>
                                    <span>Tipo Medida:</span>
                                    <span>Quantidade Unitária:</span>
                                    <span>Valor Medida:</span>
                                    <span>Local Armazenamento:</span>
                                    <span>Data Cadastro:</span>
                                    <span>Data Aviso:</span>
                                </div>
                            </div>
                            <div className={styles.dadosModal}>
                                <div className={styles.dadosIngred}>
                                    <span>{selectedData.lote}</span>
                                    <span>{selectedData.tipoMedida}</span>
                                    <span>{selectedData.unidades}</span>
                                    <span>{selectedData.valorMedida}</span>
                                    <span>{selectedData.localArmazenamento}</span>
                                    <span>{selectedData.dtaCadastro}</span>
                                    <span>{selectedData.dtaAviso}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.botoesModal}>
                            <button id={styles.editar} onClick={() => handleEdit(selectedData)}>Editar</button>
                            <button id={styles.excluir} onClick={() => handleExcluir(selectedData.idItem)}>Excluir</button>
                        </div>
                    </ModalAlertas>
                )}
            </div>
        </>
    );
};

export default Estoque;
