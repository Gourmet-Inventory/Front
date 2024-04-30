import React from "react";
import styles from "./Home.module.css";
import logo from "../../utils/assets/Possíveis Paletas (5) 1.svg";
import NavBar from "../../components/navbar/NavBar";
import imgValores1 from "../../utils/assets/Valor 1.svg"
import imgValores2 from "../../utils/assets/Valor 2.svg"
import imgValores3 from "../../utils/assets/Valor 3.svg" 

const Home = () => {
    return (
    <>
        <NavBar logoInicio={logo} />
        <div className = {styles["home"]}>     

            <div className={styles["logo"]}>
                <div className={styles["banner"]}></div>
            </div>

            <div className={styles["tituloRodape"]}>
                <h1>O seu novo ajudante na organização!</h1>

                <div className={styles["textoRodape"]}>
                    <p>Em um mundo onde a eficiência e precisão são a chave, o <span>Gourmet Inventory</span> surge como solução para gerenciar seu estoque. </p>

                    <p><span>Projetado para simplificar e otimizar o controle de estoque</span>, nosso software combina funcionalidades intuitivas com algoritmos
                    de análise, <span>garantindo que você tenha sempre a informação ce rta ao seu alcance.</span></p>
                 </div>

            </div>

            <div className={styles["linha"]}></div>

            <div className={styles["valores"]}>

                <div className={styles["valoresTitulo"]}>
                    <h1>VALORES</h1>
                    <p>Estes valores nos unem e nos guiam em nossa jornada. Eles refletem em quem somos e quem aspiramos ser, não apenas como equipe, mas como parte da comunidade.</p>
                </div>

                <div className={styles["cardsTitulo"]}>

                    <h1 className={styles["tituloQual"]}>QUALIDADE</h1>
                    <h1 className={styles["tituloOrg"]}>ORGANIZAÇÃO</h1>
                    <h1 className={styles["tituloPrat"]}>PRATICIDADE</h1>

                </div>

                <div className={styles["imgValores"]}>
                    <img src={imgValores1} />
                    <img src={imgValores2} />
                    <img src={imgValores3} />
                </div>
                

            </div>

        </div>
        

    </> 
);
};
export default Home;