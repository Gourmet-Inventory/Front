import React from "react";
import styles from "./ModalMes.module.css";
import fechar from "../../utils/assets/Fechar.svg";
import api from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalMes = ({ isOpen, setModalOpen, endpoint }) => {
    if (!isOpen) return null;

    const handleExtract = async () => {
        const select = document.getElementById("mesExtracao");
        const mes = select.value;

        if (!mes) {
            toast.error("Por favor, selecione um mês.");
            return;
        }

        console.log('Endpoint:', endpoint); // Log the endpoint
        try {
            const response = await api.get(`/relatorio${endpoint}/${localStorage.empresaId}?mes=${mes}`, {
                headers: { 'Authorization': `Bearer ${localStorage.token}` },
                responseType: 'arraybuffer' 
            });

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'estoques.csv');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);

                toast.success("Relatório gerado com sucesso!");
            } else {
                toast.error("Erro ao gerar relatório.");
            }
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            toast.error("Erro ao gerar relatório.");
        }
    };

    return (
        <div className={styles.form}>
            <div className={styles.modal}>
                <div className={styles["imgModal"]}>
                    <img src={fechar} onClick={setModalOpen} alt="Fechar" />
                </div>
                <div className={styles["corpoModal"]}>
                    <span>Selecione o mês no qual deseja extrair:</span>
                    <select id="mesExtracao">
                        <option value="">Selecione o mês</option>
                        <option value="1">JANEIRO</option>
                        <option value="2">FEVEREIRO</option>
                        <option value="3">MARÇO</option>
                        <option value="4">ABRIL</option>
                        <option value="5">MAIO</option>
                        <option value="6">JUNHO</option>
                        <option value="7">JULHO</option>
                        <option value="8">AGOSTO</option>
                        <option value="9">SETEMBRO</option>
                        <option value="10">OUTUBRO</option>
                        <option value="11">NOVEMBRO</option>
                        <option value="12">DEZEMBRO</option>
                    </select>
                    <button onClick={handleExtract}>EXTRAIR</button>
                </div>
            </div>
        </div>
    );
};

export default ModalMes;
