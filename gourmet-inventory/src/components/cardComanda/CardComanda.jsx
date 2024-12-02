import React, { useState } from "react";
import styles from "./CardComanda.module.css";
import api from "../../api";
import { toast } from "react-toastify";

const CardComanda = ({ idComanda, titulo, mesa, pratos, status }) => {
  const [exibirTodos, setExibirTodos] = useState(false); // Estado para alternar entre "Ver Mais" e "Mostrar Menos"

  const contarPratos = (pratos = []) => {
    return pratos.reduce((acc, prato) => {
      acc[prato.idPrato] = acc[prato.idPrato]
        ? { ...prato, count: acc[prato.idPrato].count + 1 }
        : { ...prato, count: 1 };
      return acc;
    }, {});
  };

  const entregarComanda = async () => {
    try {
      const comandaData = { idComanda, pratos };
      const response = await api.put(
        `/api/comandas/mudarStatusWeb/${idComanda}`,
        comandaData,
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      );
      console.log("Resposta API:", response.data);
      toast.success("Comanda entregue com sucesso!");
    } catch (error) {
      console.error("Erro ao entregar a comanda:", error);
      toast.error("Erro ao entregar a comanda.");
    }
  };

  const pratosAgrupados = contarPratos(pratos);

  // Converte os pratos agrupados em uma lista
  const pratosAgrupadosLista = Object.values(pratosAgrupados);

  // Define os pratos que serão exibidos (limite de 5 se exibirTodos for false)
  const pratosExibidos = exibirTodos
    ? pratosAgrupadosLista
    : pratosAgrupadosLista.slice(0, 5);

  return (
    <div className={styles["mainContainer"]}>
      <div className={styles["rectangle"]}>
        <span className={styles["titulo"]}>{titulo}</span>
        <span className={styles["mesa"]}>Mesa: {mesa}</span>
      </div>
      <div className={styles["pratosList"]}>
        {pratosExibidos.map((prato) => (
          <div key={prato.idPrato} className={styles["pratoItem"]}>
            <span>{prato.count} x </span>
            <span>{prato.nome}</span>
          </div>
        ))}
        {/* Botão "Ver Mais" aparece apenas se houver mais de 5 pratos e ainda não estiver mostrando todos */}
        {pratosAgrupadosLista.length > 5 && !exibirTodos && (
          <button
            onClick={() => setExibirTodos(true)}
            className={styles["botaoVerMais"]}
          >
            Ver mais
          </button>
        )}
        {exibirTodos && (
          <button
            onClick={() => setExibirTodos(false)}
            className={styles["botaoVerMenos"]}>
            Mostrar Menos
          </button>
        )}
        <button className={styles["botaoEntregar"]} onClick={entregarComanda}>
          Entregar
        </button>
      </div>
    </div>
  );
};

export default CardComanda;
