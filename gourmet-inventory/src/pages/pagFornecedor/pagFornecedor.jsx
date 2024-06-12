import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import api from '../../api';
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./pagFornecedor.module.css";
import ModalCadastro from "../../components/modalCadastroForn/ModalCadastro";
import ModalVizualizar from "../../components/modalVizualizarForn/ModalVizualizarForn";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import 'react-toastify/dist/ReactToastify.css';

function PagFornecedor() {
    const [fornecedores, setFornecedores] = useState([]);
    const [openCadastro, setOpenCadastro] = useState(false);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [viewData, setViewData] = useState({});

    const [nomeFornecedor, setNomeFornecedor] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numeracaoLogradouro, setNumeracaoLogradouro] = useState("");
    const [telefone, setTelefone] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {
        recuperarFornecedores();
    }, []);

    const recuperarFornecedores = () => {
        api.get('/fornecedores', {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then(response => {
            console.log("Resposta da API:", response.data);  // Adicione este log
            setFornecedores(response.data);
        }).catch(() => {
            // Adicione sua lógica de tratamento de erro aqui
        });
    };

    const handleExcluir = (idFornecedor) => {
        if (window.confirm("Tem certeza de que deseja excluir este fornecedor?")) {
            api.delete(`/fornecedores/${idFornecedor}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                recuperarFornecedores();
                toast.success("Fornecedor excluído com sucesso!");
            }).catch(() => {
                toast.error("Erro ao excluir o fornecedor.");
            });
        }
    };

    const handleSave = () => {
        if (!nomeFornecedor || !cnpj || !logradouro || !numeracaoLogradouro || !telefone || !categoria) {
            return toast.error("Todos os campos são obrigatórios!");
        }

        const fornecedor = { nomeFornecedor, cnpj, logradouro, numeracaoLogradouro, telefone, categoria };

        if (dataEdit.idFornecedor) {
            api.patch(`/fornecedores/${dataEdit.idFornecedor}`, fornecedor, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Fornecedor atualizado com sucesso!");
                recuperarFornecedores();
                setOpenCadastro(false);
            }).catch(() => {
                toast.error("Erro ao atualizar o fornecedor.");
            });
        } else {
            api.post('/fornecedores', fornecedor, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                toast.success("Fornecedor cadastrado com sucesso!");
                recuperarFornecedores();
                setOpenCadastro(false);
            }).catch(() => {
                toast.error("Erro ao cadastrar o fornecedor.");
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
        setNomeFornecedor("");
        setCnpj("");
        setLogradouro("");
        setNumeracaoLogradouro("");
        setTelefone("");
        setCategoria("");
    };

    const handleEdit = (fornecedor) => {
        setDataEdit(fornecedor);
        setNomeFornecedor(fornecedor.nomeFornecedor);
        setCnpj(fornecedor.cnpj);
        setLogradouro(fornecedor.logradouro);
        setNumeracaoLogradouro(fornecedor.numeracaoLogradouro);
        setTelefone(fornecedor.telefone);
        setCategoria(fornecedor.categoria);
        setOpenCadastro(true);
    };

    const handleView = (fornecedor) => {
        setViewData(fornecedor);
        setOpenVizualizar(true);
    };

    return (
        <>
            <MenuLateral />
            <div className={styles["body"]}>
                <div className={styles["cabecalho"]}>
                    <BarraPesquisa tituloPag={"Fornecedor"} />
                    <button onClick={handleCadastrar}>Cadastrar Fornecedor</button>
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
                            {Array.isArray(fornecedores) && fornecedores.map(fornecedor => (
                                <tr key={fornecedor.idFornecedor} onClick={() => handleView(fornecedor)}>
                                    <td>{fornecedor.nomeFornecedor}</td>
                                    <td>{fornecedor.categoria}</td>
                                    <td>{fornecedor.telefone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {openCadastro && (
                    <ModalCadastro isOpen={openCadastro} setModalOpen={() => setOpenCadastro(!openCadastro)}>
                        <div className={styles["cadastro"]}>
                            <h3>{dataEdit.idFornecedor ? "Editar Fornecedor" : "Cadastrar Fornecedor"}</h3>
                            <div className={styles["inputCadastro"]}>
                                <div className={styles["input"]}>
                                    <span>Nome</span>
                                    <input
                                        type="text"
                                        value={nomeFornecedor}
                                        onChange={(e) => setNomeFornecedor(e.target.value)}
                                    />
                                </div>
                                <div className={styles["input"]}>
                                    <span>CNPJ</span>
                                    <input
                                        type="text"
                                        value={cnpj}
                                        onChange={(e) => setCnpj(e.target.value)}
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
                                        type="text"
                                        value={numeracaoLogradouro}
                                        onChange={(e) => setNumeracaoLogradouro(e.target.value)}
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
                                    <span>Categoria</span>
                                    <input
                                        type="text"
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button onClick={handleSave}>{dataEdit.idFornecedor ? "Salvar" : "Cadastrar"}</button>
                        </div>
                    </ModalCadastro>
                )}

                {openVizualizar && (
                    <ModalVizualizar isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)} titulo={`Fornecedor ${viewData.nomeFornecedor}`}>
                        <div className={styles["formVizualizar"]}>
                            <div className={styles["dadosForn"]}>
                                <span>CNPJ: {viewData.cnpj}</span>
                                <span>Logradouro: {viewData.logradouro}</span>
                                <span>Numeração: {viewData.numeracaoLogradouro} </span>                           
                                <span>Telefone: {viewData.telefone}</span>
                                <span>Categoria: {viewData.categoria}</span>
                            </div>
                            <div className={styles["botao"]}>
                                <button id={styles["editar"]} onClick={() => handleEdit(viewData)}>Editar</button>
                                <button id={styles["excluir"]} onClick={() => handleExcluir(viewData.idFornecedor)}>Excluir</button>
                            </div>
                        </div>
                    </ModalVizualizar>
                )}
            </div>
        </>
    );
}

export default PagFornecedor;

