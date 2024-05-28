import React, { useEffect, useState } from "react";
import styles from "./Empresa.module.css";
import imgLogo from "../../../utils/assets/Possíveis Paletas (5) 1.svg";
import api from '../../../api';
import NavBarBack from "../../../components/navbarbackoffice/NavBarBack";
import { toast } from 'react-toastify';
import Modal from '../../../components/popup/Modal';

const Empresa = () => {
    const [empresas, setEmpresas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);

    const toggleModal = (empresa = null) => {
        setSelectedEmpresa(empresa);
        setShowModal(!showModal);
    };

    useEffect(() => {
        recuperarEmpresas();
    }, []);

    const recuperarEmpresas = () => {
        api.get('/empresas', {
            headers: { 'Authorization': `Bearer ${localStorage.token}` }
        }).then(response => {
            setEmpresas(response.data);
        }).catch(() => {
            toast.error("Erro ao recuperar as empresas!");
        });
    };

    const handleExcluir = (idEmpresa) => {
        if (window.confirm("Tem certeza de que deseja excluir esta empresa?")) {
            api.delete(`/empresas/${idEmpresa}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` }
            }).then(() => {
                recuperarEmpresas();
                toast.success("Empresa excluída com sucesso!");
            }).catch(() => {
                toast.error("Erro ao excluir a empresa.");
            });
        }
    };

    return (
        <div className={styles.empresa}>
            <NavBarBack LogoInicio={imgLogo} />
            <Modal show={showModal} handleClose={() => toggleModal()}>
                {selectedEmpresa && (
                    <div>
                        <h2>Detalhes da Empresa</h2>
                        <p>ID: {selectedEmpresa.idEmpresa}</p>
                        <p>Nome: {selectedEmpresa.nomeFantasia}</p>
                        <p>CNPJ: {selectedEmpresa.cnpj}</p>
                        <p>Telefone: {selectedEmpresa.telefone}</p>
                        <p>Responsável: {selectedEmpresa.responsavel.nome}</p>
                    </div>
                )}
            </Modal>
            <div className={styles.formEmpresa}>
                <span>Clientes</span>
                <div className={styles.divTabela}>
                    <table>
                        <thead>
                            <tr>
                                <th>Id Empresa</th>
                                <th>Nome Empresa</th>
                                <th>Responsável</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {empresas.map(empresa => (
                                <tr key={empresa.idEmpresa}>
                                    <td>{empresa.idEmpresa}</td>
                                    <td>{empresa.nomeFantasia}</td>
                                    <td>{empresa.responsavel.nome}</td>
                                    <td><button className={styles.editar} onClick={() => toggleModal(empresa)}>Ver Mais</button></td>
                                    <td><button className={styles.editar}>Editar</button></td>
                                    <td><button className={styles.excluir} onClick={() => handleExcluir(empresa.idEmpresa)}>Excluir</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Empresa;
