    import React, { useState, useEffect } from "react";
    import { useNavigate, useLocation } from "react-router-dom";
    import { toast } from 'react-toastify';
    import api from '../../../api';
    import styles from "./CadastrarPratos.module.css";
    import imgUpload from "../../../utils/assets/Group 191.svg";
    import AlergicoSelector from "../../../components/alergicoSelector/AlergicoSelector";
    import CardIngrediente from "../../../components/cardIngrediente/CardIngrediente";
    import imgDeletar from "../../../utils/assets/Fechar.svg";
    import SelectIngredientes from "../../../components/selectIngrediente/SelectIngrediente";

    function CadastrarPratos() {
        const [nome, setNome] = useState("");
        const [descricao, setDescricao] = useState("");
        const [preco, setPreco] = useState("");
        const [categoria, setCategoria] = useState("");
        const [alergicosRestricoes, setAlergicosRestricoes] = useState([]);
        const [receitaPrato, setReceitaPrato] = useState([]);
        const [idItem, setIdItem] = useState("");
        const [estoqueNome, setEstoqueNome] = useState("");
        const [valorMedida, setValorMedida] = useState("");
        const [tipoMedida, setTipoMedida] = useState("GRAMAS");
        const [dataEdit, setDataEdit] = useState({});
        const [imagem, setImagem] = useState(null); 
        const [isBebida, setIsBebida] = useState(false);

        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
            if (location.state && location.state.prato) {
                const prato = location.state.prato;
                setDataEdit(prato);
                setNome(prato.nome);
                setDescricao(prato.descricao);
                setPreco(prato.preco);
                setCategoria(prato.categoria);
                setAlergicosRestricoes(prato.alergicosRestricoes);
                setIsBebida(prato.isBebida)
                setReceitaPrato(prato.receitaPrato.map(ingrediente => ({
                    idItem: ingrediente.idItem || ingrediente.estoqueIngrediente.idItem,
                    nome: ingrediente.nome || ingrediente.estoqueIngrediente.nome,
                    valorMedida: ingrediente.valorMedida,
                    tipoMedida: ingrediente.tipoMedida,
                })));
            }
        }, [location.state]);

        const handleExcluir = (id) => {
            if (window.confirm("Tem certeza de que deseja excluir este prato?")) {
                api.delete(`/pratos/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.token}` }
                }).then(() => {
                    toast.success("Prato excluído com sucesso!");
                }).catch(() => {
                    toast.error("Erro ao excluir o prato.");
                });
            }
        };

        const handleSave = async () => {
            if (!nome || !preco || !categoria) {
                return toast.error("Todos os campos são obrigatórios!");
            }
        
            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("descricao", descricao);
            formData.append("preco", preco);
            formData.append("categoria", categoria);
            formData.append("isBebida", isBebida);
            formData.append("alergicosRestricoes", JSON.stringify(alergicosRestricoes));
            formData.append("receita", JSON.stringify(
                receitaPrato.map(ingrediente => ({
                    idItem: ingrediente.idItem,
                    tipoMedida: ingrediente.tipoMedida,
                    valorMedida: ingrediente.valorMedida,
                }))
            ));
            
            if (imagem) {
                formData.append("imagem", imagem);
            }
        
            try {
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                if (dataEdit.idPrato) {
                    await api.put(`/pratos/${dataEdit.idPrato}`, formData, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.token}`,
                        }
                    });
                    toast.success("Prato atualizado com sucesso!");
                } else {
                    await api.post(`/pratos/${localStorage.idEmpresa}`, formData, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.token}`,
                        }
                    });
                    toast.success("Prato cadastrado com sucesso!");
                }
                handleBack();
            } catch (error) {
                toast.error("Erro ao salvar o prato.");
                console.log(formData);
            }
        };

        const handleAddIngrediente = () => {
            if (!idItem || !valorMedida || !tipoMedida) {
                return toast.error("Todos os campos de ingredientes são obrigatórios!");
            }
            const novoIngrediente = {
                idItem: idItem,
                nome: estoqueNome,
                valorMedida: valorMedida,
                tipoMedida: tipoMedida
            };
            setReceitaPrato(prevIngredientes => [...prevIngredientes, novoIngrediente]);
            setIdItem("");
            setValorMedida("");
            setTipoMedida("GRAMAS");
        };

        const handleSelectIngrediente = (ingrediente) => {
            setIdItem(ingrediente.idItem);
            setEstoqueNome(ingrediente.nome);
        };

        const handleRemoveIngrediente = (idItemToRemove) => {
            const novaReceita = receitaPrato.filter(ingrediente => ingrediente.idItem !== idItemToRemove);
            setReceitaPrato(novaReceita);
        };

        const handleBack = () => {
            navigate("/gourmet-inventory/pratos");
        };

        const handleImagemChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setImagem(file);
            }
        };

        return (
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <button onClick={handleBack}>Voltar</button>
                    <div className={styles["titulo"]}>
                        <h1>{dataEdit.idPrato ? "Editar Prato" : "Cadastrar Prato"}</h1>
                    </div>
                </div>
                <div className={styles["corpo"]}>
                    <div className={styles["form"]}>
                        <div className={styles["formCadastro"]}>
                            <div className={styles["infoCadastro"]}>
                                <h1>Dados do prato</h1>
                                <div className={styles["dadosCadastro"]}>
                                <div className={styles["inputImagem"]}>
                                        <span>Imagem do Prato:</span>
                                        <input type="file" onChange={handleImagemChange} />
                                    </div>
                                    <span>Nome:</span>
                                    <div className={styles["input"]}>
                                        <input type="text" value={nome} placeholder="Nome do Prato" onChange={(e) => setNome(e.target.value)} />
                                    </div>
                                    <span>Preço:</span>
                                    <div className={styles["input"]}>
                                        <input value={preco} placeholder="20.00" onChange={(e) => setPreco(e.target.value)} />
                                    </div>
                                    <span>Categoria:</span>
                                    <div className={styles["input"]}>
                                        <input type="text" value={categoria} placeholder="Crie suas próprias categorias!" onChange={(e) => setCategoria(e.target.value)} />
                                    </div>
                                    <span>Alérgicos:</span>
                                    <div className={styles["selected"]}>
                                        <AlergicoSelector selected={alergicosRestricoes} onSelect={setAlergicosRestricoes} />
                                    </div>
                                    <div className={styles["inputDescricao"]}>
                                        <span>Descrição:</span>
                                        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                    </div>
                                     
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["medidas"]}>
                        <h1>Ingredientes</h1>
                        <div className={styles["input1"]} id={styles["ingredienteMedida"]}>
                            <span>Ingrediente:</span>
                            <SelectIngredientes onSelect={handleSelectIngrediente} />
                        </div>
                        <div className={styles["formMedidas"]}>
                            <div className={styles["input1"]}>
                                <span>Valor Medida:</span>
                                <input type="number" value={valorMedida} onChange={(e) => setValorMedida(e.target.value)} />
                            </div>
                            <div className={styles["input1"]}>
                                <span>Tipo Medida:</span>
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
                            <button onClick={handleAddIngrediente}>Adicionar Ingrediente</button>
                        </div>
                        <div className={styles.ingredientes}>
                            {receitaPrato.map((ing, index) => (
                                <CardIngrediente
                                    key={index}
                                    id={ing.idItem}
                                    ingrediente={ing.nome}
                                    valor={ing.valorMedida}
                                    medida={ing.tipoMedida}
                                    onDelete={() => handleRemoveIngrediente(ing.idItem)}
                                    imgDeletar={imgDeletar}
                                />
                            ))}
                        </div>
                        <button id={styles["botao-cadastrar-pratos"]} onClick={handleSave}>
                            {dataEdit.idPrato ? "Atualizar" : "Cadastrar"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    export default CadastrarPratos;
