import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import api from '../../api';
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./PagFuncionarios.module.css";
import ModalCadastro from "../../components/modalCadastroForn/ModalCadastro";
import ModalVizualizar from "../../components/modalVizualizarForn/ModalVizualizarForn";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PagFornecedor() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [openCadastro, setOpenCadastro] = useState(false);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [viewData, setViewData] = useState({});


    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/gourmet-inventory/menu"); // Ajuste o caminho conforme necessário
    };

    useEffect(() => {
        recuperarFuncionarios();
    }, []);

    const recuperarFuncionarios = () => {
        api.get(`/usuarios/${localStorage.empresaId}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then(response => {
            console.log("Resposta da API:", response.data);  // Adicione este log
            setFuncionarios(response.data);
        }).catch(() => {
            toast.error("Erro ao recuperar os funcionários.");
        });
    };

    const handleExcluir = (idUsuario) => {
        if (window.confirm("Tem certeza de que deseja excluir este fornecedor?")) {
            api.delete(`/usuarios/${idUsuario}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                recuperarFuncionarios();
                toast.success("Usuário excluído com sucesso!");
            }).catch(() => {
                toast.error("Erro ao excluir o usuário.");
            });
        }
    };

    const handleSave = () => {
        if (!nome || !cargo || !cpf || !email || !celular || !senha) {
            return toast.error("Todos os campos são obrigatórios!");
        }
        
        const usuario = { nome, cargo, cpf, email, celular, senha };
        
        if (dataEdit.idUsuario) {
            api.patch(`/usuarios/${dataEdit.idUsuario}`, usuario, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Usuário atualizado com sucesso!");
                recuperarFuncionarios();
                setOpenCadastro(false);
            }).catch(() => {
                toast.error("Erro ao atualizar o usuário.");
            });
        } else {
            api.post(`/usuarios/${localStorage.empresaId}`, usuario, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Usuário cadastrado com sucesso!");
                recuperarFuncionarios();
                setOpenCadastro(false);
            }).catch(() => {
                console.log(usuario)
                toast.error("Erro ao cadastrar o usuário.");
            });
        }
    };

    const handleCadastrar = () => {
        // Limpar os dados editados
        setDataEdit({});
        // Limpar os campos do formulário
        limparCampos();
        // Abrir o modal de cadastro
        setOpenCadastro(true);
    };

    const limparCampos = () => {
        setNome("");
        setCargo("");
        setCpf("");
        setEmail("");
        setCelular("");
        setSenha("");
    };

    const handleEdit = (usuario) => {
        setDataEdit(usuario);
        setNome(usuario.nome);
        setCargo(usuario.cargo);
        setCpf(usuario.cpf);
        setEmail(usuario.email);
        setCelular(usuario.celular);
        setSenha(usuario.senha);
        setOpenCadastro(true);
    };

    const handleView = (usuario) => {
        setViewData(usuario);
        setOpenVizualizar(true);
    };

    return (
        <>
            <div className={styles["body"]}>
                <div className={styles["voltar"]}>
                    <button onClick={handleBack}>Voltar</button>
                </div>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Área Funcionários"} />
                    <button onClick={handleCadastrar}>Cadastrar Funcionário</button>
                </div>
                <ImgConfig />
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
                                <tr></tr>
                            </thead>
                            <tbody>
                                {Array.isArray(funcionarios) && funcionarios.map(usuario => (
                                    <tr key={usuario.idUsuario} onClick={() => handleView(usuario)}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.cargo}</td>
                                        <td>{usuario.celular}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ModalCadastro isOpen={openCadastro} setModalOpen={() => setOpenCadastro(!openCadastro)}>
                    <div className={styles["cadastro"]}>
                        <h3>{dataEdit.idUsuario ? "Editar Funcionário" : "Novo Funcionário"}</h3>
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
                                <span>Celular</span>
                                <input
                                    type="text"
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
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
                        <button onClick={handleSave}>{dataEdit.idUsuario ? "Salvar" : "Cadastrar"}</button>
                    </div>
                </ModalCadastro>

                <ModalVizualizar isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)} titulo={`Funcionário ${viewData.nome}`}>
                    <div className={styles["formVizualizar"]}>
                        <div className={styles["dadosForn"]}>
                            <span>Cargo: {viewData.cargo}</span>
                            <span>Telefone: {viewData.celular}</span>
                            <span>E-mail: {viewData.email}</span>
                        </div>

                        <div className={styles["botao"]}>
                            <button id={styles["editar"]} onClick={() => handleEdit(viewData)}>Editar</button>
                            <button id={styles["excluir"]} onClick={() => handleExcluir(viewData.idUsuario)}>Excluir</button>
                        </div>
                    </div>
                </ModalVizualizar>
            </div>
        </>
    );
}

export default PagFornecedor;
