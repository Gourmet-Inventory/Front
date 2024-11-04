import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../../api';
import styles from "./EstoqueCadastroManipulado.module.css";
import SelectIngredientes from "../../../components/selectIngrediente/SelectIngrediente";
import CardIngrediente from "../../../components/cardIngrediente/CardIngrediente";

function CadastrarEstoqueReceitaManipulado() {
    const [nome, setNome] = useState("");
    const [lote, setLote] = useState("");
    const [manipulado, setManipulado] = useState(true);
    const [marca, setMarca] = useState("");
    const [categoria, setCategoria] = useState("FRUTAS_FRESCAS");
    const [tipoMedida, setTipoMedida] = useState("GRAMAS");
    const [unitario, setUnitario] = useState(null);
    const [valorMedida, setValorMedida] = useState("");
    const [valorTotal, setValorTotal] = useState(null);
    const [localArmazenamento, setLocalArmazenamento] = useState("");
    const [dtaCadastro, setDtaCadastro] = useState(new Date().toISOString().slice(0, 10));
    const [dtaAviso, setDtaAviso] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ingredientes, setIngredientes] = useState([]);
    const [idItem, setIdItem] = useState("");
    const [estoqueNome, setEstoqueNome] = useState("");
    const [valorIngrediente, setValorIngrediente] = useState("");
    const [tipoMedidaIngrediente, setTipoMedidaIngrediente] = useState("GRAMAS");

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.estoqueIngrediente) {
            const estoque = location.state.estoqueIngrediente;
            setNome(estoque.nome);
            setLote(estoque.lote);
            setManipulado(estoque.manipulado);
            setMarca(estoque.marca);
            setCategoria(estoque.categoria);
            setTipoMedida(estoque.tipoMedida);
            setUnitario(estoque.unitario);
            setValorMedida(estoque.valorMedida);
            setValorTotal(estoque.valorTotal);
            setLocalArmazenamento(estoque.localArmazenamento);
            setDtaCadastro(estoque.dtaCadastro);
            setDtaAviso(estoque.dtaAviso);
            setDescricao(estoque.descricao);
            setIngredientes(estoque.ingredientes || []);
        }
    }, [location.state]);

    const handleSave = async () => {
        if (!nome || !lote || !valorMedida) {
            return toast.error("Preencha todos os campos obrigatórios!");
        }

        const estoqueIngredienteCriacaoDto = {
            nome,
            lote,
            manipulado,
            marca,
            categoria,
            tipoMedida,
            unitario,
            valorMedida: parseFloat(valorMedida),
            valorTotal: valorTotal ? parseFloat(valorTotal) : null,
            localArmazenamento,
            dtaCadastro,
            dtaAviso,
            descricao
        };

        const receitaCriacaoDto = {
            idItem,
            receita: ingredientes.map(ingrediente => ({
                idItem: ingrediente.idItem,
                nome: ingrediente.nome,
                valorMedida: ingrediente.valorMedida,
                tipoMedida: ingrediente.tipoMedida
            }))
        };

        const estoqueReceitaManipuladoCriacao = {
            estoqueIngredienteCriacaoDto,
            receitaCriacaoDto
        };

        try {
        await api.post(`/estoque-receita-manipulado/${localStorage.idEmpresa}`, estoqueReceitaManipuladoCriacao, {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success("Estoque e Receita cadastrados com sucesso!");
            navigate("/gourmet-inventory/estoque");
        } catch (error) {
            toast.error("Erro ao cadastrar estoque e receita.");
        }
    };

    const handleAddIngrediente = () => {
        if (!idItem || !valorIngrediente || !tipoMedidaIngrediente) {
            return toast.error("Preencha todos os campos do ingrediente!");
        }
        const novoIngrediente = {
            idItem,
            nome: estoqueNome,
            valorMedida: valorIngrediente,
            tipoMedida: tipoMedidaIngrediente
        };
        setIngredientes(prevIngredientes => [...prevIngredientes, novoIngrediente]);
        setIdItem("");
        setEstoqueNome("");
        setValorIngrediente("");
        setTipoMedidaIngrediente("GRAMAS");
    };

    const handleSelectIngrediente = (ingrediente) => {
        setIdItem(ingrediente.idItem);
        setEstoqueNome(ingrediente.nome);
    };

    const handleRemoveIngrediente = (idToRemove) => {
        setIngredientes(ingredientes.filter(ingrediente => ingrediente.idItem !== idToRemove));
    };

    const handleBack = () => {
        navigate("/gourmet-inventory/estoque");
    };

    return (
        <div className={styles["body"]}>
            <div className={styles["cabecalho"]}>
                <button onClick={handleBack}>Voltar</button>
                <div className={styles["titulo"]}>
                        <h1>{idItem ? "Editar Estoque Manipulado" : "Cadastrar Estoque Manipulado"}</h1>
                    </div>
            </div>
            <div className={styles["corpo"]}>
                <div className={styles["form"]}>
                    <div className={styles["infoCadastro"]}>
                        <h1>Dados do Estoque</h1>
                        <div className={styles["dadosCadastro"]}>
                            <label>Nome:</label>
                            <div className={styles["input"]}>
                            <input  type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            <label>Lote:</label>
                            <div className={styles["input"]}>
                            <input type="text" value={lote} onChange={(e) => setLote(e.target.value)} />
                            </div>
                            <label>Marca:</label>
                            <div className={styles["input"]}>
                            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
                            </div>
                            <label>Categoria:</label>
                            <div className={styles["selected"]}>
                            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
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
                            </div>
                            <label>Tipo de Medida:</label>
                            <div className={styles["selected"]}>
                            <select value={tipoMedida} onChange={(e) => setTipoMedida(e.target.value)}>
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
                            </div>
                            <label>Quantidade Unitária:</label>
                            <div className={styles["input"]}>
                            <input type="number" value={unitario} onChange={(e) => setUnitario(e.target.value)} />
                            </div>
                            <label>Valor da Medida:</label>
                            <div className={styles["input"]}>
                            <input type="number" value={valorMedida} onChange={(e) => setValorMedida(e.target.value)} />
                            </div>
                            <label>Local de Armazenamento:</label>
                            <div className={styles["input"]}>
                            <input type="text" value={localArmazenamento} onChange={(e) => setLocalArmazenamento(e.target.value)} />
                            </div>
                            <div className={styles.datas}>
                                        <span className={styles.data}>
                                            <span>Data Cadastro:<span id={styles.obrigatorio}>*</span></span>
                                            <input type="date" value={dtaCadastro} onChange={(e) => setDtaCadastro(e.target.value)}/>
                                        </span>
                                        <span className={styles.data}>
                                            <span>Data de Aviso:<span id={styles.obrigatorio}>*</span></span>
                                            <input type="date" value={dtaAviso} onChange={(e) => setDtaAviso(e.target.value)} />
                                        </span>
                            </div>
                            <label>Descrição:</label>
                            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className={styles["medidas"]}>
                    <h1>Ingredientes da Receita</h1>
                    <div className={styles["input1"]} id={styles["ingredienteMedida"]}>
                    <span> Ingrediente:</span>
                    <SelectIngredientes onSelect={handleSelectIngrediente} />
                    </div>
                    <div className={styles["formMedidas"]}>
                        <div className={styles["input1"]}>
                        <span>Valor Medida:</span>
                        <input type="number" value={valorIngrediente} onChange={(e) => setValorIngrediente(e.target.value)} placeholder="Valor Medida" />
                    </div>
                    <div className={styles["input1"]}>
                        <span>Tipo medida:</span>
                    <select value={tipoMedidaIngrediente} onChange={(e) => setTipoMedidaIngrediente(e.target.value)}>
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
                    </div>
                    <button onClick={handleAddIngrediente}>Adicionar Ingrediente</button>
                    </div>
                    <div className={styles.ingredientes}>
                    {ingredientes.map((ing, index) => (
                        <CardIngrediente
                            key={index}
                            idItem={ing.idItem}
                            nome={ing.nome}
                            valorMedida={ing.valorMedida}
                            tipoMedida={ing.tipoMedida}
                            onRemove={handleRemoveIngrediente}
                        />
                    ))}
                    </div>
                    <button id={styles["botao-cadastrar-pratos"]} onClick={handleSave}>{idItem ? "Atualizar" : "Cadastrar"}</button>
                </div>
            </div>
        </div>
    );
}

export default CadastrarEstoqueReceitaManipulado;