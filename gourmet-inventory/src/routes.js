import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element= {<Home/>}/> 
                    <Route path="/login" element= {<Login/>}/> 
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Rotas;