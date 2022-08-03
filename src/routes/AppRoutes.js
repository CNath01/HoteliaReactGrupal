import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormHab from '../Admin/FormHab'
import ListHabs from '../Admin/ListHabs'


import Inicio from '../pages/Inicio'
import Login from '../pages/Login'

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Inicio/>} ></Route>


            <Route path='/HoteliaReactGrupal/list-habitaciones' element={<ListHabs/>} ></Route>
            <Route path='/HoteliaReactGrupal/form-habitaciones' element={<FormHab/>} ></Route>
            <Route path='/HoteliaReactGrupal/login' element={<Login/>} ></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes