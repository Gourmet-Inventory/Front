import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import Alert from "../../components/alert/alert"
import diaChecagem from "../../utils/assets/Alerta data de verificar.svg"
import itemAcabando from "../../utils/assets/Alerta Item Acabando.svg"
import dataProxima from "../../utils/assets/Alerta data próxima.svg"
import itemVazio from "../../utils/assets/Alerta Item Vazio.svg"
import ItemAcabandoBranco from "../../utils/assets/Alerta Item Acabando Branco.svg"
import { useNavigate } from "react-router-dom";


const Menu = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');

  useEffect(() => {
     const nomeGuardado = localStorage.getItem('empresaNome');
      if(nomeGuardado){
          setNome(nomeGuardado)
      }
  }, []);

  return (  
    <>
      <ImgConfig />
      <div className={styles["form"]}>
        <ImgConfig />

          <h1>Bem vindo ao estoque de {nome}</h1>
          <div className={styles["box"]}>
            <div className={styles["menus"]}>
              <div className={styles["menu"]}>
                <button onClick={() => navigate('/gourmet-inventory/estoque')} >Estoque</button>
                <button onClick={() => navigate('/gourmet-inventory/alertas')}>Histórico Alertas</button>
              </div>
              <div className={styles["menu"]}>
                <button onClick={() => navigate('/gourmet-inventory/pratos')}>Pratos</button>
                <button onClick={() => navigate('/gourmet-inventory/saida-pratos')}>Saída</button>
                <button onClick={() => navigate('/gourmet-inventory/fornecedor')}>Fornecedores</button>
              </div>
          </div>
          <div className={styles["menuAvisos"]}>
            <div className={styles["alertasDisparados"]}>
                <span>Alertas de Hoje</span>
                <Alert imgAlerta={diaChecagem} ingrediente={"Feijão Cozido"} />
                <Alert imgAlerta={itemVazio} ingrediente={"Peito de Frango"} />
                <Alert imgAlerta={dataProxima} ingrediente={"Maçã"} />
                <Alert imgAlerta={ItemAcabandoBranco} ingrediente={"Farinha de Trigo"} />
            </div>
            <div className={styles["legendaAlertas"]}>
               <p>Legenda Alertas</p>
               <div className={styles["imgLinha1"]}>
                <img src={diaChecagem}/>
                <img src={dataProxima}/>
               </div>
               <div className={styles["legendaLinha1"]}>
                <span>Dia Checagem</span>
                <span>Data próxima</span>
               </div>
               <div className={styles["imgLinha2"]}>
                <img src={itemVazio} />
                <img src={itemAcabando} />
               </div>
               <div className={styles["legendaLinha2"]}>
               <span>Estoque Vazio</span>
               <span>Estoque Acabando</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
