import React, { useState } from 'react';
import styles from '../cadastroempresa/Cadastro.module.css';
import imgLogo from '../../utils/assets/Possíveis Paletas (5) 1.svg'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { toast } from 'react-toastify';

const Cadastro = () => {
    const navigate = useNavigate();
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [responsavelId, setResponsavelId] = useState('');


    const handleSubmit = () => {
        const empresaAdd = {
            nomeFantasia,
            cnpj,
            telefone,
            responsavelId
        };
        console.log('Dados enviados:', { nomeFantasia, cnpj, telefone, responsavelId });

        api.post('/empresas',{
            nomeFantasia,
            cnpj,
            telefone,
            responsavelId
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
        <div className={styles['cadastro-container']}><nav>
        <div className={styles.imgEmpresa}>
            <img src={imgLogo} alt="Logo" /> 
            <span>BACKOFFICE</span>
        </div>
    </nav>
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
                <div className={styles['form-group']}>
                    <label htmlFor="responsavelId">ID do Responsável:</label>
                    <input
                        type="text"
                        id="responsavelId"
                        value={responsavelId}
                        onChange={(e) => handleInputChange(e, setResponsavelId)}
                    />
                </div>
                <button onClick={handleSubmit}>Cadastrar</button>
                <button onClick={handleBack}>Cancelar</button>
            </form>
        </div>
    );
};

export default Cadastro;
