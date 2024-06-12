import React from "react";
import styles from "./CardEstoque.module.css";

const CardEstoque = ({
    nome, categoria,dtAviso,valorTotal,manipulado, onOpenModal
}) =>{
    return (
        <div className={styles['main-container']}>
        <div className={styles['rectangle']} >
            <p className={styles['molho-de-tomate-2']}>
              {nome}
            </p>
            <p className={styles['categoria-molhos']}>Categoria: {categoria}</p>
          </div>
          <div className={styles['dados']}>
            <p className={styles['titulo']}>Data de Aviso</p>
            <p className={styles['aviso']}> {dtAviso}</p>
            <p className={styles['titulo']}>Quantidade</p>
            <p className={styles['aviso']}>{valorTotal}</p>
          <button onClick={onOpenModal} className={styles['Button']}>Ver Mais</button>
          </div>
          </div>
      );
};
export default CardEstoque; 