import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import LoginBackOffice from "./pages/areaBackOffice/loginbackoffice/LoginBackOffice";
import Empresa from "./pages/areaBackOffice/empresa/Empresa";
import Cadastro from "./pages/areaBackOffice/cadastroempresa/Cadastro";
import Fornecedor from "./pages/pagFornecedor/pagFornecedor";
import Alerta from "./pages/alerta/Alerta";
import Estoque from "./pages/estoqueIngrediente/estoque/Estoque";
import Funcionarios from "./pages/pagFuncionarios/PagFuncionarios"
import Pratos from "./pages/pratos/pagPratos/PagPratos"
import CadastroPratos from "./pages/pratos/cadastrarPratos/CadastrarPratos"
import Saida from "./pages/saida//Saida"
import Relatorios from "./pages/relatorios/Relatorios"
import EstoqueCadastroManipulado from "./pages/estoqueIngrediente/estoqueCadastroManipulado/EstoqueCadastroManipulado" 
   
function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element= {<Home/>}/> 
                    <Route path="/login" element= {<Login/>}/> 
                    <Route path="/login-backoffice" element= {<LoginBackOffice/>}/>
                    <Route path="/empresas" element={<Empresa/>}/>
                    <Route path="/empresas/cadastro" element= {<Cadastro/>}/>
                    <Route path="/gourmet-inventory/fornecedor" element= {<Fornecedor/>}/>
                    <Route path="/gourmet-inventory/alertas" element= {<Alerta/>}/>
                    <Route path="/gourmet-inventory/estoque" element= {<Estoque/>}/>
                    <Route path="/gourmet-inventory/funcionarios" element= {<Funcionarios/>}/>
                    <Route path="/gourmet-inventory/pratos" element= {<Pratos/>}/>
                    <Route path="/gourmet-inventory/cadastrar-pratos" element= {<CadastroPratos/>}/>
                    <Route path="/gourmet-inventory/saida-pratos" element= {<Saida/>}/>
                    <Route path="/gourmet-inventory/relatorios" element= {<Relatorios/>}/>
                    <Route path="/gourmet-inventory/cadastrar-manipulados" element={<EstoqueCadastroManipulado/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );  
}
export default Rotas;