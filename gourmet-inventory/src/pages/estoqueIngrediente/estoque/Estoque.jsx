import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import ModalAlertas from "../../../components/modais/modalAlertas/modalAlertas";
import ModalEstoque from "../../../components/modais/modalEstoque/ModalEstoque";
import api from "../../../api";
import fechar from "../../../utils/assets/Fechar.svg";
import styles from "./Estoque.module.css";

const Estoque = () => {
    const [itens, setItens] = useState([]);
    const [cardsEstoqueData, setCardsEstoqueData] = useState([]);
    const [openCadastro, setOpenCadastro] = useState(false);
    const [openVisualizar, setOpenVisualizar] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [dataEdit, setDataEdit] = useState({});
    const [idItem, setIdItem] = useState("");
    const [manipulado, setManipulado] = useState(false);
    const [lote, setLote] = useState("");
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [categoria, setCategoria] = useState("VEGETAIS_FRESCOS");
    const [tipoMedida, setTipoMedida] = useState("COLHER_DE_SOPA");
    const [valorMedida, setValorMedida] = useState("");
    const [valorTotal, setValorTotal] = useState("");
    const [unitario, setUnitario] = useState("");
    const [localArmazenamento, setLocalArmazenamento] = useState("");
    const [dtaCadastro, setDtaCadastro] = useState("");
    const [dtaAviso, setDtaAviso] = useState("");
    const [openTipoModal, setOpenTipoModal] = useState(false);
    const [tipoProduto, setTipoProduto] = useState("");

    const navigate = useNavigate();

    const handleTipoSelecionado = (tipo) => {
        setTipoProduto(tipo);
        setOpenTipoModal(false);
        if (tipo === "Manipulado") {
            navigate("/gourmet-inventory/cadastrar-manipulados");
        } else {
            setOpenCadastro(true);
        }
    };

    useEffect(() => {
        recuperarItens();
    }, []);

    const recuperarItens = () => {
        api.get(`/estoque-ingrediente/${localStorage.idEmpresa}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then(response => {
            console.log(response);
            setItens(response.data);
            recuperarValorCard();
        }).catch(() => {

        });
    };

    const handleSave = () => {
        console.log("Empresa ID:", localStorage.idEmpresa); // Adicione esta linha
        if (!lote || !nome || !tipoMedida || !categoria || !localArmazenamento || !valorMedida || !dtaCadastro || !dtaAviso) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        const item = { idItem, manipulado, lote, nome, categoria, marca, tipoMedida, valorMedida, valorTotal, unitario, localArmazenamento, dtaCadastro, dtaAviso };

        if (dataEdit.idItem) {
            api.put(`/estoque-ingrediente/${dataEdit.idItem}`, item, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Item atualizado com sucesso!");
                recuperarItens();
                setOpenCadastro(false);
            }).catch(() => {
                toast.error("Erro ao atualizar o item.");
            });
        } else {
            // Aqui
            console.log("Conteúdo do localStorage:");
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                console.log(`${key}: ${value}`);
            }
            console.log(`Enviando para a URL: /estoque-ingrediente/${localStorage.empresaId}`);
            api.post(`/estoque-ingrediente/${localStorage.idEmpresa}`, item, {
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
        setOpenTipoModal(true);
        setDataEdit({});
        limparCampos();
    };

    const limparCampos = () => {
        setLote("");
        setNome("");
        setCategoria("");
        setTipoMedida("");
        setValorMedida("");
        setUnitario("");
        setMarca("");
        setLocalArmazenamento("");
        setDtaCadastro("");
        setDtaAviso("");
    };

    const handleEdit = (item) => {
        setDataEdit(item);
        setIdItem(item.idItem);
        setLote(item.lote);
        setNome(item.nome);
        setMarca(item.marca);
        setCategoria(item.categoria);
        setTipoMedida(item.tipoMedida);
        setValorMedida(item.valorMedida);
        setValorTotal(item.valorTotal);
        setUnitario(item.unitario);
        setLocalArmazenamento(item.localArmazenamento);
        setDtaCadastro(item.dtaCadastro);
        setDtaAviso(item.dtaAviso);
        setOpenCadastro(true);
        setOpenVisualizar(false);
    };

    const handleView = (item) => {
        setSelectedData(item);
        setOpenVisualizar(true);
    };

    const handleExcluir = (idItem) => {
        if (window.confirm("Tem certeza de que deseja excluir este item?")) {
            api.delete(`/estoque-ingrediente/${idItem}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                recuperarItens();
                setOpenVisualizar(false);
                toast.success("Item excluído com sucesso!");
            }).catch(() => {
                toast.error("Erro ao excluir o item.");
            });
        }
    };

    const recuperarValorCard = () => {
        api.get(`/estoque-ingrediente/${localStorage.idEmpresa}`, {
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
        <div className={styles["body"]}>
            <MenuLateral />
            <div className={styles.cabecalho}>
                <BarraPesquisa tituloPag="Estoque" />
                <ImgConfig />
                <button className={styles.botaoCadastro} onClick={handleCadastrar}>Cadastrar Novo Item</button>
            </div>
            <div className={styles.area}>
                {openTipoModal && (
                    <div className={styles.modalTipoProduto}>
                        <div className={styles.tituloModal3}>
                            <span>Escolha o Tipo de Produto</span>
                            <img src={fechar} onClick={() => setOpenTipoModal(false)} alt="Fechar" />
                        </div>
                        <div className={styles.opcoes}>
                            <button onClick={() => handleTipoSelecionado("Manipulado")}>Manipulado</button>
                            <button onClick={() => handleTipoSelecionado("Industrializado")}>Industrializado</button>
                        </div>
                    </div>
                )}
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
                                <span className={styles['aviso']}>{item.valorTotal} - {item.tipoMedida}</span>
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
                                            <span>Nome:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Lote:</span>
                                            <span id={styles.obrigatorio}>*</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Marca:</span>
                                        </div>
                                        <div className={styles.legenda}>
                                            <span>Categoria:</span>
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
                                        {dataEdit.idItem && (
                                            <div className={styles.legenda}>
                                                <span>Valor Total:</span>
                                            </div>
                                        )}
                                        <div className={styles.legenda}>
                                            <span>Local Armazenamento:</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.dadosItem}>
                                    <div className={styles.dados}>
                                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Farinha" />
                                        <input type="text" value={lote} onChange={(e) => setLote(e.target.value)} placeholder="Lote 1" />
                                        <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Marca Genérica" />
                                        <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                                            <option value="VEGETAIS_FRESCOS">Vegetais Frescos</option>
                                            <option value="FRUTAS_FRESCAS">Frutas Frescas</option>
                                            <option value="LEGUMES">Legumes</option>
                                            <option value="CARNES_VERMELHAS">Carnes Vermelhas</option>
                                            <option value="AVES">Aves</option>
                                            <option value="PEIXES_E_FRUTOS_DO_MAR">Peixes e Frutos do Mar</option>
                                            <option value="GRAOS_E_CEREAIS">Grãos e Cereais</option>
                                            <option value="LATICINIOS_E_DERIVADOS">Laticínios e Derivados</option>
                                            <option value="OVOS">Ovos</option>
                                            <option value="OLEAGINOSAS">Oleaginosas (Nozes, Castanhas, Amêndoas)</option>
                                            <option value="LEGUMINOSAS_SECAS">Leguminosas Secas</option>
                                            <option value="ERVAS_FRESCAS">Ervas Frescas</option>
                                            <option value="ESPECIARIAS_SECAS">Especiarias Secas</option>
                                            <option value="OLEOS_E_GORDURAS">Óleos e Gorduras</option>
                                            <option value="MASSAS">Massas</option>
                                            <option value="ENLATADOS_E_CONSERVAS">Enlatados e Conservas</option>
                                            <option value="BEBIDAS">Bebidas</option>
                                            <option value="RAIZES_E_TUBERCULOS">Raízes e Tubérculos</option>
                                            <option value="CONGELADOS">Congelados</option>
                                            <option value="DOCES_E_SOBREMESAS">Doces e Sobremesas</option>
                                            <option value="MOLHOS_E_CONDIMENTOS">Molhos e Condimentos</option>
                                            <option value="PRODUTOS_INDUSTRIALIZADOS">Produtos Industrializados</option>
                                            <option value="FARINHAS_E_AMIDOS">Farinhas e Amidos</option>
                                            <option value="PAES_E_BOLOS">Pães e Bolos</option>
                                            <option value="QUEIJOS_E_FRIOS">Queijos e Frios</option>
                                            <option value="ACUCARES_E_ADOCANTES">Açúcares e Adoçantes</option>
                                            <option value="SUPLEMENTOS_E_INGREDIENTES_ESPECIAIS">Suplementos e Ingredientes Especiais</option>
                                            <option value="PRODUTOS_DE_PADARIA_E_CONFEITARIA">Produtos de Padaria e Confeitaria</option>
                                            <option value="FERMENTOS_E_LEVEDURAS">Fermentos e Leveduras</option>
                                            <option value="INGREDIENTES_PARA_BEBIDAS">Ingredientes para Bebidas</option>
                                            <option value="OUTROS">Outros</option>
                                        </select>
                                        <select id="tipoMedida" value={tipoMedida} onChange={(e) => setTipoMedida(e.target.value)}>
                                            <option value="COLHER_DE_SOPA">Colher de Sopa</option>
                                            <option value="COLHER_DE_CHA">Colher de Chá</option>
                                            <option value="XICARA">Xícara</option>
                                            <option value="GRAMAS">Gramas</option>
                                            <option value="QUILOGRAMA">Quilograma</option>
                                            <option value="MILILITROS">Mililitros</option>
                                            <option value="LITRO">Litro</option>
                                            <option value="A_GOSTO">A Gosto</option>
                                            <option value="PITADA">Pitada</option>
                                            <option value="UNIDADE">Unidade</option>
                                        </select>
                                        <input type="text" value={valorMedida} onChange={(e) => setValorMedida(e.target.value)} placeholder="10" />
                                        <input type="text" value={unitario} onChange={(e) => setUnitario(e.target.value)} placeholder="Opcional (cadastro de mais de um item)" />
                                        {dataEdit.idItem && (
                                            <input
                                                type="text"
                                                value={valorTotal}
                                                onChange={(e) => setValorTotal(e.target.value)}
                                                placeholder="0.00"
                                            />
                                        )}
                                        <input type="text" value={localArmazenamento} onChange={(e) => setLocalArmazenamento(e.target.value)} placeholder="Geladeira" />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.datas}>
                                <span className={styles.data}>
                                    <span>Data Cadastro:<span id={styles.obrigatorio}>*</span></span>
                                    <input type="date" value={dtaCadastro} onChange={(e) => setDtaCadastro(e.target.value)} />
                                </span>
                                <span className={styles.data}>
                                    <span>Data de Aviso:<span id={styles.obrigatorio}>*</span></span>
                                    <input type="date" value={dtaAviso} onChange={(e) => setDtaAviso(e.target.value)} />
                                </span>
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
                                    <span>Marca:</span>
                                    <span>Tipo Medida:</span>
                                    <span>Quantidade Unitária:</span>
                                    <span>Valor Medida:</span>
                                    <span>Valor Total:</span>
                                    <span>Local Armazenamento:</span>
                                    <span>Data Cadastro:</span>
                                    <span>Data Aviso:</span>
                                </div>
                            </div>
                            <div className={styles.dadosModal}>
                                <div className={styles.dadosIngred}>
                                    <span>{selectedData.lote}</span>
                                    <span>{selectedData.marca}</span>
                                    <span>{selectedData.tipoMedida}</span>
                                    <span>{selectedData.unitario}</span>
                                    <span>{selectedData.valorMedida}</span>
                                    <span>{selectedData.valorTotal}</span>
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
        </div>
    );
};

export default Estoque;
