import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import imgLogo from '../../../utils/assets/Possíveis Paletas (5) 1.svg'
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import { toast } from 'react-toastify';
import NavBarBack from "../../../components/navbarbackoffice/NavBarBack";

const Cadastro = () => {
    const navigate = useNavigate();
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');


    const handleSubmit = () => {
        const empresaAdd = {
            nomeFantasia,
            cnpj,
            telefone
        };
        console.log('Dados enviados:', { nomeFantasia, cnpj, telefone});

        api.post('/empresas',{
            nomeFantasia,
            cnpj,
            telefone,
        },{
            headers:{
                'Authorization': `Bearer ${localStorage.token}`
            }
        }).then(() => {
            toast.success("Empresa cadastrada com sucesso!");
            navigate("/empresas")
        }).catch(() => {
            toast.error("Ocorreu um erro!")
        })
    };

    const handleInputChange = (event, setStateFunction) => {
        setStateFunction(event.target.value);}


        const handleBack = () => {
        navigate("/empresas");
        };

    return (
        <div className={styles['cadastro-container']}>
            <NavBarBack LogoInicio={imgLogo}></NavBarBack>
            <h2>Cadastro</h2>
            <form>
                <div className={styles['form-group']}>
                    <label htmlFor="nomeFantasia">Nome Fantasia:</label>
                    <input
                       type="text"
                       id="nomeFantasia"
                       value={nomeFantasia}
                       onChange={(e) => handleInputChange(e, setNomeFantasia)}
                   />
                    
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input
                        type="text"
                        id="cnpj"
                        value={cnpj}
                        onChange={(e) => handleInputChange(e, setCnpj)}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="text"
                        id="telefone"
                        value={telefone}
                        onChange={(e) => handleInputChange(e, setTelefone)}
                    />
                </div>
                <div className={styles['botoes']}>
                <button onClick={handleSubmit}>Cadastrar</button>
                <button onClick={handleBack}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default Cadastro;
