import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./pagFornecedor.module.css";
import ModalCadastro from "../../components/modalCadastroForn/ModalCadastro";
import ModalVizualizar from "../../components/modalVizualizarForn/ModalVizualizarForn";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import 'react-toastify/dist/ReactToastify.css'; // Certifique-se de importar o CSS do react-toastify

function PagFornecedor() {
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [viewData, setViewData] = useState({});
    const [openCadastro, setOpenCadastro] = useState(false);
    const [openVizualizar, setOpenVizualizar] = useState(false);

    const [nome, setNome] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numeracao, setNumeracao] = useState("");
    const [telefone, setTelefone] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {
        const db_costumer = localStorage.getItem("cad_cliente")
            ? JSON.parse(localStorage.getItem("cad_cliente"))
            : [];
        setData(db_costumer);
    }, []);

    const handleSave = () => {
        if (!nome || !logradouro || !numeracao || !telefone || !categoria) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        if (telefoneAlreadyExists()) {
            return toast.error("Telefone já existe!");
        }

        const newDataArray = dataEdit.index !== undefined
            ? data.map((item, index) => index === dataEdit.index ? { nome, logradouro, numeracao, telefone, categoria } : item)
            : [...data, { nome, logradouro, numeracao, telefone, categoria }];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
        setData(newDataArray);
        setOpenCadastro(false);
    };

    const telefoneAlreadyExists = () => {
        if (dataEdit.telefone !== telefone && data?.length) {
            return data.find((item) => item.telefone === telefone);
        }
        return false;
    };

    const handleRemove = (telefone) => {
        const newArray = data.filter((item) => item.telefone !== telefone);
        setData(newArray);
        localStorage.setItem("cad_cliente", JSON.stringify(newArray));
        setOpenVizualizar(false);  // Fecha o modal após exclusão
    };

    const confirmRemove = (telefone) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Tem certeza que deseja excluir este item?</p>
                    <button className={styles["toast-button-yes"]} onClick={() => { handleRemove(telefone); closeToast(); }}>Sim</button>
                    <button className={styles["toast-button-no"]} onClick={closeToast}>Não</button>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    const handleEdit = (item, index) => {
        setDataEdit({ ...item, index });
        setNome(item.nome);
        setLogradouro(item.logradouro);
        setNumeracao(item.numeracao);
        setTelefone(item.telefone);
        setCategoria(item.categoria);
        setOpenCadastro(true);
        setOpenVizualizar(false);  // Fecha o modal de visualização ao abrir o de edição
    };

    const handleView = (item, index) => {
        setViewData({ ...item, index });
        setOpenVizualizar(true);
    };

    const rowStyle = {
        marginBottom: '10px',
    };

    return (
        <>
            <MenuLateral />
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Fornecedor"} />
                    <button onClick={() => { setDataEdit({}); setNome(""); setLogradouro(""); setNumeracao(""); setTelefone(""); setCategoria(""); setOpenCadastro(true); }}>Cadastrar Fornecedor</button>
                </div>
                <ImgConfig />

                <div className={styles["form"]}>
                    <div className={styles["tituloForm"]}>
                        <span>Nome</span>
                        <span>Categoria</span>
                        <span>Telefone</span>
                    </div>
                    <div className={styles["tabelaForn"]}>
                        <table>
                            <thead>
                                <tr>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} onClick={() => handleView(item, index)} style={rowStyle}>
                                        <td>{item.nome}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.telefone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ModalCadastro isOpen={openCadastro} setModalOpen={() => setOpenCadastro(!openCadastro)}>
                    <div className={styles["cadastro"]}>
                        <h3>{dataEdit.index !== undefined ? "Editar Fornecedor" : "Cadastrar Fornecedor"}</h3>
                        <div className={styles["inputCadastro"]}>
                            <div className={styles["input"]}>
                                <span>Nome</span>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Logradouro</span>
                                <input
                                    type="text"
                                    value={logradouro}
                                    onChange={(e) => setLogradouro(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Numeração</span>
                                <input
                                    type="number"
                                    value={numeracao}
                                    onChange={(e) => setNumeracao(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Telefone</span>
                                <input
                                    type="number"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Categoria</span>
                                <input
                                    type="text"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                />
                            </div>
                        </div>
                        <button onClick={handleSave}>{dataEdit.index !== undefined ? "Salvar" : "Cadastrar"}</button>
                    </div>
                </ModalCadastro>

                <ModalVizualizar isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)} titulo={`Fornecedor ${viewData.nome}`}>
                    <div className={styles["formVizualizar"]}>
                    <div className={styles["dadosForn"]}>
                        <span>Logradouro: {viewData.logradouro}</span>
                        <span>Numeração: {viewData.numeracao}</span>
                        <span>Telefone: {viewData.telefone}</span>
                        <span>Categoria: {viewData.categoria}</span>
                    </div>

                    <div className={styles["botao"]}>
                        <button id={styles["editar"]} onClick={() => handleEdit(viewData, viewData.index)}>Editar</button>
                        <button id={styles["excluir"]} onClick={() => confirmRemove(viewData.telefone)}>Excluir</button>
                    </div>
                    </div>
                </ModalVizualizar>
            </div>
        </>
    );
}

export default PagFornecedor;
