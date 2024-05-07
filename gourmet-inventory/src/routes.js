import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Empresa from "./pages/empresa/Empresa"

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element= {<Home/>}/> 
                    <Route path="/login" element= {<Login/>}/> 
                    <Route path="/empresa" element= {<Empresa/>}/> 
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;