import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import styles from "./PagFuncionarios.module.css";
import ModalCadastro from "../../components/modalCadastroForn/ModalCadastro";
import ModalVizualizar from "../../components/modalVizualizarForn/ModalVizualizarForn";
import { toast } from 'react-toastify';


function PagFuncionario() {
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [viewData, setViewData] = useState({});
    const [openCadastro, setOpenCadastro] = useState(false);
    const [openVizualizar, setOpenVizualizar] = useState(false);

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [cargo, setCargo] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleBack = () => {
        navigate("/gourmet-inventory/menu"); // Ajuste o caminho conforme necessário
    };

    useEffect(() => {
        const db_costumer = localStorage.getItem("cad_cliente")
            ? JSON.parse(localStorage.getItem("cad_cliente"))
            : [];
        setData(db_costumer);
    }, []);

    const handleSave = () => {
        if (!nome || !cpf || !cargo || !telefone || !email || !senha) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        if (cpfAlreadyExists()) {
            return toast.error("CPF já existe!");
        }

        const newDataArray = dataEdit.index !== undefined
            ? data.map((item, index) => index === dataEdit.index ? { nome, cpf, cargo, telefone, email, senha } : item)
            : [...data, { nome, cpf, cargo, telefone, email, senha }];

        localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
        setData(newDataArray);
        setOpenCadastro(false);
    };

    const cpfAlreadyExists = () => {
        if (dataEdit.cpf !== cpf && data?.length) {
            return data.find((item) => item.cpf === cpf);
        }
        return false;
    };

    const handleRemove = (cpf) => {
        const newArray = data.filter((item) => item.cpf !== cpf);
        setData(newArray);
        localStorage.setItem("cad_cliente", JSON.stringify(newArray));
        setOpenVizualizar(false);  // Fecha o modal após exclusão
    };

    const confirmRemove = (cpf) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Tem certeza que deseja excluir este item?</p>
                    <button className={styles["toast-button-yes"]} onClick={() => { handleRemove(cpf); closeToast(); }}>Sim</button>
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
        setCpf(item.cpf);
        setCargo(item.cargo);
        setTelefone(item.telefone);
        setEmail(item.email);
        setSenha(item.senha);
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
            <div className={styles["body"]}>
                <div className={styles["voltar"]}>
                    <button onClick={handleBack}>Voltar</button>
                </div>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Área Funcionários"} />
                    <button onClick={() => { setDataEdit({}); setNome(""); setCpf(""); setCargo(""); setTelefone(""); setEmail(""); setSenha(""); setOpenCadastro(true); }}>Cadastrar Funcionário</button>
                </div>
                

                <div className={styles["form"]}>
                    <div className={styles["tituloForm"]}>
                        <span>Nome</span>
                        <span>E-mail</span>
                        <span>Cargo</span>
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
                                        <td>{item.email}</td>
                                        <td>{item.cargo}</td>
                                        <td>{item.telefone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ModalCadastro isOpen={openCadastro} setModalOpen={() => setOpenCadastro(!openCadastro)}>
                    <div className={styles["cadastro"]}>
                        <h3>{dataEdit.index !== undefined ? "Editar Funcionário" : "Novo Funcionário"}</h3>
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
                                <span>CPF</span>
                                <input
                                    type="text"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Cargo</span>
                                <input
                                    type="text"
                                    value={cargo}
                                    onChange={(e) => setCargo(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Telefone</span>
                                <input
                                    type="text"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>E-mail</span>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Senha</span>
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        </div>
                        <button onClick={handleSave}>{dataEdit.index !== undefined ? "Salvar" : "Cadastrar"}</button>
                    </div>
                </ModalCadastro>

                <ModalVizualizar isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)} titulo={`Fornecedor ${viewData.nome}`}>
                    <div className={styles["formVizualizar"]}>
                    <div className={styles["dadosForn"]}>
                        <span>Cargo: {viewData.cargo}</span>
                        <span>Telefone: {viewData.telefone}</span>
                        <span>E-mail: {viewData.email}</span>
                    </div>

                    <div className={styles["botao"]}>
                        <button id={styles["editar"]} onClick={() => handleEdit(viewData, viewData.index)}>Editar</button>
                        <button id={styles["excluir"]} onClick={() => confirmRemove(viewData.cpf)}>Excluir</button>
                    </div>
                    </div>
                </ModalVizualizar>
            </div>
        </>
    );
}

export default PagFuncionario;
