import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import Alert from "../../components/alert/alert";
import diaChecagem from "../../utils/assets/Alerta data de verificar.svg";
import itemAcabando from "../../utils/assets/Alerta Item Acabando.svg";
import itemAcabandoBranco from "../../utils/assets/Alerta Item Acabando Branco.svg";
import dataProxima from "../../utils/assets/Alerta data próxima.svg";
import itemVazio from "../../utils/assets/Alerta Item Vazio.svg";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { toast } from "react-toastify";

const Menu = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [alertas, setAlertas] = useState([]);
  const [shownMessages, setShownMessages] = useState(new Set());

  useEffect(() => {
    const nomeGuardado = localStorage.getItem('empresaNome');
    if (nomeGuardado) {
      setNome(nomeGuardado);
    }
  }, []);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await api.get(`/alerta/${localStorage.empresaId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.token}` }
        });

        if (Array.isArray(response.data)) {
          // Ordenar alertas por data e pegar os 4 mais recentes
          const sortedAlertas = response.data.sort((a, b) => new Date(b.estoqueIngrediente.dtaAviso) - new Date(a.estoqueIngrediente.dtaAviso));
          const recentAlertas = sortedAlertas.slice(0, 4);
          setAlertas(recentAlertas);
          
          if (!shownMessages.has("Alertas carregados com sucesso!")) {
            setShownMessages(prev => new Set(prev).add("Alertas carregados com sucesso!"));
          }
        } else {
          console.error('A resposta da API não é um array:', response.data);
          setAlertas([]);
          if (!shownMessages.has("Erro ao carregar alertas.")) {
            setShownMessages(prev => new Set(prev).add("Erro ao carregar alertas."));
          }
        }
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
        setAlertas([]);
        if (!shownMessages.has("Erro ao buscar alertas.")) {
          setShownMessages(prev => new Set(prev).add("Erro ao buscar alertas.")); 
        }
      }
    };

    fetchAlertas();
    const intervalId = setInterval(fetchAlertas, 10000);

    return () => clearInterval(intervalId);
  }, [shownMessages]);

  const getAlertaImage = (tipoAlerta) => {
    switch (tipoAlerta) {
      case 'Dia de Checagem':
        return diaChecagem;
      case 'Estoque acabando':
        return itemAcabandoBranco;
      case 'Data Proxima':
        return dataProxima;
      case 'Estoque vazio':
        return itemVazio;
      default:
        return diaChecagem;
    }
  };

  const handleAlertClick = () => {
    navigate('/gourmet-inventory/alertas');
  };

  return (
    <>
      <ImgConfig />
      <div className={styles["form"]}>
        <ImgConfig />
        <h1>Bem vindo ao estoque de {nome}</h1>
        <div className={styles["box"]}>
          <div className={styles["menus"]}>
            <div className={styles["menu"]}>
              <button onClick={() => navigate('/gourmet-inventory/estoque')}>Estoque</button>
              <button onClick={() => navigate('/gourmet-inventory/alertas')}>Histórico Alertas</button>
              <button onClick={() => navigate('/gourmet-inventory/relatorios')}>Relatórios</button>
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
              {alertas.map((alerta, index) => (
                <Alert 
                  key={index} 
                  imgAlerta={getAlertaImage(alerta.tipoAlerta)} 
                  ingrediente={alerta.estoqueIngrediente.nome} 
                  onClick={handleAlertClick}
                />
              ))}
            </div>
            <div className={styles["legendaAlertas"]}>
              <p>Legenda Alertas</p>
              <div className={styles["imgLinha1"]}>
                <img src={diaChecagem} />
                <img src={dataProxima} />
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
