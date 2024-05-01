import React from "react";
import styles from "./Home.module.css";
import logo from "../../utils/assets/Possíveis Paletas (5) 1.svg";
import NavBar from "../../components/navbar/NavBar";
import imgValores1 from "../../utils/assets/Group 164.svg"
import imgValores2 from "../../utils/assets/Group 165.svg"
import imgValores3 from "../../utils/assets/Component 43.svg" 
import imgContato from "../../utils/assets/Device.svg"

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

                <div className={styles["textoValores"]}>
                    <p>Foco na qualidade não só nos seus ingredientes, mas também na sua experiência.</p>
                    <p>Ajudar na sua organização é nosso principal objetivo! </p>
                    <p>Queremos que você cuide do seu sistema de forma prática e rápida!</p>
                </div>
                

            </div>

            <div className={styles["linha"]}></div>

            <div className={styles["conhecaEquipe"]}>

                <div className={styles["equipeTitulo"]}>
                    <h1>CONHEÇA NOSSA EQUIPE</h1>

                    <p>Somos uma equipe dedicada ao serviço excepcional. Cada membro da nossa equipe traz consigo talento, 
                        paixão e comprometimento para oferecer ótimas experiências aos nossos clientes.</p>

                </div>

                <div className={styles["nomeEquipe"]}>
                    <div className={styles["nomeLinha1"]}>
                        <span>Julya Aiko</span>
                        <span>Kevin Wesselka</span>
                        <span>Luan Magno</span>
                    </div>

                    <div className={styles["nomeLinha2"]}>
                        <span>Mirella Ot</span>
                        <span>Sarah Vitória</span>
                        <span>Peterson Maranho</span>
                    </div>
                </div>

            </div>

            <div className={styles["linha"]}></div>

            <div className={styles["contato"]}>
                <div className={styles["tituloContato"]}>
                    <h1>CONTATO</h1>
                    <span>Interessado? Dúvidas? Estamos a sua disposição!</span>
                </div>

                <div className={styles["corpoContato"]}>
                    <img src={imgContato} />
                    <div className={styles["formContato"]}>
                        <span>Preencha os dados abaixo e aguarde nosso e-mail!</span>

                        <div className={styles["dadosForm"]}>
                        <p>Nome</p>
                        <input type="text" />
                        <p>Nome Empresa</p>
                        <input type="text" />
                        <p>E-mail</p>
                        <input type="text" />
                        <button>Enviar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        

    </> 
);
};
export default Home;