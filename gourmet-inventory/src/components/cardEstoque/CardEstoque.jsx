import React from "react";
import styles from "./CardEstoque.module.css";

const CardEstoque = ({
    nome, categoria,dtAviso,valorTotal,
}) =>{
    return (
        <div className='main-container'>
          <div className='data-aviso'>
            <span className='data-aviso-1'>
              Data de Aviso
              <br />
            </span>
            <span className='aviso'> {dtAviso}</span>
          </div>
          <div className='quantidade-kg'>
            <span className='text-3'>
              Quantidade
              <br />
            </span>
            <span className='text-4'>3 Kg</span>
          </div>
          <button className='Button'>
            <span className='text-5'>Ver Mais</span>
          </button>
          <div className='section-2' />
          <div className='rectangle' />
          <div className='molho-de-tomate'>
            <span className='molho-de-tomate-2'>
              Molho de tomate
              <br />
            </span>
            <span className='categoria-molhos'>Categoria: Molhos</span>
          </div>
        </div>
      );
};
export default CardEstoque;