import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./Estoque.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import CardEstoque from "../../../components/cardEstoque/CardEstoque";
import ModalAlertas from "../../../components/modalAlertas/modalAlertas"
import api from "../../../api"
import fechar from "../../../utils/assets/Fechar.svg"

const   Estoque = () => {
    const [cardsEstoqueData, sercardsEstoqueData] = useState();
    const navigate = useNavigate();
    const [openVizualizar, setOpenVizualizar] = useState(false);

    function recuperarValorCard(){
        api.get(`/estoque-ingrediente/${localStorage.empresaId}`,{
            headers: { 'Authorization': `Bearer ${localStorage.token}`}
        }).then((response) => {
            console.log(response)
            const {data} = response;
            sercardsEstoqueData(data)
        }).catch(() => {
            toast.error("Erro ao buscar estoque!")
        })
    }
    useEffect(()=>{
        recuperarValorCard()
    },[])
    return (
        < >
        <MenuLateral/>
            <div className={styles["cabecalho"]}>
            <BarraPesquisa tituloPag={"Estoque"}/>
            <ImgConfig/>
            <button onClick={()=> navigate('/gourmet-inventory/estoque-cadastro-manipulado')} >Cadastrar Novo Item</button>
            </div>
            <div className={styles["area"]}>
            <div className={styles["card"]}>
                {cardsEstoqueData && cardsEstoqueData.map((data,index) => (
                    <CardEstoque
                    key={data.idItem}
                    nome={data.nome}
                    categoria={data.categoria}
                    dtAviso={data.dtaAviso}
                    valorTotal={data.valorTotal}
                    manipulado={data.manipulado}
                    onOpenModal = {() => setOpenVizualizar(data)} 
                    />
                ))}
            <CardEstoque nome="molho de tomate" categoria="molho" dtAviso="012323" valorTotal="300gr"/>
    
                    </div> 
            </div>
            <ModalAlertas isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)}>
                            {/* tipo modal 1 */}
                            <div className={styles["tituloModal"]}>
                                {}
                                <div className={styles["tituloIngrediente"]}>
                                    <span id={styles["titulo"]}>{}</span>
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

        </>
    )
};

export default Estoque;