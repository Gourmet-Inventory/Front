import React , { useState } from "react";
import styles from "./Login.module.css";
import imgBack from "../../utils/assets/francisco-suarez-0EkWTSFXwCc-unsplash 1 (1).svg"
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSave = async () => {
        try {
            const response = await api.post('/usuarios/login', {email,senha});
            const token = response.data.token;
            const idUsuario = response.data.idUsuario;
            const nome = response.data.nome;
            const cargo = response.data.cargo;
            const empresaNome = response.data.empresa.nomeFantasia;
            const empresaId = response.data.empresa.idEmpresa;

            localStorage.setItem('token', token);
            localStorage.setItem('idUsuario', idUsuario);
            localStorage.setItem('email', email);
            localStorage.setItem('nome', nome);
            localStorage.setItem('cargo', cargo);
            localStorage.setItem('empresaNome', empresaNome);
            localStorage.setItem('idEmpresa', empresaId);


            navigate('/gourmet-inventory/menu');
        } catch (error) {
            toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    };


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
                            <input className={styles["inputs"]} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <span className={styles["senhaInput"]}>Senha:</span>
                            <input className={styles["inputs"]} type="password"  value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        </div>

                        <div className={styles["buttonForm"]}>

                            <a href="">Recuperar Senha</a>

                            <button onClick={handleSave}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
};

export default Login;

