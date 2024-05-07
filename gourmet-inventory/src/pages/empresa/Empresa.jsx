import React, { useState } from 'react';
import styles from "./Empresa.module.css";
import imgLogo from "../../utils/assets/Possíveis Paletas (5) 1.svg"


// const Tabela = () => {
// //   // Exemplo de dados da tabela
// //   const data = [
// //     { id: 1, nome: 'Item 1', preco: 10 },
// //     { id: 2, nome: 'Item 2', preco: 20 },
// //     { id: 3, nome: 'Item 3', preco: 30 },
// //   ];

// //   // Estado para controlar a ordenação da tabela
// //   const [sortedField, setSortedField] = useState(null);
// //   const [ascending, setAscending] = useState(true);

// //   // Função para ordenar os dados com base no campo fornecido
// //   const sortData = (field) => {
// //     if (sortedField === field) {
// //       setAscending(!ascending);
// //     } else {
// //       setSortedField(field);
// //       setAscending(true);
// //     }
// //   };

// //   // Ordenação dos dados
// //   const sortedData = [...data].sort((a, b) => {
// //     if (sortedField) {
// //       if (a[sortedField] < b[sortedField]) {
// //         return ascending ? -1 : 1;
// //       }
// //       if (a[sortedField] > b[sortedField]) {
// //         return ascending ? 1 : -1;
// //       }
// //     }
// //     return 0;
// //   });

//   return (

//     <>
//     <div className={styles["empresa"]}>
// //                 <nav>
// //                     <div className={styles["imgEmpresa"]}>
// //                         <img src={imgLogo} /> 
// //                         <span>BACKOFFICE</span>
// //                     </div>
                   
// //                 </nav>

// //                 <div className={styles["formEmpresa"]}>
// //                     <span>Clientes</span>
// //                     <table>
// //                         <thead>
// //                             <tr>
// //                                 <th>Nome Usuário</th>
// //                                 <th>Nome Empresa</th>
// //                             </tr>
// //                         </thead>
// //                     </table>
// //                 </div>
// //           
//     {/* <table>
//       <thead>
//         <tr>
//           <th onClick={() => sortData('nomeUsuario')}>Nome Usuário</th>
//           <th onClick={() => sortData('nomeEmpresa')}>Nome Empresa</th>
//           <th onClick={() => sortData('acoes')}>Ações</th>
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map(item => (
//           <tr key={item.id}>
//             <td>{item.nomeUsuario}</td>
//             <td>{item.nomeEmpresa}</td>
//             <td>{item.acoes}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table> */}
//     </div>
//     </>
//   );
// };

// export default Tabela;

const Empresa = () => {
    return (
        <>
           <div className={styles["empresa"]}>
                <nav>
                    <div className={styles["imgEmpresa"]}>
                        <img src={imgLogo} /> 
                        <span>BACKOFFICE</span>
                    </div>
                   
                </nav>

                <div className={styles["formEmpresa"]}>
                    <span>Clientes</span>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome Usuário</th>
                                <th>Nome Empresa</th>

                                    {/* <button className={styles["editar"]}>Editar</button>
                                    <button className={styles["excluir"]}>Excluir</button> */}
                            </tr>
                        </thead>
                    </table>
                </div>
           </div>
        </>
    )
};

export default Empresa;
