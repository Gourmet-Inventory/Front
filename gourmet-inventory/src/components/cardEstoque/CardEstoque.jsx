import React from "react";
import styles from "./CardEstoque.module.css";

const CardEstoque = ({
    idEstoque,nome, categoria,dtAviso,valorTotal,
}) =>{
    return (
        <div className={styles['main-container']}>
          <div className={styles['data-aviso']}>
            <p className={styles['data-aviso-1']}>
              Data de Aviso
            </p>
            <span className={styles['aviso']}> {dtAviso}</span>
          </div>
          <div className={styles['quantidade-kg']}>
            <span className={styles['text-3']}>
              Quantidade
              <br />
            </span>
            <span className={styles['text-4']}>3 Kg</span>
          </div>
          <button className={styles['Button']}>
            <span className={styles['text-5']} >Ver Mais</span>
          </button>
          <div className={styles['section-2']} />
          <div className={styles['rectangle']} />
          <div className={styles['molho-de-tomate']}>
            <span className={styles['molho-de-tomate-2']}>
              Molho de tomate
              <br />
            </span>
            <span className={styles['categoria-molhos']}>Categoria: Molhos</span>
          </div>
        </div>
      );
};
export default CardEstoque;