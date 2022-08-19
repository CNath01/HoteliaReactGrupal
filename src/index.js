import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Perfil from './pages/Perfil';
import CambiarFoto from './pages/CambiarFoto';
import EditarContrasena  from './pages/EditarContraseña';
import EditarPerfil  from './pages/EditarPerfil';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>

    <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cambiar-foto" element={<CambiarFoto />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path ='/login' element ={<Login/>}/>
        <Route path="/editar-contrasena" element={<EditarContrasena />} />

        
        <Route path='/home' element={<Navigate replace to={"/"} />}></Route>
    </Routes>

    </BrowserRouter>
);