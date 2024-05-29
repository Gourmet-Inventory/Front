import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import LoginBackOffice from "./pages/areaBackOffice/loginbackoffice/LoginBackOffice";
import Empresa from "./pages/areaBackOffice/empresa/Empresa";
import Cadastro from "./pages/areaBackOffice/cadastroempresa/Cadastro";
import Fornecedor from "./pages/pagFornecedor/pagFornecedor"
import Menu from "./pages/menu/Menu"

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
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;