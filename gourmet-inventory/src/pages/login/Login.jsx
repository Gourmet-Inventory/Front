import React from "react";
import styles from "./Login.module.css";
import imgBack from "../../utils/assets/francisco-suarez-0EkWTSFXwCc-unsplash 1 (1).svg"

const Login = () => {
    return (
        <>
           <div className={styles["bodyLogin"]}>
                <img src={imgBack}/>
                <div className={styles["bannerLogin"]}>
                    <span>Faça login para acessar sua conta</span>
                </div>
                
                <div className={styles["form"]}>
                    <h1>Entrar</h1>
                    <div className={styles["dadosForm"]}>

                        <div className={styles["inputForm"]}>
                            <span>E-mail:</span>
                            <input type="text" />
                            <span className={styles["senhaInput"]}>Senha:</span>
                            <input type="text" />
                        </div>

                        <div className={styles["buttonForm"]}>

                            <a href="">Recuperar Senha</a>

                            <button>Confirm</button>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
};

export default Login;

