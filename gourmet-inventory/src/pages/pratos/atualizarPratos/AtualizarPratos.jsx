import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AtualizarPratos.module.css";
import { toast } from 'react-toastify';
import imgUpload from "../../../utils/assets/Group 191.svg";
import AlergicoSelector from "../../../components/alergicoSelector/AlergicoSelector";
import CardIngrediente from "../../../components/cardIngrediente/CardIngrediente";
import imgDeletar from "../../../utils/assets/Fechar.svg";

function AtualizarPratos() {
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [alergicos, setAlergicos] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [pratos, setPratos] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [ingrediente, setIngrediente] = useState("");
    const [valorMedida, setValorMedida] = useState("");
    const [tipoMedida, setTipoMedida] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const prato = location.state.prato;

    // Preencher os estados com os dados do prato atual
    useEffect(() => {   
        if (prato) {
            console.log("prato", prato)
            setNome(prato.nome || "");
            setPreco(prato.preco || "");
            setAlergicos(prato.alergicos || []);
            setDescricao(prato.descricao || "");
            setIngredientes(prato.ingredientes || []);
            setPratos(prato)
        }
    }, [prato]);

    const handleUpdate = () => {
        if (!nome || !preco || !descricao || !ingredientes.length) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        // Atualizar os dados do prato na lista de pratos
        const updatedPratos = pratos.map(item => {
            if (item.id === prato.id) {
                return { ...item, nome, preco, alergicos, descricao, ingredientes };
            }
            return item;
        });

        // Atualizar o estado com os novos pratos
        // setPratos(...updatedPratos, updatedPratos);

        console.log("updatedPratos", updatedPratos)

        // Atualizar os dados no localStorage, se necessário
        localStorage.setItem("cad_pratos", JSON.stringify(updatedPratos));

        toast.success("Prato atualizado com sucesso!");
        navigate("/gourmet-inventory/pratos");
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
        <>
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <button onClick={handleBack}>Voltar</button>
                    <div className={styles["titulo"]}>
                        <h1>Atualizar Prato</h1>
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
                        <button id={styles["botao-atualizar-pratos"]} onClick={handleUpdate}>
                            Atualizar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AtualizarPratos;
