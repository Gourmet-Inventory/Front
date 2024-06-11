import React, { useState } from "react";
import styles from "./CardIngrediente.module.css";


const CardIngrediente = ({valor, medida, ingrediente, imgDeletar}) => {

    return (
        <>
            <div className={styles["card"]}>
                <span>{valor}{medida} - {ingrediente}</span>
                <img src={imgDeletar}/>
            </div>
        </>
    );
};

export default CardIngrediente;
