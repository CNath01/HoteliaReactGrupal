import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormHab from '../Admin/FormHab'
import ListHabs from '../Admin/ListHabs'
import Form from '../registroForm/Form'
import FormPrueba from '../registroForm/FormPrueba'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import Dashboard from '../Admin/Dashboard'
import UserDashboard from '../user/UserDashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio />} ></Route>


        <Route path='/Hotelia/list-habitaciones' element={<ListHabs />} ></Route>
        <Route path='/Hotelia/form-habitaciones' element={<FormHab />} ></Route>
        <Route path='/Hotelia/login' element={<Login />} ></Route>
        <Route path='/Hotelia/Formulario/Registro' element={<Form />}></Route>
        <Route path='/Hotelia/Formulario/Registro/Prueba' element={<FormPrueba />} ></Route>
        <Route path='/Hotelia/Admin/Dashboard' element={<Dashboard/>}></Route>
        <Route path='/Hotelia/User/Dashboard' element={<UserDashboard/>}></Route>


      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes