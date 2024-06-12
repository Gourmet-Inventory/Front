import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../../api';
import styles from "./CadastrarPratos.module.css";
import imgUpload from "../../../utils/assets/Group 191.svg";
import AlergicoSelector from "../../../components/alergicoSelector/AlergicoSelector";
import CardIngrediente from "../../../components/cardIngrediente/CardIngrediente";
import imgDeletar from "../../../utils/assets/Fechar.svg";

function CadastrarPratos() {
    const [pratos, setPratos] = useState([]);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [categoria, setCategoria] = useState("");
    const [alergicos, setAlergicos] = useState([]);
    const [ingrediente, setIngrediente] = useState("");
    const [valorMedida, setValorMedida] = useState("");
    const [tipoMedida, setTipoMedida] = useState("");
    const [ingredientes, setIngredientes] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [viewData, setViewData] = useState({});

    useEffect(() => {
        recuperarPratos();
    }, []);

    const recuperarPratos = () => {
        api.get('/pratos', {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then(response => {
            console.log("Resposta da API:", response.data);
            setPratos(response.data);
        }).catch(() => {
           
        });
    };

    const navigate = useNavigate();

    const handleExcluir = (id) => {
        if (window.confirm("Tem certeza de que deseja excluir este prato?")) {
            api.delete(`/pratos/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                recuperarPratos();
                toast.success("Prato excluído com sucesso!");
            }).catch(() => {
                toast.error("Erro ao excluir o prato.");
            });
        }
    };

    const handleSave = () => {
        if (!nome || !descricao || !preco || !categoria) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        const prato = { nome, descricao, preco, categoria, alergicos, ingredientes };

        if (dataEdit.id) {
            api.put(`/pratos/${dataEdit.id}`, prato, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Prato atualizado com sucesso!");
                recuperarPratos();
                clearForm();
            }).catch(() => {
                toast.error("Erro ao atualizar o prato.");
            });
        } else {
            api.post(`/pratos/${localStorage.empresaId}`, prato, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Prato cadastrado com sucesso!");
                recuperarPratos();
                clearForm();
            }).catch(() => {
                toast.error("Erro ao cadastrar o prato.");
            });
        }
    };

    const clearForm = () => {
        setNome("");
        setDescricao("");
        setPreco("");
        setCategoria("");
        setAlergicos([]);
        setIngredientes([]);
        setIngrediente("");
        setValorMedida("");
        setTipoMedida("");
        setDataEdit({});
    };

    const handleEdit = (prato) => {
        setDataEdit(prato);
        setNome(prato.nome);
        setDescricao(prato.descricao);
        setPreco(prato.preco);
        setCategoria(prato.categoria);
        setAlergicos(prato.alergicos);
        setIngredientes(prato.ingredientes);
    };

    const handleAddIngrediente = () => {
        if (!ingrediente || !valorMedida || !tipoMedida) {
            return toast.error("Todos os campos de ingredientes são obrigatórios!");
        }

        setIngredientes([...ingredientes, { ingrediente, valorMedida, tipoMedida }]);
        setIngrediente("");
        setValorMedida("");
        setTipoMedida("");
    };

    const handleDeleteIngrediente = (index) => {
        const newIngredientes = ingredientes.filter((_, i) => i !== index);
        setIngredientes(newIngredientes);
    };

    const handleBack = () => {
        navigate("/gourmet-inventory/pratos");
    };

    return (
        <div className={styles["body"]}>
            <div className={styles["cabecalho"]}>
                <button onClick={handleBack}>Voltar</button>
                <div className={styles["titulo"]}>
                    <h1>Cadastrar Prato</h1>
                </div>
            </div>
            <div className={styles["corpo"]}>
                <div className={styles["form"]}>
                    <div className={styles["formCadastro"]}>
                        <div className={styles["imgCadastro"]}>
                            <img src={imgUpload} alt="Upload" />
                            <button>Adicionar Foto</button>
                        </div>
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
                                <span>Descrição:</span>
                                <div className={styles["inputDescricao"]}>
                                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["medidas"]}>
                    <h1>Ingredientes</h1>
                    <div className={styles["formMedidas"]}>
                        <div className={styles["input"]}>
                            <span>Ingrediente:</span>
                            <input type="text" value={ingrediente} onChange={(e) => setIngrediente(e.target.value)} />
                        </div>
                        <div className={styles["input"]}>
                            <span>Valor Medida:</span>
                            <input type="text" value={valorMedida} onChange={(e) => setValorMedida(e.target.value)} />
                        </div>
                        <div className={styles["input"]}>
                            <span>Tipo Medida:</span>
                            <input type="text" value={tipoMedida} onChange={(e) => setTipoMedida(e.target.value)} />
                        </div>
                        <button onClick={handleAddIngrediente}>Adicionar Ingrediente</button>
                    </div>
                    <div className={styles["ingredientes"]}>
                        {ingredientes.map((ing, index) => (
                            <CardIngrediente
                                key={index}
                                valor={ing.valorMedida}
                                medida={ing.tipoMedida}
                                ingrediente={ing.ingrediente}
                                imgDeletar={imgDeletar}
                                onDelete={() => handleDeleteIngrediente(index)}
                            />
                        ))}
                    </div>
                    <button id={styles["botao-cadastrar-pratos"]} onClick={handleSave}>
                        {dataEdit.id ? "Atualizar" : "Cadastrar"}
                    </button>
                </div>
            </div>
            <div className={styles["listaPratos"]}>
                <h2>Lista de Pratos</h2>
                {pratos.map(prato => (
                    <div key={prato.id} className={styles["prato"]}>
                        <h3>{prato.nome}</h3>
                        <p>{prato.descricao}</p>
                        <p>{prato.preco}</p>
                        <p>{prato.categoria}</p>
                        <button onClick={() => handleEdit(prato)}>Editar</button>
                        <button onClick={() => handleExcluir(prato.id)}>Excluir</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CadastrarPratos;
