import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import api from '../../api';
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./PagFuncionarios.module.css";
import ModalCadastro from "../../components/modais/modalCadastroForn/ModalCadastro";
import ModalVizualizar from "../../components/modais/modalVizualizarFunc/ModalVizualizarFunc";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PagFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [openCadastro, setOpenCadastro] = useState(false);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [viewData, setViewData] = useState({});

    const [nome, setNome] = useState("");
    const [cargo, setCargo] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [senha, setSenha] = useState("");
    

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/gourmet-inventory/saida-pratos");
    };

    useEffect(() => {
        recuperarFuncionarios();
    }, []);

    const recuperarFuncionarios = () => {
        api.get(`/usuarios/${localStorage.idEmpresa}`, {
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
        if (!nome || !cargo || !email || !celular || !senha) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        const idEmpresa = Number(localStorage.getItem("idEmpresa"));
        const usuario = {
            nome,
            cargo,
            email,
            celular,
            senha,
            idEmpresa: idEmpresa // Adiciona o idEmpresa ao objeto
        };

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
            console.log(usuario);
            api.post(`/usuarios`, usuario, {
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
        setDataEdit({});
        limparCampos();
        setOpenCadastro(true);
    };

    const limparCampos = () => {
        setNome("");
        setCargo("");
        setEmail("");
        setCelular("");
        setSenha("");
    };

    const handleEdit = (usuario) => {
        setDataEdit(usuario);
        setNome(usuario.nome);
        setCargo(usuario.cargo);
        setEmail(usuario.email);
        setCelular(usuario.celular);
        setSenha(usuario.senha);
        setOpenCadastro(true);
        setOpenVizualizar(false);
    };

    const handleView = (usuario) => {
        setViewData(usuario);
        console.log("usuario", usuario)
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
                                    placeholder="Maria"
                                />
                            </div>
                        
                            <div className={styles["input"]}>
                                <span>Cargo</span>
                                <input
                                    type="text"
                                    value={cargo}
                                    onChange={(e) => setCargo(e.target.value)}
                                    placeholder="normal ou administrador"
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Celular</span>
                                <input
                                    type="text"
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                    placeholder="(00) 0000-0000"
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>E-mail</span>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="maria@email.com"
                                />
                            </div>
                            <div className={styles["input"]}>
                                <span>Senha</span>
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder="Minímo 6 caractéres"
                                />
                            </div>
                        </div>
                        <button onClick={handleSave}>Salvar</button>
                    </div>
                </ModalCadastro>

                <ModalVizualizar isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)} titulo={"Visualizar Funcionário"}>
                   <div className={styles["dadosForn"]}>
                        <div className={styles["dados"]}>
                            <span><strong>Nome:</strong> {viewData.nome}</span>
                            <span><strong>Cargo:</strong> {viewData.cargo}</span>
                            <span><strong>Celular:</strong> {viewData.celular}</span>
                            <span><strong>E-mail:</strong> {viewData.email}</span>
                        </div>
                        <div className={styles["botao"]}>
                            <button onClick={() => handleEdit(viewData, viewData.idUsuario)} id={styles["editar"]}>Editar</button>
                            <button onClick={() => handleExcluir(viewData.idUsuario)} id={styles["excluir"]}>Excluir</button>
                        </div>
                    </div>
                </ModalVizualizar>
            </div>
        </>
    );
}

export default PagFuncionarios;
