import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import styles from "./EstoqueCadastroManipulado.module.css";
import { useNavigate } from "react-router-dom";

const EstoqueCadastroManipulado = () => {
    const navigate = useNavigate();
    return (
        <div className={styles['main-container']}>
        <div className={styles['titulo']}>
        <button onClick={()=> navigate('/gourmet-inventory/estoque') } className={styles['botao']}>Voltar</button>
          <p className={styles['cadastrar-item-manipulado']}>
            Cadastrar Item Manipulado
          </p>
          
        </div>
        <div className={styles['flex-row']}>
          <span className={styles['ingredientes']}>Ingredientes</span>
          <div className={styles['rectangle']}>
            <span className={styles['lot']}>Lote:</span>
            <input className={styles['frame']} />
            <div className={styles['datas']}>
            <span className={styles['production-date']}>Data de Produção:</span>
            <input className={styles['frame']}/>
            <span className={styles['expiration-date']}>Data de Validade:</span>
            <input type="date" className={styles['frame']} />
            </div>
            <span className={styles['total-quantity']}>Quantidade Total:</span>
            <div className={styles['frame']} />
            <span className='tipo-medida'>Tipo Medida:</span>
            <div className={styles['flex-row-bee']}>
              <div className={styles['frame-4']} />
              <button className={styles['frame-5']}>
                <div className={styles['frame-6']}>
                  <div className={styles['group']} />
                </div>
              </button>
            </div>
            <span className={styles['local-armazenamento']}>Local de armazenamento:</span>
            <div className={styles['frame-7']} />
          </div>
          <div className={styles['frame-8']} />
          <span className={styles['valor-medida']}>
            Valor <br />
            Medida:
          </span>
          <span className={styles['tipo-medida-9']}>
            Tipo <br />
            Medida:
          </span>
          <div className={styles['frame-a']} />
          <div className={styles['frame-b']}>
            <div className={styles['frame-c']}>
              <div className={styles['group-d']} />
            </div>
          </div>
          <button className={styles['button']}>
            <span className={styles['add-item']}>+</span>
          </button>
          <span className={styles['number']}>100</span>
          <div className={styles['frame-e']} />
          <button className={styles['button-f']}>
            <span className={styles['add-item-10']}>Cadastrar</span>
          </button>
        </div>
        <button className={styles['rectangle-11']} />
      </div>
    );
};

export default EstoqueCadastroManipulado;