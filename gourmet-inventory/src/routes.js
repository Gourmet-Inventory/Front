import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import LoginBackOffice from "./pages/loginbackoffice/LoginBackOffice";
import Empresa from "./pages/empresa/Empresa";
import Cadastro from "./pages/cadastroempresa/Cadastro";

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
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;