import React, { useState } from "react";
import styles from "./LoginBackOffice.module.css";
import imgBack from "../../utils/assets/francisco-suarez-0EkWTSFXwCc-unsplash 1 (1).svg";
import api from "../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function LoginBackOffice() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSave = async () => {
        try {
            const response = await api.post('/usuarios/login', {email,senha});
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            navigate('/empresas');
        } catch (error) {
            toast.error('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    };

    return (
        <>
            <div className={styles.bodyLogin}>
                <img src={imgBack} alt="Background" />
                <div className={styles.bannerLogin}>
                    <span>BackOffice - Cadastro Empresas</span>
                </div>
                <div className={styles.form}>
                    <h1>Entrar</h1>
                    <div className={styles.dadosForm}>
                        <div className={styles.inputForm}>
                            <span>E-mail:</span>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <span className={styles.senhaInput}>Senha:</span>
                            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div className={styles.buttonForm}>
                            <a href="/recuperar-senha">Recuperar Senha</a>
                            <button onClick={handleSave}>Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginBackOffice;
