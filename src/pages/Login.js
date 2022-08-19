import React from 'react'
import axios from "axios";
import '../assets/css/login.css'
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import {useState, useEffect} from "react";
import {MensajeError} from "../components/FormPerfil/Formularios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/img/LogoHotelia.png'
import Input from "../components/ImputForm/Inputs";

const Login = () => {

    const url="http://localhost:4000/users";

    const getData=async()=>{
        const response=axios.get(url);
        return response;
    }

    const cookies = new Cookies();
    const [correo, cambiarCorreo] = useState({campo: '', valido: null});
    const [contrasenia, cambiarContrasenia] = useState({campo: '', valido: null});
    const [list,setList]=useState([]);
    const [upList, setUpList]=useState(false);
    const [formularioValido,cambiarFormularioValido]= useState(null);

    let iniciarSesion1 = async(e)=>{
        e.preventDefault();
        
            if( correo.valido === 'true' &&
                contrasenia.valido === 'true'
                ){
                    let email=correo.campo;
                    let password=contrasenia.campo;
                    
                    await axios.get(url,{params: {email, password}})
                        .then(response=>{
                        return response.data;})

                        .then(response=>{
                            if (response.length>0) {

                                var respuesta=response[0];
                                cookies.set('_id', respuesta._id, {path: "/perfil"});
                                cookies.set('tipodoc', respuesta.tipodoc, {path: "/perfil"});
                                cookies.set('numdoc', respuesta.numdoc, {path: "/perfil"});
                                cookies.set('nombre', respuesta.nombre, {path: "/perfil"});
                                cookies.set('apellido', respuesta.apellido, {path: "/perfil"});
                                cookies.set('fnacimiento', respuesta.fnacimiento, {path: "/perfil"});
                                cookies.set('genero', respuesta.genero, {path: "/perfil"});
                                cookies.set('email', respuesta.email, {path: "/perfil"});
                                cookies.set('telefono', respuesta.telefono, {path: "/perfil"});
                                cookies.set('paisorigen', respuesta.paisorigen, {path: "/perfil"});
                                cookies.set('password', respuesta.password, {path: "/perfil"});
                                cookies.set('tipouser', respuesta.tipouser, {path: "/perfil"});
                                cookies.set('img', respuesta.img, {path: "/perfil"});
                                Swal.fire(
                                    '¡Bienvenido!',
                                    (`${respuesta.nombre} ${respuesta.apellido}`),
                                    'success',
                                )
                                window.location.href="./perfil";

                                cambiarCorreo({campo: '', valido: null});
                                cambiarContrasenia({campo: '', valido: null});
                                cambiarFormularioValido(true);

                                setUpList(!upList);
                        }else{
                            alert('El usuario o la contraseña no son correctos');
                            cambiarFormularioValido(false);
                        }
                    })
            }
    }

    const expresiones = {
        contrasenia: /^.{4,12}$/,
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
	}

    useEffect(()=>{
        getData().then((response)=>{
            setList(response.data);
        })
    },[upList]);

    console.log(list);

    return (

        <body className='body-login'>
            <section className='login'>
                <div className='login-data'>
                    <img src={Logo} alt=''></img>
                    <form action="" onSubmit={iniciarSesion1}>

                        <div className='input-grup'>
                            <Input
                                className="input-fili"
                                label="Correo electrónico"
                                tipo="email"
                                name="correo"
                                estado={correo}
                                cambiarEstado={cambiarCorreo}
                                expresionRegular={expresiones.correo}
                                leyendaError="Por favor ingrese un correo valido por ejemplo: correo@hotelia.com"
                            />
                        </div>

                        <div className='input-grup'>
                            <Input
                                className="input-fili"
                                label="Contraseña"
                                tipo="password"
                                name="contrasenia"
                                estado={contrasenia}
                                cambiarEstado={cambiarContrasenia}
                                expresionRegular={expresiones.contrasenia}
                                leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
                            />
                        </div>
                        {formularioValido === false && <MensajeError>
                            <p>
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <b>Correo o contraseña invalidos:</b> Las credenciales ingresadas estan mal por favor revise nuevamente.
                            </p>
                        </MensajeError>}

                        <button className="btn-login" type='submit'>Ingresar</button>
                    </form>
                </div>
            </section>

            <section className='info-login'>
                <h1 className='tbienb'>Bienvenido de nuevo</h1>
                <p className='ttext'>Si aun no tiene cuenta registrese aqui</p>
                <button className="btn-login" type='submit'>Registro</button>
            </section>
        </body>
    )
}

export default Login;