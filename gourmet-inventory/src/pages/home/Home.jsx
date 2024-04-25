import React from "react";
import styles from "./Home.module.css";
import logo from "../../utils/assets/Possíveis Paletas (5) 1.svg";
import NavBar from "../../components/navbar/NavBar";

const Home = () => {
    return (
    <>
        <NavBar logoInicio={logo} />


        <div className={styles["titulo"]}>
            <h1>
                Deixe a música <span> sair da caixa</span>
            </h1>

        </div>

    </>
);
};
export default Home;