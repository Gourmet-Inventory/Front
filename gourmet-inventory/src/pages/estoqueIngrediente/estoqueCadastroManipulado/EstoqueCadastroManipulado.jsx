import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import styles from "./EstoqueCadastroManipulado.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../../api";
const EstoqueCadastroManipulado = () => {
    const [formData, setFormData] = useState({
        lote: '',
        nome: '',
        categoria: '',
        tipoMedida: '',
        unidades: 0,
        valorMedida: 0.0,
        localArmazenamento: '',
        dtaCadastro: '',
        dtaAviso: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        const dtaCadastro = new Date(formData.dtaCadastro).toISOString().split('T')[0];
        const dtaAviso = new Date(formData.dtaAviso).toISOString().split('T')[0];

        const dataToSubmit = {
            ...formData,
            dtaCadastro,
            dtaAviso
        };

        api.post(`/estoque-ingrediente/${localStorage.empresaId}`,{
          headers: { 'Authorization': `Bearer ${localStorage.token}`}
        }, dataToSubmit)
            .then(response => {
                console.log('Dados enviados com sucesso:', response.data);
            })
            .catch(error => {
              toast.error("Item não cadastrado, algo deu inválido!")
                console.error('Erro ao enviar dados:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Lote:</label>
                <input type="text" name="lote" value={formData.lote} onChange={handleChange} />
            </div>
            <div>
                <label>Nome:</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
            </div>
            <div>
                <label>Categoria:</label>
                <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} />
            </div>
            <div>
                <label>Tipo Medida:</label>
                <input type="text" name="tipoMedida" value={formData.tipoMedida} onChange={handleChange} />
            </div>
            <div>
                <label>Unidades:</label>
                <input type="number" name="unidades" value={formData.unidades} onChange={handleChange} />
            </div>
            <div>
                <label>Valor Medida:</label>
                <input type="number" name="valorMedida" value={formData.valorMedida} step="0.01" onChange={handleChange} />
            </div>
            <div>
                <label>Local Armazenamento:</label>
                <input type="text" name="localArmazenamento" value={formData.localArmazenamento} onChange={handleChange} />
            </div>
            <div>
                <label>Data Cadastro:</label>
                <input type="date" name="dtaCadastro" value={formData.dtaCadastro} onChange={handleChange} />
            </div>
            <div>
                <label>Data Aviso:</label>
                <input type="date" name="dtaAviso" value={formData.dtaAviso} onChange={handleChange} />
            </div>
            <button onClick={()=>handleSubmit} type="submit">Salvar</button>
        </form>
    );
};
export default EstoqueCadastroManipulado;