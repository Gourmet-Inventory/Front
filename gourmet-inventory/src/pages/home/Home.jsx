import React from "react";
import styles from "./Home.module.css";
import logo from "../../utils/assets/Possíveis Paletas (5) 1.svg";
import NavBar from "../../components/navbar/NavBar";
import imgValores1 from "../../utils/assets/Group 164.svg"
import imgValores2 from "../../utils/assets/Group 165.svg"
import imgValores3 from "../../utils/assets/Component 43.svg" 
import imgContato from "../../utils/assets/Device.svg"
import imgLogo from "../../utils/assets/jonathan-borba-5E0d3lfoC1w-unsplash 1.png"
import iconLogo from "../../utils/assets/logoHome.svg"
import imgJulya from "../../utils/assets/Julya 1.svg"
import imgKevin from "../../utils/assets/Kevin 1.svg"
import imgLuan from "../../utils/assets/Luan 1.svg"
import imgMirella from "../../utils/assets/Mirella 1.svg"
import imgSarah from "../../utils/assets/Sarah 1.svg"
import imgPeterson from "../../utils/assets/Peterson 1.svg"
import imgFooter from "../../utils/assets/Frame 96.svg"

 
const Home = () => {
    return (
    <>
        <NavBar logoInicio={logo} />
        <div className = {styles["home"]}>     

            <div className={styles["logo"]} id="logo">
                
                <img src={imgLogo} />
                <div className={styles["sombra"]}>

                    <div className={styles["banner"]}>
                        <img src={iconLogo}/>
                        <span>O seu ingrediente para o estoque perfeito</span>
                    </div>

                </div>
                
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
                    <p>Ajudar na sua organização é o nosso principal objetivo! </p>
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

                <div className={styles["Equipe"]}>

                    <div className={styles["Linha1"]}>
                        <div className={styles["imgLinha1"]}>
                            <img src={imgJulya}/>
                            <img src={imgKevin}/>
                            <img src={imgLuan}/>
                        </div>

                        <div className={styles["nomeLinha1"]}>
                            <span>Julya Aiko</span>
                            <span>Kevin Wesselka</span>
                            <span>Luan Magno</span>
                        </div>
                    </div>

                    <div className={styles["Linha2"]}>
                        <div className={styles["imgLinha2"]}>
                            <img src={imgMirella}/>
                            <img src={imgSarah}/>
                            <img src={imgPeterson}/>
                        </div>

                        <div className={styles["nomeLinha2"]}>
                            <span className={styles["nomeMirella"]}>Mirella Ot</span>
                            <span className={styles["nomeSarah"]}>Sarah Vitória</span>
                            <span className={styles["nomePeterson"]}>Peterson Maranho</span>
                        </div>
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
                        <p>Nome Completo:</p>
                        <input type="text" />
                        <p>E-mail:</p>
                        <input type="text" />
                        <p>Telefone:</p>
                        <input type="text" />
                        <p>Nome Empresa:</p>
                        <input type="text" />
                        </div>  
                        <button>Enviar</button>
                        
                    </div>
                </div>
            </div>

            <footer>
                <div className={styles["imgFooter"]}>
                    <img src={imgFooter} />
                </div>
                <span>Gourmet Inventory©</span>
            </footer>

        </div>
        

    </> 
);
};
export default Home;