import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import LoginBackOffice from "./pages/areaBackOffice/loginbackoffice/LoginBackOffice";
import Empresa from "./pages/areaBackOffice/empresa/Empresa";
import Cadastro from "./pages/areaBackOffice/cadastroempresa/Cadastro";
import Fornecedor from "./pages/pagFornecedor/pagFornecedor";
import Alerta from "./pages/alerta/Alerta";
import Menu from "./pages/menu/Menu";
import Estoque from "./pages/estoqueIngrediente/Estoque";
import Funcionarios from "./pages/pagFuncionarios/PagFuncionarios"
    
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
                    <Route path="/gourmet-inventory/menu" element= {<Menu/>}/>
                    <Route path="/gourmet-inventory/alertas" element= {<Alerta/>}/>
                    <Route path="/gourmet-inventory/estoque" element= {<Estoque/>}/>
                    <Route path="/gourmet-inventory/funcionarios" element= {<Funcionarios/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );  
}
export default Rotas;