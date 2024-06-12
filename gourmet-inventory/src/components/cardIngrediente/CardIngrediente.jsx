import React from "react";
import styles from "./CardIngrediente.module.css";

const CardIngrediente = ({ id, valor, medida, ingrediente, imgDeletar, onDelete }) => {

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className={styles["card"]}>
            <span>{valor} {medida} - {ingrediente}</span>
            <img src={imgDeletar} alt="Delete" onClick={handleDelete} className={styles["delete-icon"]} />
        </div>
    );
};

export default CardIngrediente;

