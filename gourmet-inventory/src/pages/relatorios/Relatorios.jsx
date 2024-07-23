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
    const [pratos, setPratos] = useState([]);
    const [relatorios, setRelatorios] = useState([]);
    const [filteredRelatorios, setFilteredRelatorios] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);
    const [viewData, setViewData] = useState({
        idRelatorio: '',
        dataCriacao: '',
        pratoList: []
    });

    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        recuperarRelatorios();
    }, []);

    const recuperarRelatorios = () => {
        api.get('/relatorio', {
            headers: { 'Authorization': `Bearer ${localStorage.token}` },
        })
            .then((response) => {
                console.log('Resposta da API:', response.data);
                setRelatorios(response.data);
            })
            .catch((error) => {
                toast.error("Erro ao recuperar relatórios.");
            });
    };

    const confirmRemove = (id) => {
        api.delete(`/relatorio/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` },
        })
            .then(() => {
                recuperarRelatorios();
                toast.success("Relatório deletado com sucesso.");
            })
            .catch(() => {
                toast.error("Erro ao deletar relatório.");
            });
    };

    const filterRelatorios = (relatorios, startDate, endDate) => {
        const filtered = relatorios.filter(relatorio => {
            const dataCriacao = new Date(relatorio.dataCriacao);
            return dataCriacao >= new Date(startDate) && dataCriacao <= new Date(endDate);
        });
        setFilteredRelatorios(filtered);
    };

    const handleDateFilterChange = (e) => {
        const { name, value } = e.target;
        setDateFilter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleView = (relatorio) => {
        setViewData(relatorio);
        setOpenVizualizar(true);
    };

    const handleExtrair = (relatorio) => {
        // Lógica para extrair os relatórios
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

                <div className={styles.containerForm}>
                    <div className={styles.form}>
                        {relatorios.map(relatorio => (
                            <div className={styles.card} key={relatorio.idRelatorio}>
                                <div className={styles.nome}>
                                    <span className={styles.titulo}>{relatorio.data}</span>
                                </div>
                                <button onClick={() => handleView(relatorio)}>Ver Mais</button>
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
                            {/* {Object.keys(groupedRelatorios).map(monthYear => (
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
                            ))} */}
                            <button onClick={handleExtrair}>Extrair</button>
                        </div>
                        <div className={styles.resumoRelatorios}>
                            <h3>Relatórios saída de todos os pratos deste Mês</h3>
                            {/* {Object.keys(groupedRelatorios).map(monthYear => (
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
                            ))} */}
                            <button onClick={handleExtrair}>Extrair</button>
                        </div>
                    </div>
                </div>

                {openVizualizar && (
                    <ModalRelatorios
                        isOpen={openVizualizar}
                        setModalOpen={() => setOpenVizualizar(!openVizualizar)}
                        tituloModal="Relatório"
                        dataModal={viewData.dataCriacao}
                    >
                        <div className={styles.corpoVizualizar}>
                            <div className={styles.dadosModal}>
                                <div className={styles.tituloDadosModal}>
                                    <h3>Quant: {viewData.pratoList.length}</h3>
                                    <h3>Prato: </h3>
                                </div>
                                <div className={styles.resumoDadosModal}>
                                    <div>
                                        {viewData.pratoList.map((prato, index) => (
                                            <div key={index}>
                                                - {prato.nome}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.buttonModal}>
                                <button id={styles.extrair} onClick={() => handleExtrair(viewData)}>Extrair</button>
                                <button id={styles.excluir} onClick={() => confirmRemove(viewData.idRelatorio)}>Excluir</button>
                            </div>
                        </div>
                    </ModalRelatorios>
                )}

            </div>
        </>
    );
};

const groupByMonth = (relatorios) => {
    const grouped = {};
    relatorios.forEach(relatorio => {
        const date = new Date(relatorio.dataCriacao);
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
        if (!grouped[monthYear]) {
            grouped[monthYear] = [];
        }
        grouped[monthYear].push(relatorio);
    });
    return grouped;
};

export default Relatorios;
