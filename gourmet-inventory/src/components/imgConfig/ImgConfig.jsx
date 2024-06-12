import React, { useEffect, useState } from "react";
import styles from "./ImgConfig.module.css";
import imgConfig from "../../utils/assets/config.svg"
import imgFunc from "../../utils/assets/funcionario.svg"
import { useNavigate } from "react-router-dom";

const ImgConfig = () => {
    const navigate = useNavigate();

    const handleFunc = () => {
        navigate("/gourmet-inventory/funcionarios"); // Ajuste o caminho conforme necessário
    };

    return (
        <>
           <div className={styles["imgConfig"]}>
            <img src={imgFunc} onClick={handleFunc}/>
            <img src={imgConfig}/>
           </div>
        </>
    )
};

export default ImgConfig;