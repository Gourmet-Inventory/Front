import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import api from '../../api';
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Relatorios.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import ModalRelatorios from "../../components/modalRelatorio/ModalRelatorio";
import 'react-toastify/dist/ReactToastify.css';

const Relatorios = () => {
    const [relatorios, setRelatorios] = useState([]);
    const [filteredRelatorios, setFilteredRelatorios] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
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

    const handleDateFilterChange = (e) => {
        const { name, value } = e.target;
        setDateFilter(prev => ({
            ...prev,
            [name]: value
        }));
        filterRelatorios(relatorios, dateFilter.startDate, dateFilter.endDate);
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
            <div className={styles.body}>
                <div className={styles.cabecalho}>
                    <BarraPesquisa
                        tituloPag="Relatórios"
                        onSearch={(startDate, endDate) => filterRelatorios(relatorios, startDate, endDate)}
                    />
                </div>
                <ImgConfig />
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
                </div>
                <div className={styles.form}>
                    {filteredRelatorios.map(relatorio => (
                        <div className={styles.card} key={relatorio.idRelatorio}>
                            <div className={styles.nome}>
                                <span className={styles.titulo}>{relatorio.nome}</span>
                                <span>Categoria: {relatorio.categoria}</span>
                            </div>
                            <div className={styles.dados}>
                                <span>Descrição: {relatorio.descricao}</span>
                                <span>Data de Criação: {relatorio.dataCriacao}</span>
                            </div>
                            <button onClick={() => handleView(relatorio)}>Ver Mais</button>
                        </div>
                    ))}
                </div>
                <div className={styles.filterContainer}>
                    <h3>Relatórios por Mês</h3>
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
                                    <button onClick={handleExtrairRelatorio}>Extrair</button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {viewData && (
                    <ModalRelatorios
                        isOpen={openVizualizar}
                        setModalOpen={() => setOpenVizualizar(!openVizualizar)}
                        tituloModal={viewData.nome}
                        categoriaModal={`Categoria: ${viewData.categoria}`}
                    >
                        <div className={styles.corpoVizualizar}>
                            <div className={styles.corpoModal}>
                                <div className={styles.descricaoModal}>
                                    <div className={styles.textDescricao}>
                                        <span>Data de Criação: {viewData.dataCriacao}</span>
                                        <span>Descrição: {viewData.descricao}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.buttonModal}>
                                <button id={styles.editar} onClick={() => handleEditar(viewData)}>Editar</button>
                                <button id={styles.excluir} onClick={() => confirmRemove(viewData.idRelatorio)}>Excluir</button>
                            </div>
                        </div>
                    </ModalRelatorios>
                )}
            </div>
        </>
    );
};

export default Relatorios;