import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import LoginBackOffice from "./pages/areaBackOffice/loginbackoffice/LoginBackOffice";
import Empresa from "./pages/areaBackOffice/empresa/Empresa";
import Cadastro from "./pages/areaBackOffice/cadastroempresa/Cadastro";
import LoginBackOffice from "./pages/loginbackoffice/LoginBackOffice";
import Cadastro from "./pages/cadastroempresa/Cadastro";
import Fornecedor from "./pages/pagFornecedor/pagFornecedor"

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
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;