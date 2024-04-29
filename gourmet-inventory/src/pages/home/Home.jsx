import React from "react";
import styles from "./Home.module.css";
import logo from "../../utils/assets/Possíveis Paletas (5) 1.svg";
import NavBar from "../../components/navbar/NavBar";

const Home = () => {
    return (
    <>
        <NavBar logoInicio={logo} />
        <div className = {styles["home"]}>     

            <div className={styles["logo"]}>
                <span>Logo</span>
            </div>

            <div className={styles["tituloRodape"]}>
                <h1>O seu novo ajudante na organização!</h1>

                <div className={styles["textoRodape"]}>
                    <p>Em um mundo onde a eficiência e precisão são a chave, o <span>Gourmet Invetory</span> surge como solução para gerenciar seu estoque. </p>

                    <p><span>Projetado para simplificar e otimizar o controle de estoque</span>, nosso software combina funcionalidades intuitivas com algoritmos
                    de análise, <span>garantindo que você tenha sempre a informação ce rta ao seu alcance.</span></p>
                 </div>

            </div>

            <div className={styles["linha"]}></div>

            <div className={styles["valores"]}>

                <div className={styles["valoresTitulo"]}>
                    <h1>VALORES</h1>
                    <p>Estes valores nos unem e guiam nossa jornada. Eles refletem quem somos e aspiramos ser, não apenas como equipe, mas como parte da comunidade.</p>
                </div>

                <div className={styles["cardsTitulo"]}>

                    <h1 className={styles["tituloQual"]}>QUALIDADE</h1>
                    <h1 className={styles["tituloOrg"]}>ORGANIZAÇÃO</h1>
                    <h1 className={styles["tituloPrat"]}>PRATICIDADE</h1>
                    
                </div>
                

            </div>

        </div>
        

    </> 
);
};
export default Home;