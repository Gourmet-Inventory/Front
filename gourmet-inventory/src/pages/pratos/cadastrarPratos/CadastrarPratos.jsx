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
        // const [pratos, setPratos] = useState([]);
        const [nome, setNome] = useState("");
        const [preco, setPreco] = useState("");
        const [alergicos, setAlergicos] = useState([]);
        const [descricao, setDescricao] = useState("");
        const [ingredientes, setIngredientes] = useState([]);
        const [valorMedida, setValorMedida] = useState("");
        const [tipoMedida, setTipoMedida] = useState("");

        const navigate = useNavigate();

        const handleSave = () => {
            if (!nome || !preco || !descricao || !ingredientes.length) {
                return toast.error("Todos os campos são obrigatórios!");
            }

            // Atualizar o estado pratos com os dados atualizados
            //  setPratos(newPratosArray);

            const newPrato = { nome, preco, alergicos, descricao, ingredientes };
            const pratos = localStorage.getItem("cad_pratos")
                ? JSON.parse(localStorage.getItem("cad_pratos"))
                : [];
            const newPratosArray = [...pratos, newPrato];

            localStorage.setItem("cad_pratos", JSON.stringify(newPratosArray));

            toast.success("Prato cadastrado com sucesso!");
            navigate("/gourmet-inventory/pratos"); // Navega de volta para a página de pratos
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
            navigate("/gourmet-inventory/pratos"); // Ajuste o caminho conforme necessário
        };

        return (
            <>
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
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default CadastrarPratos;
