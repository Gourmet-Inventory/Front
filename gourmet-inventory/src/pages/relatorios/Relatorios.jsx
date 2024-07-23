import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import api from '../../api';
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Relatorios.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import ModalRelatorios from "../../components/modalRelatorio/ModalRelatorio";
import ModalMes from "../../components/modalMes/ModalMes";
import 'react-toastify/dist/ReactToastify.css';
import Saida from "../saida/Saida";

const Relatorios = () => {
    const [pratos, setPratos] = useState([]);
    const [relatorios, setRelatorios] = useState([]);
    const [filteredRelatorios, setFilteredRelatorios] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);   
    const [openVizualizarMes, setOpenVizualizarMes] = useState(false);       
    const [viewData, setViewData] = useState({
        idRelatorio: '',
        nome: '',
        descricao: '',  
        categoria: '',
        dataCriacao: ''
    });

    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: ''
    });

    const navigate = useNavigate();

    const getRelatorios = async () => {
        try {
            const response = await api.get(`/relatorios/${localStorage.empresaId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            });
            if (Array.isArray(response.data)) {
                setRelatorios(response.data);
                filterRelatorios(response.data, dateFilter.startDate, dateFilter.endDate);
            } else {
                console.error('A resposta da API não é um array:', response.data);
                setRelatorios([]);
            }
        } catch (error) {
            console.error('Erro ao buscar relatórios:', error);
            toast.error("Erro ao buscar relatórios.");
        }
    };

    const filterRelatorios = (relatoriosList, startDate, endDate) => {
        if (!startDate || !endDate) {
            setFilteredRelatorios(relatoriosList);
            return;
        }
        const filtered = relatoriosList.filter(relatorio => {
            const relatorioDate = new Date(relatorio.dataCriacao);
            return relatorioDate >= new Date(startDate) && relatorioDate <= new Date(endDate);
        });
        setFilteredRelatorios(filtered);
    };

    useEffect(() => {
        getRelatorios();
    }, []);

    useEffect(() => {
        filterRelatorios(relatorios, dateFilter.startDate, dateFilter.endDate);
    }, [dateFilter, relatorios]);

    const handleDateFilterChange = (e) => {
        const { name, value } = e.target;
        setDateFilter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleExtrair = () => {
        navigate("/gourmet-inventory/extrair-relatorios");
    };

    const handleEditar = (relatorio) => {
        navigate("/gourmet-inventory/extrair-relatorios", { state: { relatorio } });
    };

    const confirmRemove = (id) => {
        toast(
            ({ closeToast }) => (
                <div>
                    <p>Tem certeza que deseja excluir este relatório?</p>
                    <button className={styles["toast-button-yes"]} onClick={() => handleDelete(id, closeToast)}>Sim</button>
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

    const handleView = (relatorio) => {
        setViewData(relatorio);
        setOpenVizualizar(true);
    };

    const handleDelete = async (id, closeToast) => {
        try {
            await api.delete(`/relatorios/${id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            });
            setRelatorios(relatorios.filter(relatorio => relatorio.idRelatorio !== id));
            closeToast();
            setOpenVizualizar(false);
            getRelatorios();
            toast.success("Relatório excluído com sucesso!");
        } catch (error) {
            console.error('Erro ao excluir relatório:', error);
            toast.error("Erro ao excluir relatório.");
        }
    };

    const handleExtrairRelatorio = async () => {
        try {
            const response = await api.get(`/consulta-nutricao-api/${localStorage.empresaId}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` },
                responseType: 'arraybuffer'
            });

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'nutrition_data.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                toast.success("Relatório extraído com sucesso!");
            } else {
                toast.error("Erro ao extrair relatório.");
            }
        } catch (error) {
            console.error('Erro ao extrair relatório:', error);
            toast.error("Erro ao extrair relatório.");
        }
    };

    const groupByMonth = (relatoriosList) => {
        const grouped = relatoriosList.reduce((acc, relatorio) => {
            const relatorioDate = new Date(relatorio.dataCriacao);
            const monthYear = `${relatorioDate.getMonth() + 1}/${relatorioDate.getFullYear()}`;
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(relatorio);
            return acc;
        }, {});
        return grouped;
    };

    const groupedRelatorios = groupByMonth(relatorios);

    return (
        <>
            <MenuLateral />
            <ImgConfig />
            <div className={styles.body}>
                <div className={styles.cabecalho}>
                    <BarraPesquisa
                        tituloPag="Relatórios"
                        onSearch={(startDate, endDate) => filterRelatorios(relatorios, startDate, endDate)}
                    />
                </div>

                <div className={styles.containerForm}>
                    <div className={styles.form}>
                        {Array(24).fill().map((_, idx) => (
                            <div className={styles.card} key={idx}>
                                <div className={styles.nome}>
                                    <span className={styles.titulo}>20/10/2004</span>
                                </div>
                                <button onClick={() => handleView({ idRelatorio: idx, nome: `Relatório ${idx}`, descricao: 'Descrição do relatório', dataCriacao: '20/10/2004' })}>Ver Mais</button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.filters}>
                        <div className={styles.filterContainer}>
                            <h3>Filtro de Data</h3>
                            <label>
                                De:
                                <input
                                    type="date"
                                    name="startDate"
                                    value={dateFilter.startDate}
                                    onChange={handleDateFilterChange}
                                />
                            </label>
                            <label>
                                Até:
                                <input
                                    type="date"
                                    name="endDate"
                                    value={dateFilter.endDate}
                                    onChange={handleDateFilterChange}
                                />
                            </label>
                            <button onClick={() => filterRelatorios(relatorios, dateFilter.startDate, dateFilter.endDate)}>Filtrar</button>
                        </div>
                        <div className={styles.resumoRelatorios}>
                            <h3>Relatórios alertas disparados deste Mês</h3>
                            {Object.keys(groupedRelatorios).map(monthYear => (
                                <div className={styles.monthCard} key={monthYear}>
                                    <h4>{monthYear}</h4>
                                    {groupedRelatorios[monthYear].map(relatorio => (
                                        <div className={styles.card} key={relatorio.idRelatorio}>
                                            <div className={styles.nome}>
                                                <span className={styles.titulo}>{relatorio.nome}</span>
                                                <span>Categoria: {relatorio.categoria}</span>
                                            </div>
                                            <div className={styles.dados}>
                                                <span>Descrição: {relatorio.descricao}</span>
                                                <span>Data de Criação: {relatorio.dataCriacao}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button onClick={() => setOpenVizualizarMes(true)}>Extrair</button>
                        </div>
                        <div className={styles.resumoRelatorios}>
                            <h3>Relatórios saída de todos os pratos deste Mês</h3>
                            {Object.keys(groupedRelatorios).map(monthYear => (
                                <div className={styles.monthCard} key={monthYear}>
                                    <h4>{monthYear}</h4>
                                    {groupedRelatorios[monthYear].map(relatorio => (
                                        <div className={styles.card} key={relatorio.idRelatorio}>
                                            <div className={styles.nome}>
                                                <span className={styles.titulo}>{relatorio.nome}</span>
                                                <span>Categoria: {relatorio.categoria}</span>
                                            </div>
                                            <div className={styles.dados}>
                                                <span>Descrição: {relatorio.descricao}</span>
                                                <span>Data de Criação: {relatorio.dataCriacao}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button onClick={() => setOpenVizualizarMes(true)}>Extrair</button>
                        </div>
                    </div>
                </div>

                <ModalMes isOpen={openVizualizarMes} setModalOpen={() => setOpenVizualizarMes(!openVizualizarMes)} titulo={"Visualizar Funcionário"}>
                </ModalMes>

                {openVizualizar && (
                    <ModalRelatorios
                        isOpen={openVizualizar}
                        setModalOpen={() => setOpenVizualizar(!openVizualizar)}
                        tituloModal="Relatório"
                        dataModal="20/10/2024"
                    >
                        <div className={styles["corpoVizualizar"]}>
                            <div className={styles.dadosModal}>
                                <div className={styles.tituloDadosModal}>
                                    <h3>Quant:</h3>
                                    <h3>Prato:</h3>
                                </div>
                                <div className={styles.resumoDadosModal}>
                                    <h3>15 {pratos}</h3>
                                    <h3>sopa {pratos.nome}</h3>
                                </div>
                            </div>
                            <div className={styles["buttonModal"]}>
                                <button id={styles["extrair"]} onClick={() => handleEditar(viewData)}>Extrair</button>
                                <button id={styles["excluir"]} onClick={() => confirmRemove(viewData.idRelatorio)}>Excluir</button>
                            </div>
                        </div>
                    </ModalRelatorios>
                )}
            </div>
        </>
    );
};

export default Relatorios;
