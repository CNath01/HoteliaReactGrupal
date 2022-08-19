import React from 'react';
import '../../assets/css/dashuser.css';
import logo from '../../assets/img/H.png';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass, faCalendarCheck, faUserCheck, faDoorOpen} from '@fortawesome/free-solid-svg-icons'

const DashUser = (userId) => {

const cookies = new Cookies();
userId = cookies.get('id');

const cerrarSesion=()=>{
    cookies.remove('id', {path: "/login"});
    cookies.remove('tipodoc', {path: "/login"});
    cookies.remove('numdoc', {path: "/login"});
    cookies.remove('nombre', {path: "/login"});
    cookies.remove('apellido', {path: "/login"});
    cookies.remove('fnacimiento', {path: "/login"});
    cookies.remove('genero', {path: "/login"});
    cookies.remove('email', {path: "/login"});
    cookies.remove('telefono', {path: "/login"});
    cookies.remove('paisorigen', {path: "/login"});
    cookies.remove('password', {path: "/login"});
    cookies.remove('tipouser', {path: "/login"});
    cookies.remove('img', {path: "/login"});
    window.location.href='../login';
    userId=null;
}

    return (
        <section className="header">
            <div className='navGlob'>
                <div className="nav_logo-text">
                    <img src={logo} alt="" className="logo-nav" />
                </div>

                {/* <input type="checkbox" id="check" />
                <label for="check" className="bar-btn">
                    <i className="fa-solid fa-bars"></i>
                </label> */}

                <ul className="nav_menu-items">
                    <li><Link to='/habitaciones'><FontAwesomeIcon icon={faMagnifyingGlass}/>  HABITACIONES</Link></li>
                    <li><Link to='/reservaciones'><FontAwesomeIcon icon={faCalendarCheck}/>  MIS RESERVAS</Link></li>
                    <li><Link to='/perfil'><FontAwesomeIcon icon={faUserCheck}/>  MI PERFIL</Link></li>
                    <li><Link to='' onClick={cerrarSesion}><FontAwesomeIcon icon={faDoorOpen}/>  Cerrar sesión</Link></li>
                </ul>
            </div>
        </section>
    )
}

export default DashUser;