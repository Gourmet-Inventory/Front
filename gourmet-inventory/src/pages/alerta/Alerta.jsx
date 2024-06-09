import React, { useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import diaChecagem from "../../utils/assets/Alerta data de verificar.svg";
import ItemAcabando from "../../utils/assets/Alerta Item Acabando Branco.svg";
import dataProxima from "../../utils/assets/Alerta data próxima.svg";
import itemVazio from "../../utils/assets/Alerta Item Vazio.svg";
import styles from "./Alerta.module.css";
import { toast } from 'react-toastify';
import MenuLateral from "../../components/menuLateral/MenuLateral";
import fechar from "../../utils/assets/Fechar.svg";
import ModalAlertas from "../../components/modalAlertas/modalAlertas";

const Alerta = () => {
    const [openVizualizar, setOpenVizualizar] = useState(false);
    
    return (
        <>  
            <MenuLateral/>
            <div className={styles.body}>
                <div className={styles.cabecalho}>
                    <BarraPesquisa tituloPag={"Históricos Alertas"}/>
                </div>
                <ImgConfig/>

                <div className={styles.form}>
                    <div className={styles.tabelaForm}>
                        <div className={styles["tabelaAlertas"]}>
                            <div className={styles.tituloForm}>
                                <span>Item</span>
                                <span>Tipo de Alerta</span>
                                <span>Info</span>
                            </div>
                            <div className={styles["tabela"]}>
                                <table>
                                    <thead>
                                        <tr>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr onClick={() => setOpenVizualizar(true)}>
                                            <img src={diaChecagem} alt="Dia de Checagem"/>
                                            <td>Molho de tomate</td>
                                            <td>Dia de checagem</td>
                                            <td>16/04/2024</td>
                                            <img src={fechar} id={styles["imgfechar"]} alt="Fechar"/>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <ModalAlertas isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)}>
                            {/* tipo modal 1 */}
                            <div className={styles["tituloModal"]}>
                                <div className={styles["tituloIngrediente"]}>
                                    <span id={styles["titulo"]}>Arroz</span>
                                    <span>categoria: Grãos</span>
                                </div>
                                <img src={fechar} onClick={() => setOpenVizualizar(false)} alt="Fechar"/>
                            </div>
                            
                            <div className={styles["corpoModal"]}>
                                <div className={styles["legendaModal"]}>
                                    <div className={styles["legendasIngred"]}>
                                    <span>Lote:</span>
                                    <span>Data de Checagem:</span>
                                    <span>Quantidade Total</span>
                                    <span>Quantidade / Peso unitário:</span>
                                    <span>Medida:</span>
                                    <span>Local de armazenamento:</span>
                                    <span>Dados nutricionais:</span>
                                    </div>
                                </div>
                                <div className={styles["dadosModal"]}>
                                <div className={styles["dadosIngred"]}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                </div>
                            </div>

                            

                        </ModalAlertas >


                        <ModalAlertas>
                            
                            {/* tipo modal 2 */}

                            <div className={styles["tituloModalManipulado"]}>
                                <div className={styles["tituloIngrediente2"]}>
                                    <span id={styles["titulo2"]}>Arroz</span>
                                    <span>categoria: Grãos</span>
                                </div>
                                <img src={fechar} onClick={() => setOpenVizualizar(false)} alt="Fechar"/>
                            </div>
                            
                            <div className={styles["corpoModal2"]}>
                                <div className={styles["legendaModal2"]}>
                                    <div className={styles["legendasIngred2"]}>
                                    <span>Lote:</span>
                                    <span>Data de Validade:</span>
                                    <span>Quantidade Total</span>
                                    <span>Medida:</span>
                                    <span>Local de armazenamento:</span>
                                    <span>Ingredientes:</span>
                                    </div>
                                </div>
                                <div className={styles["dadosModal2"]}>
                                <div className={styles["dadosIngred2"]}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div className={styles["ingredientesModal"]}>

                                    </div>
                                </div>
                                </div>
                            </div>
                        

                        </ModalAlertas>

                        <div className={styles.filtrosForm}>
                            <h1>Filtros</h1>
                            <div className={styles.filtros}>
                                <div className={styles.card}>
                                    <span>Dia de Checagem</span>
                                    <div className={styles.legenda}>
                                        <img src={diaChecagem} alt="Dia de Checagem"/>
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <span>Estoque Vazio</span>
                                    <div className={styles.legenda}>
                                        <img src={itemVazio} alt="Estoque Vazio"/>
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <span>Data Próxima</span>
                                    <div className={styles.legenda}>
                                        <img src={dataProxima} alt="Data Próxima"/>
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className={styles.card}>
                                    <span>Estoque Acabando</span>
                                    <div className={styles.legenda}>
                                        <img src={ItemAcabando} alt="Estoque Acabando"/>
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Alerta;
