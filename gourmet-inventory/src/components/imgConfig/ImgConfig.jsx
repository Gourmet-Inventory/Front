import React from "react";
import styles from "./ImgConfig.module.css";
import imgSaida from "../../utils/assets/saida.svg";
import imgFunc from "../../utils/assets/funcionario.svg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImgConfig = () => {
    const navigate = useNavigate();

    const handleFunc = () => {
        navigate("/gourmet-inventory/funcionarios"); // Ajuste o caminho conforme necessário
    };

    const handleExit = () => {
        localStorage.clear()
        navigate("/login"); 
    };

    const confirmExit = () => {
        const onConfirm = () => {
            handleExit();
            toast.dismiss();
        };

        const onCancel = () => {
            toast.dismiss();
        };

        toast(
            <div>
                Tem certeza de que deseja sair da Gourmet Inventory?
                <div>
                    <button onClick={onConfirm} id={styles["excluirSim"]}>Sim</button>
                    <button onClick={onCancel} id={styles["excluirNao"]}>Não</button>
                </div>
            </div>, 
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false
            }
        );
    };

    return (
        <>
            <div className={styles["imgConfig"]}>
                <img src={imgFunc} onClick={handleFunc} />
                <img src={imgSaida} onClick={confirmExit} />
            </div>
            <ToastContainer />
        </>
    );
};

export default ImgConfig;
