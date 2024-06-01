import React, { useEffect, useState } from "react";
import BarraPesquisa from "../../components/barraPesquisa/barraPesquisa";
import ImgConfig from "../../components/imgConfig/ImgConfig";
import CardFornecedor from "../../components/cardFornecedor/cardFornecedor";
import styles from "./pagFornecedor.module.css";
import ModalCadastro from "../../components/modalCadastroForn/ModalCadastro";
import ModalVizualizar from "../../components/modalVizualizarForn/ModalVizualizarForn"
import { toast } from 'react-toastify';

function PagFornecedor () {
    const[openCadastro, setOpenCadastro] = useState(false);
    const[openVizualizar, setOpenVizualizar] = useState(false);

    return (
        <>  
        <div className={styles["body"]}>
            <div className={styles["cabecalho"]}>
            <BarraPesquisa tituloPag={"Fornecedor"}/>
            <button onClick={() => setOpenCadastro(true)}>Cadastrar Fornecedor</button>
            </div>
            <ImgConfig/>

            <div className={styles["form"]}>
                <div className={styles["tituloForm"]}>
                    <span>Nome</span>
                    <span>Categoria</span>
                    <span>Telefone</span>
                </div>
                <div className={styles["tabelaForn"]} onClick={() => setOpenVizualizar(true)}>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                    
                                <tr>
                                    <td>Luiz fernando</td>
                                    <td>Salesforce</td>
                                    <td>40028922</td>
                                    {/* <td><button className={styles.editar} onClick={() => toggleModal(empresa)}>Ver Mais</button></td>
                                    <td><button className={styles.editar}>Editar</button></td>
                                    <td><button className={styles.excluir} onClick={() => handleExcluir(empresa.idEmpresa)}>Excluir</button></td> */}
                                </tr>
                          
                        </tbody>
                    </table>
                </div>
                
            </div>


            <ModalCadastro isOpen={openCadastro} setModalOpen={() => setOpenCadastro(!openCadastro)}>
                {/* children */}
                <div className={styles["cadastro"]}>
                <h3>Cadastrar Fornecedor</h3>
                        <div className={styles["inputCadastro"]}>
                            <div className={styles["input"]}>
                                <span>Nome</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Logradouro</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Numeração</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Telefone</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Categoria</span>
                                <input type="text" />
                            </div>
                        </div>
                        <button>Cadastrar</button>
                    </div>
           </ModalCadastro>

           <ModalVizualizar  isOpen={openVizualizar} setModalOpen={() => setOpenVizualizar(!openVizualizar)}>
                {/* children */}
                {/* <div className={styles["cadastro"]}>
                <h3>Cadastrar Fornecedor</h3>
                        <div className={styles["inputCadastro"]}>
                            <div className={styles["input"]}>
                                <span>Nome</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Logradouro</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Numeração</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Telefone</span>
                                <input type="text" />
                            </div>
                            <div className={styles["input"]}>
                                <span>Categoria</span>
                                <input type="text" />
                            </div>
                        </div>
                        <button>Cadastrar</button>
                    </div> */}
            </ModalVizualizar>

        </div>
        </>
    )
};

export default PagFornecedor;