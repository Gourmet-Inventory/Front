import React, { useEffect, useState } from 'react';
import styles from "./Empresa.module.css";
import imgLogo from "../../utils/assets/Possíveis Paletas (5) 1.svg"
import api from '../../api';
import { toast } from 'react-toastify';

const Empresa = () => {
    const [empresas, setEmpresas] = useState([]);


    function recuperarEmpresas() {

            api.get('/empresas',{
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                  }
            }).then((response)=>{
                console.log(response)
                const {data} = response;
                setEmpresas(data)
             }).catch(() => {
                toast.error("Erro ao recuperar as empresas!");
             })
    };

    const handleExcluir = (idEmpresa) => {
        if (window.confirm("Tem certeza de que deseja excluir esta empresa?")) {
            try {
                api.delete(`/empresas/${idEmpresa}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                }).then(() => {
                    recuperarEmpresas();
                    toast.success("Empresa excluída com sucesso!");
                }).catch(() => {
                    toast.error("Erro ao excluir a empresa.");
                });
            } catch (error) {
                console.error("Erro ao excluir a empresa:", error);
            }
        }
    };

    const handleEditar = (idEmpresa) => {
            try {
                api.patch(`/empresas/${idEmpresa}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    }
                }).then(() => {

                    recuperarEmpresas();
                    toast.success("Empresa atualizada com sucesso!");
                }).catch(() => {
                    toast.error("Erro ao excluir a empresa.");
                });
            } catch (error) {
                console.error("Erro ao excluir a empresa:", error);
        }
    };
    

    useEffect(() => {
        recuperarEmpresas();
    },[])

    return (
        <div className={styles.empresa}>
            <nav>
                <div className={styles.imgEmpresa}>
                    <img src={imgLogo} alt="Logo" /> 
                    <span>BACKOFFICE</span>
                </div>
            </nav>

            <div className={styles.formEmpresa}>
                <span>Clientes</span>
                <table>
                    <thead>
                        <tr>
                            <th>Id Empresa</th>
                            <th>Nome Empresa</th>
                            <th>Nome Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empresas.map((empresa) => (
                            <tr key={empresa.idEmpresa}>
                                <td>{empresa.idEmpresa}</td>
                                <td>{empresa.cnpj}</td>
                                <td>{empresa.responsavel.nome}</td>
                                <td><button>Editar</button></td>
                                <td><button className='style["excluir"]' onClick={() => handleExcluir(empresa.idEmpresa)}>Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Empresa;
