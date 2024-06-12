import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../../components/imgConfig/ImgConfig";
import styles from "./Estoque.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MenuLateral from "../../../components/menuLateral/MenuLateral";
import CardEstoque from "../../../components/cardEstoque/CardEstoque";
import modalAlertas from "../../../components/modalAlertas/modalAlertas"
import api from "../../../api"

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
                    onOpenModal = {() => openVizualizar(data)} 
                    />
                ))}
            <CardEstoque nome="molho de tomate" categoria="molho" dtAviso="012323" valorTotal="300gr"/>
    
                    </div> 
            </div>
            
        </>
    )
};

export default Estoque;