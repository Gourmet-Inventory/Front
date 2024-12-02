import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import styles from "./Saida.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import api from "../../api";
import CardComanda from "../../components/cardComanda/CardComanda";

function Saida() {
    const [comandas, setComandas] = useState([]);
    const [openVizualizar, setOpenVizualizar] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/comandas/comandas-enviadas-hoje`, {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setComandas(response.data);
                } else {
                    console.error('A resposta da API não é um array:', response.data);
                    setComandas([]);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar Comandas:', error);
                setComandas([]);
            });
    }, []);


    const toggleOpenVizualizar = () => {
        setOpenVizualizar(!openVizualizar);
    };

    return (
        <div className={styles["body"]}>
            <MenuLateral />
            <div className={styles["cabecalho"]}>
                <h1>Comandas</h1>
                <ImgConfig />
            </div>
            <div className={styles["formPratos"]}>
                <div className={styles["botoes"]}>
                    <button className={styles["botao1"]}>Em andamento</button>
                    <button className={styles["botao2"]}>Finalizados</button>
                </div>
                <div className={styles["form"]}>
                    {comandas.map((comanda) => (
                        <CardComanda
                            key={comanda.id}
                            idComanda={comanda.id}
                            titulo={comanda.titulo}
                            mesa={comanda.mesa}
                            pratos={comanda.itens}
                            status={comanda.status}
                        />
                    ))}
                </div>


                {/* <div className={styles["saidaPratos"]}>
                        <div className={styles["saida"]}>
                            <div className={styles["tituloSaida"]}>
                                <span>Pratos</span>
                            </div>
                            <div className={styles["corpoSaida"]}>
                                {pratosSelecionados.map((prato, index) => (
                                    <div className={styles.cardSaida} key={index}>
                                        <span className={styles.texto}>
                                        <span>{prato.nome}</span>
                                        </span>
                                        <img src={imgFechar} alt="Remover" onClick={() => removerPrato(index)} />
                                    </div>
                                ))}
                            </div>
                            <span className={styles.botoes1}>
                            <button onClick={desfazerAdicao}>Desfazer</button>
                            <button onClick={limparLista}>Limpar Lista</button>
                            </span>
                        </div>
                        <div className={styles["botoes"]}>
                            <button id={styles["buttonSaida"]} onClick={finalizar}>Finalizar</button>
                        
                        </div>
                    </div> */}
            </div>
        </div>
    );
}

export default Saida;
