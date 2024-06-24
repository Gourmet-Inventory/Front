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
    const [alergicos, setAlergicos] = useState([]);
    const [receitaPrato, setReceitaPrato] = useState([]);
    const [idItem, setIdItem] = useState("");
    const [valorMedida, setValorMedida] = useState("");
    const [tipoMedida, setTipoMedida] = useState("GRAMAS");
    const [dataEdit, setDataEdit] = useState({});

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
            setAlergicos(prato.alergicos);
            setReceitaPrato(prato.receitaPrato.map(ingrediente => ({
                idItem: ingrediente.idItem || ingrediente.estoqueIngrediente.idItem,
                valorMedida: ingrediente.valorMedida,
                tipoMedida: ingrediente.tipoMedida,
            })))
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

    const handleSave = () => {
        if (!nome || !preco || !categoria) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        const prato = {
            nome,
            descricao,
            preco,
            categoria,
            alergicos,
            receitaPrato: receitaPrato.map(ingrediente => ({
                idItem: ingrediente.idItem,
                tipoMedida: ingrediente.tipoMedida,
                valorMedida: ingrediente.valorMedida,
            }))
        };

        if (dataEdit.idPrato) {
            api.put(`/pratos/${dataEdit.idPrato}`, prato, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Prato atualizado com sucesso!");
                handleBack();
            }).catch(() => {
                toast.error("Erro ao atualizar o prato.");
            });
        } else {
            api.post(`/pratos/${localStorage.empresaId}`, prato, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Prato cadastrado com sucesso!");
                handleBack();
            }).catch(() => {
                toast.error("Erro ao cadastrar o prato.");
            });
        }
    };

    const handleAddIngrediente = () => {
        if (!idItem || !valorMedida || !tipoMedida) {
            return toast.error("Todos os campos de ingredientes são obrigatórios!");
        }
        const novoIngrediente = {
            idItem: idItem,
            valorMedida: valorMedida,
            tipoMedida: tipoMedida
        };
        setReceitaPrato(prevIngredientes => [...prevIngredientes, novoIngrediente]);
        setIdItem("");
        setValorMedida("");
        setTipoMedida("GRAMAS"); // Reinicializa o tipo de medida para Gramas
    };

    const handleSelectIngrediente = (ingrediente) => {
        setIdItem(ingrediente.idItem);
    };

    const handleRemoveIngrediente = (idItemToRemove) => {
        const novaReceita = receitaPrato.filter(ingrediente => ingrediente.idItem !== idItemToRemove);
        setReceitaPrato(novaReceita);
    };

    const handleBack = () => {
        navigate("/gourmet-inventory/pratos");
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
                            <div className={styles["dadosCadastro"]}>
                                <span>Nome:</span>
                                <div className={styles["input"]}>
                                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </div>
                                <span>Preço:</span>
                                <div className={styles["input"]}>
                                    <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
                                </div>
                                <span>Categoria:</span>
                                <div className={styles["input"]}>
                                    <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                                </div>
                                <span>Alérgicos:</span>
                                <div className={styles["selected"]}>
                                    <AlergicoSelector selected={alergicos} onSelect={setAlergicos} />
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
                            <input type="text" value={valorMedida} onChange={(e) => setValorMedida(e.target.value)} />
                        </div>
                        <div className={styles["input1"]}>
                            <span>Tipo Medida:</span>
                            <select value={tipoMedida} onChange={(e) => setTipoMedida(e.target.value)}>
                                <option value="GRAMAS">Gramas (gr)</option>
                                <option value="UNIDADE">Unidade</option>
                            </select>
                        </div>
                        <button onClick={handleAddIngrediente}>Adicionar Ingrediente</button>
                    </div>
                    <div className={styles["ingredientes"]}>
                        {receitaPrato.map((ing, index) => (
                            <CardIngrediente
                                key={index}
                                valor={ing.valorMedida}
                                medida={ing.tipoMedida}
                                ingrediente={ing.idItem }
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
